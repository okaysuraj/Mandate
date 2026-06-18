import request from "supertest";
import { app } from "../server.js";
import User from "../models/User.js";
import Todo from "../models/Todo.js";

describe("Todo Endpoints", () => {
  let token;
  let activeWorkspaceId;

  beforeEach(async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Todo User",
      email: "todo@example.com",
      password: "password123",
    });
    token = res.body.token;
    activeWorkspaceId = res.body.activeWorkspace;
  });

  describe("POST /api/todos", () => {
    it("should create a new todo in the active workspace", async () => {
      const res = await request(app)
        .post("/api/todos")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Write tests", priority: "high", status: "pending" });

      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe("Write tests");
      expect(res.body.workspaceId).toBe(activeWorkspaceId);
    });
  });

  describe("GET /api/todos", () => {
    it("should fetch active todos in the workspace", async () => {
      await Todo.create([
        { user: "000000000000000000000000", title: "Should not see", workspaceId: "000000000000000000000000", status: "pending" },
      ]);
      
      await request(app)
        .post("/api/todos")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "My Workspace Task" });

      const res = await request(app)
        .get("/api/todos?isDeleted=false")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].title).toBe("My Workspace Task");
    });
  });

  describe("PUT /api/todos/:id", () => {
    it("should update task status (Kanban move)", async () => {
      const createRes = await request(app)
        .post("/api/todos")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Task to move" });

      const todoId = createRes.body._id;

      const res = await request(app)
        .put(`/api/todos/${todoId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ status: "in-progress" });

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe("in-progress");
    });
  });

  describe("DELETE /api/todos/:id", () => {
    it("should permanently delete a task", async () => {
      const createRes = await request(app)
        .post("/api/todos")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Task to delete" });

      const res = await request(app)
        .delete(`/api/todos/${createRes.body._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);

      const check = await Todo.findById(createRes.body._id);
      expect(check).toBeNull();
    });
  });
});
