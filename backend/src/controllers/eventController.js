import Event from '../models/Event.js';
import { resourceController } from '../utils/resourceController.js';
import { validateMembers } from '../utils/access.js';
const controller = resourceController(Event, ['title', 'description', 'startTime', 'endTime', 'attendees', 'meetingLink'], {
  defaults: req => ({ creator: req.user._id }),
  validate: (body, workspace) => validateMembers(body, workspace, 'attendees', true)
});
export const { create: createEvent, list: getEvents, get: getEventById, update: updateEvent, delete: deleteEvent } = controller;
