import Project from '../models/Project.js';
import Task from '../models/Task.js';
import WorkspaceRecord from '../models/WorkspaceRecord.js';
import { resourceController } from '../utils/resourceController.js';
const controller = resourceController(Project, ['name', 'description', 'status'], {
  afterDelete: async(project,options)=>{await Task.updateMany({workspaceId:project.workspaceId,projectId:project._id},{$set:{projectId:null}},{runValidators:true,...options});await WorkspaceRecord.updateMany({workspaceId:project.workspaceId,projectId:project._id},{$set:{projectId:null}},{runValidators:true,...options});}
});
export const { create: createProject, list: getProjects, get: getProjectById, update: updateProject, delete: deleteProject } = controller;
