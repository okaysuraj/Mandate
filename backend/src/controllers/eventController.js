import Event from "../models/Event.js";

// @desc    Get workspace events
// @route   GET /api/events
// @access  Private
export const getEvents = async (req, res) => {
  try {
    // Basic verification since we fallback to user's personal context if no workspace specified
    const workspaceId = req.user.activeWorkspace || req.user.id;
    const events = await Event.find({ workspaceId }).sort({ startTime: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create event
// @route   POST /api/events
// @access  Private
export const createEvent = async (req, res) => {
  try {
    const { title, description, startTime, endTime, attendees, meetingLink } = req.body;
    const workspaceId = req.user.activeWorkspace || req.user.id;

    const event = await Event.create({
      title,
      description,
      startTime,
      endTime,
      attendees,
      meetingLink,
      creator: req.user.id,
      workspaceId,
    });

    if (req.io) {
      req.io.to(workspaceId.toString()).emit("event_created", event);
    }

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (req.io) {
      req.io.to(event.workspaceId?.toString()).emit("event_updated", event);
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.deleteOne();

    if (req.io) {
      req.io.to(event.workspaceId?.toString()).emit("event_deleted", req.params.id);
    }

    res.json({ message: "Event deleted", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
