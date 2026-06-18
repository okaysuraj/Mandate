import request from "supertest";
import { app } from "../server.js";
import Event from "../models/Event.js";

describe("Event Endpoints", () => {
  let token;
  let activeWorkspaceId;

  beforeEach(async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Event User",
      email: "event@example.com",
      password: "password123",
    });
    token = res.body.token;
    activeWorkspaceId = res.body.activeWorkspace;
  });

  describe("POST /api/events", () => {
    it("should create a new event in the active workspace", async () => {
      const res = await request(app)
        .post("/api/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Team Sync",
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 3600000).toISOString(),
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe("Team Sync");
      expect(res.body.workspaceId).toBe(activeWorkspaceId);
    });
  });

  describe("GET /api/events", () => {
    it("should retrieve events for the active workspace", async () => {
      await request(app)
        .post("/api/events")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Sync",
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 3600000).toISOString(),
        });

      const res = await request(app)
        .get("/api/events")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe("Test Sync");
    });
  });
});
