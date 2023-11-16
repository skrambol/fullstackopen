const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { initialUsers } = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);
const baseUrl = "/api/login";

beforeEach(async () => {
  await User.deleteMany({});

  const user = new User(initialUsers[0]);

  await user.save();
});

describe(`POST ${baseUrl}`, () => {
  test("login successful", async () => {
    const response = await api
      .post(baseUrl)
      .send({ username: "user1", password: "password" });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test("if wrong username/password, returns 401", async () => {
    const response = await api
      .post(baseUrl)
      .send({ username: "no-user", password: "no-pass" });

    expect(response.statusCode).toBe(401);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
