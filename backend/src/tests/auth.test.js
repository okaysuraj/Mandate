import request from "supertest";
import { app } from "../server.js";
import User from "../models/User.js";
import Workspace from "../models/Workspace.js";

describe("Auth Endpoints", () => {
  const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  };

  describe("POST /api/auth/register", () => {
    it("should register a new user and create a personal workspace", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send(testUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("email", testUser.email);
      expect(res.body).toHaveProperty("activeWorkspace");

      // Verify the user was created in the database
      const user = await User.findOne({ email: testUser.email });
      expect(user).toBeTruthy();
      
      // Verify personal workspace was created
      const workspace = await Workspace.findById(user.activeWorkspace);
      expect(workspace).toBeTruthy();
      expect(workspace.name).toBe("Personal Workspace");
    });

    it("should return 400 if user already exists", async () => {
      await User.create(testUser); // Create user first

      const res = await request(app)
        .post("/api/auth/register")
        .send(testUser);

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe("User already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await request(app).post("/api/auth/register").send(testUser);
    });

    it("should login successfully with valid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should return 401 with invalid password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: testUser.email,
          password: "wrongpassword",
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toBe("Invalid email or password");
    });
  });
});
