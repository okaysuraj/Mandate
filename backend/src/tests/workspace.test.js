import request from "supertest";
import { app } from "../server.js";
import User from "../models/User.js";
import Workspace from "../models/Workspace.js";

describe("Workspace Endpoints", () => {
  let token;
  let user;

  beforeEach(async () => {
    // Register a user to get token and default workspace
    const res = await request(app).post("/api/auth/register").send({
      name: "Workspace User",
      email: "work@example.com",
      password: "password123",
    });
    token = res.body.token;
    user = await User.findById(res.body._id);
  });

  describe("POST /api/workspaces", () => {
    it("should create a new workspace", async () => {
      const res = await request(app)
        .post("/api/workspaces")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Team Engineering" });

      expect(res.statusCode).toEqual(201);
      expect(res.body.name).toBe("Team Engineering");
      expect(res.body.members[0].role).toBe("Admin");
      expect(res.body.owner.toString()).toBe(user._id.toString());
    });
  });

  describe("GET /api/workspaces", () => {
    it("should return workspaces the user is a member of", async () => {
      await request(app)
        .post("/api/workspaces")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Team A" });

      const res = await request(app)
        .get("/api/workspaces")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      // 1 personal + 1 created
      expect(res.body.length).toBe(2);
    });
  });

  describe("PUT /api/workspaces/:id/active", () => {
    it("should switch the active workspace", async () => {
      const createRes = await request(app)
        .post("/api/workspaces")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Team B" });

      const newWorkspaceId = createRes.body._id;

      const res = await request(app)
        .put(`/api/workspaces/${newWorkspaceId}/active`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.activeWorkspace).toBe(newWorkspaceId);

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.activeWorkspace.toString()).toBe(newWorkspaceId);
    });

    it("should return 403 if not a member", async () => {
      // Create a workspace completely unrelated to this user
      const otherWorkspace = await Workspace.create({
        name: "Secret Workspace",
        owner: user._id, // Owner doesn't matter for this check, members does
        members: [] // Empty members array means the current user is not a member
      });

      const res = await request(app)
        .put(`/api/workspaces/${otherWorkspace._id}/active`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(403);
    });
  });
});
