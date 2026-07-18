import { jest } from '@jest/globals';
import Project from '../models/Project.js';
import { getProjects } from '../controllers/projectController.js';

describe('projectController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns projects for the active workspace', async () => {
    const req = { query: { workspaceId: 'workspace-123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Project.find = jest.fn().mockResolvedValue([{ name: 'Alpha' }]);

    await getProjects(req, res);

    expect(Project.find).toHaveBeenCalledWith({ workspaceId: 'workspace-123' });
    expect(res.json).toHaveBeenCalledWith([{ name: 'Alpha' }]);
  });
});
