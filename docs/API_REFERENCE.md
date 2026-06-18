# 🔌 API Reference

Mandate provides a standard REST API prefixed with `/api` and a WebSocket interface for real-time streams.

## REST API Endpoints

All endpoints require a valid `Bearer <JWT_TOKEN>` header unless otherwise specified.

### Authentication (`/api/auth`)
- `POST /register` - Register a new user (automatically provisions a personal Workspace).
- `POST /login` - Authenticate and return JWT.
- `GET /me` - Retrieve current user profile.
- `PUT /workspace/switch` - Update the user's `activeWorkspace`.

### Workspaces (`/api/workspaces`)
- `GET /` - List all workspaces the user is a member of.
- `POST /` - Create a new team workspace.
- `POST /:id/invite` - Add a user to the workspace.

### Tasks (`/api/todos`)
- `GET /` - Retrieve paginated tasks for the active workspace (Redis Cached).
- `POST /` - Create a new task.
- `PUT /:id` - Update an existing task (e.g., mark completed).
- `DELETE /:id` - Move a task to the trash.
- `DELETE /:id/permanent` - Permanently delete a task.

### Events (`/api/events`)
- `GET /` - Retrieve all calendar events.
- `POST /` - Schedule a new event.
- `PUT /:id` - Reschedule or update event details.
- `DELETE /:id` - Cancel an event.

## WebSocket Events

The server communicates bidirectionally on the `namespace: /`.

### Client -> Server
- `join_workspace` - Payload: `workspaceId`. Subscribes the client socket to the room.

### Server -> Client
- `todo_created` - Payload: `Todo` object.
- `todo_updated` - Payload: `Todo` object.
- `todo_deleted` - Payload: `todoId` string.
- `event_created` - Payload: `Event` object.
- `event_updated` - Payload: `Event` object.
- `event_deleted` - Payload: `eventId` string.
- `notification_created` - Payload: `Notification` object.

*Note: The frontend strictly listens to these events via the `SocketContext` and uses standard React state arrays (`setTodos(prev => [...])`) to inject the payload into the view seamlessly.*
