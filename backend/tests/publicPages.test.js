import { beforeAll, afterAll, test, expect } from '@jest/globals';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import express from 'express';
import request from 'supertest';
import PublicContent from '../src/models/PublicContent.js';
import publicRoutes from '../src/routes/publicRoutes.js';

const execute = promisify(execFile);
const script = fileURLToPath(new URL('../src/scripts/publishPublicPages.js', import.meta.url));
const slugs = ['privacy', 'terms', 'legal', 'security'];
let mongo, folder;
const app = express();
app.use('/api/public', publicRoutes);
app.use((error, req, res, next) => res.status(error.status || 500).json({ message: error.message }));

beforeAll(async () => {
  folder = await mkdtemp(path.join(tmpdir(), 'mandate-public-pages-'));
  mongo = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
  await mongoose.connect(mongo.getUri());
  await PublicContent.init();
  for (const slug of slugs) await writeFile(path.join(folder, slug + '.txt'), 'Isolated test document: ' + slug + '\n\nSecond paragraph.', 'utf8');
}, 120000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongo?.stop();
  if (folder && path.dirname(path.resolve(folder)) === path.resolve(tmpdir()) && path.basename(folder).startsWith('mandate-public-pages-')) {
    await rm(folder, { recursive: true, force: true });
  }
});

const run = (...args) => execute(process.execPath, [script, '--dir', folder, ...args], {
  env: { ...process.env, NODE_ENV: 'test', MONGO_URI: mongo.getUri() }, timeout: 30000,
});

test('preview validates local files without touching the database', async () => {
  const { stdout } = await run();
  expect(stdout).toContain('Preview only');
  expect(await PublicContent.countDocuments()).toBe(0);
});

test('an empty document prevents publication of the entire batch', async () => {
  await writeFile(path.join(folder, 'security.txt'), ' \n ', 'utf8');
  try {
    await expect(run('--apply')).rejects.toMatchObject({ code: 1, stderr: expect.stringContaining('security.txt must contain') });
    expect(await PublicContent.countDocuments()).toBe(0);
  } finally {
    await writeFile(path.join(folder, 'security.txt'), 'Isolated test document: security', 'utf8');
  }
});

test('publication makes every footer document readable anonymously and updates existing records', async () => {
  await run('--apply');
  expect(await PublicContent.countDocuments()).toBe(4);
  for (const slug of slugs) {
    const response = await request(app).get('/api/public/pages/' + slug);
    expect(response.status).toBe(200);
    expect(response.body.content).toContain('Isolated test document: ' + slug);
    expect(new Date(response.body.publishedAt).getTime()).toBeGreaterThan(0);
  }
  const previous = await PublicContent.findOne({ slug: 'privacy' });
  await writeFile(path.join(folder, 'privacy.txt'), '\uFEFFUpdated isolated test document.', 'utf8');
  await run('--apply');
  const updated = await PublicContent.findOne({ slug: 'privacy' });
  expect(String(updated._id)).toBe(String(previous._id));
  expect(updated.content).toBe('Updated isolated test document.');
  expect(await PublicContent.countDocuments()).toBe(4);
});

test('a database rejection rolls back all four document updates', async () => {
  const previous = await PublicContent.findOne({ slug: 'privacy' });
  await writeFile(path.join(folder, 'privacy.txt'), 'Text that must roll back.', 'utf8');
  await mongoose.connection.db.command({ collMod: PublicContent.collection.name, validator: { slug: { $ne: 'security' } }, validationLevel: 'strict' });
  try {
    await expect(run('--apply')).rejects.toMatchObject({ code: 1, stderr: expect.stringContaining('Publication failed') });
    expect((await PublicContent.findOne({ slug: 'privacy' })).content).toBe(previous.content);
  } finally {
    await mongoose.connection.db.command({ collMod: PublicContent.collection.name, validator: {} });
  }
});
