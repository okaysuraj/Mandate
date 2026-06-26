import Todo from "../models/Todo.js";

// @desc    Get all todos for a user (with pagination, filtering, and caching)
// @route   GET /api/todos
// @access  Private
export const getTodos = async (req, res) => {
  try {
    const { status, priority, isDeleted, project, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = { user: req.user.id };
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (isDeleted === "true") {
      query.isDeleted = true;
    } else {
      query.isDeleted = { $ne: true };
    }
    if (project) query.project = project;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const startIndex = (pageNumber - 1) * limitNumber;

    const total = await Todo.countDocuments(query);
    const todos = await Todo.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limitNumber);

    const response = {
      data: todos,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / limitNumber),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getTodos controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error("Error in getTodoById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Create todo
// @route   POST /api/todos
// @access  Private
export const createTodo = async (req, res) => {
  try {
    const { title, content, status, priority, dueDate, project } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Please add a title text field" });
    }

    const todo = await Todo.create({
      title,
      content,
      status,
      priority,
      dueDate,
      project,
      user: req.user.id,
      workspaceId: req.user.activeWorkspace || req.user.id, // Fallback for now
    });
    
    // Broadcast to workspace
    if (req.io) {
      req.io.to(todo.workspaceId.toString()).emit("todo_created", todo);
    }
    
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error in createTodo controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (req.io) {
      req.io.to(updatedTodo.workspaceId?.toString()).emit("todo_updated", updatedTodo);
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error in updateTodo controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await todo.deleteOne();

    if (req.io) {
      req.io.to(todo.workspaceId?.toString()).emit("todo_deleted", todo._id);
    }

    res.status(200).json({ id: req.params.id, message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTodo controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
