import Task from '../models/Task.js';
import mongoose from 'mongoose';
import Automation from "../models/Automation.js";
import Activity from '../models/Activity.js';
import Workspace from '../models/Workspace.js';
import { resourceController } from '../utils/resourceController.js';
import { validateMembers } from '../utils/access.js';
import { HttpError } from '../utils/http.js';

// Basic Rule Engine execution logic
export const runAutomations = async (triggerEvent, task, io) => {
  try {
    const automations = await Automation.find({
      workspaceId: task.workspaceId,
      isActive: true,
      trigger: triggerEvent
    });

    let modified = false;
    const activities=[];

    for (const rule of automations) {
      let conditionMet = false;

      if (!rule.condition || !rule.condition.field) {
        conditionMet = true;
      } else {
        const taskValue = task[rule.condition.field] ? String(task[rule.condition.field]) : "";
        const ruleValue = rule.condition.value;

        switch (rule.condition.operator) {
          case "equals":
            conditionMet = taskValue === ruleValue;
            break;
          case "not_equals":
            conditionMet = taskValue !== ruleValue;
            break;
          case "contains":
            // E.g. tags contains 'urgent'
            if (Array.isArray(task[rule.condition.field])) {
              conditionMet = task[rule.condition.field].includes(ruleValue);
            } else {
              conditionMet = taskValue.includes(ruleValue);
            }
            break;
        }
      }

      if (conditionMet) {
        if (rule.action === 'assign_user') {
          const workspace = await Workspace.findById(task.workspaceId);
          try { validateMembers({assigneeId:rule.actionValue},workspace,'assigneeId'); } catch { continue; }
        }
        modified = true;
        activities.push({workspaceId:task.workspaceId,entityType:'automation',entityId:rule._id,userId:task.creatorId,action:'executed',metadata:{taskId:task._id,action:rule.action}});
        switch (rule.action) {
          case "change_status":
            task.status = rule.actionValue;
            break;
          case "change_priority":
            task.priority = rule.actionValue;
            break;
          case "add_tag":
            if (!task.tags) task.tags = [];
            if (!task.tags.includes(rule.actionValue)) {
              task.tags.push(rule.actionValue);
            }
            break;
          case "assign_user":
            task.assigneeId = rule.actionValue;
            break;
        }
      }
    }

    if (modified) {
      task.completedAt = task.status === 'completed' ? (task.completedAt || new Date()) : null;
      await mongoose.connection.transaction(async session=>{await task.save({session});await Activity.create(activities,{session});});
      if (io) {
        io.to(task.workspaceId.toString()).emit("task:updated", task);
      }
    }
  } catch (error) {
    console.error("Rule engine error:", error.name, error.code || "");
    const persisted=await Task.findById(task._id);if(persisted)task.set(persisted.toObject());
  }
};

const controller = resourceController(Automation, ['name','trigger','condition','action','actionValue','isActive'], {
 admin:true,
 validate: (body,workspace,old)=>{
  const action=body.action||old?.action, value=body.actionValue??old?.actionValue;
  if(body.isActive!==undefined && typeof body.isActive!=='boolean')throw new HttpError(400,'Invalid isActive');
  if(body.condition?.field && !['status','priority','title','tags','energyLevel'].includes(body.condition.field))throw new HttpError(400,'Invalid condition field');
  if(action==='change_status'&&!['pending','in-progress','validation','completed','archived'].includes(value))throw new HttpError(400,'Invalid status action');
  if(action==='change_priority'&&!['low','medium','high','urgent'].includes(value))throw new HttpError(400,'Invalid priority action');
  if(action==='add_tag'&&(typeof value!=='string'||!value.trim()||value.length>100))throw new HttpError(400,'Invalid tag action');
  if(action==='assign_user')validateMembers({assigneeId:value},workspace,'assigneeId');
 }
});
export const {create:createAutomation,list:getAutomations,update:updateAutomation,delete:deleteAutomation}=controller;
