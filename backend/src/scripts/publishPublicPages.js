import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import PublicContent from '../models/PublicContent.js';

const documents = {
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
  legal: 'Legal Notice',
  security: 'Security Information',
};

async function main() {
  const { values } = parseArgs({ options: {
    dir: { type: 'string' },
    apply: { type: 'boolean', default: false },
    help: { type: 'boolean', default: false },
  } });
  if (values.help) {
    console.log('Usage: npm run content:publish -- --dir <folder> [--apply]');
    console.log('The folder must contain privacy.txt, terms.txt, legal.txt and security.txt.');
    console.log('Without --apply, validates and previews the files without connecting to the database.');
    console.log('--apply creates or replaces these four pages and publishes them immediately.');
    return;
  }
  if (!values.dir) throw new Error('Specify --dir with the folder containing your four policy text files.');

  // Validate the entire batch before opening a database connection or writing anything.
  const pages = [];
  for (const [slug, title] of Object.entries(documents)) {
    const filename = path.resolve(values.dir, slug + '.txt');
    let content;
    try { content = (await readFile(filename, 'utf8')).replace(/^\uFEFF/, '').trim(); }
    catch { throw new Error('Could not read ' + slug + '.txt in the selected folder.'); }
    if (!content || content.length > 50000) throw new Error(slug + '.txt must contain 1–50000 characters.');
    const page = { slug, title, content, published: true, publishedAt: new Date() };
    await new PublicContent(page).validate();
    pages.push(page);
    console.log('\n' + title + ' (' + content.length + ' characters)\n' + content);
  }
  if (!values.apply) {
    console.log('\nPreview only. Run the same command with --apply to save and publish these four pages.');
    return;
  }

  dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)), quiet: true });
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required in backend/.env or the environment.');
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000, autoIndex: false });
    // Match the backend's replica-set requirement so the four documents publish together.
    await mongoose.connection.transaction(async session => {
      for (const page of pages) {
        const current = await PublicContent.findOne({ slug: page.slug }).session(session) || new PublicContent({ slug: page.slug });
        Object.assign(current, page);
        await current.save({ session });
      }
    });
    console.log('\nPublished privacy, terms, legal and security. The web and mobile footer links will now serve these documents.');
  } catch {
    throw new Error('Publication failed. Check MongoDB access and replica-set support before retrying.');
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
