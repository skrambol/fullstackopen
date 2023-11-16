const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const { initialUsers, usersInDb } = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);
const baseUrl = "/api/users";

beforeEach(async () => {
  await User.deleteMany({});

  await User.insertMany(initialUsers);
});

describe(`GET ${baseUrl}`, () => {
  test("gets all users", async () => {
    const response = await api.get(baseUrl);

    expect(response.body).toHaveLength(initialUsers.length);
  });
});

describe(`POST ${baseUrl}`, () => {
  test("registers a user", async () => {
    const newUser = {
      username: "username",
      name: "name",
      password: "password",
    };
    const response = await api.post(baseUrl).send(newUser);

    expect(response.statusCode).toBe(201);

    const users = await usersInDb();
    expect(users).toHaveLength(initialUsers.length + 1);
    expect(users[users.length - 1].username).toBe(newUser.username);
  });

  test("do not create if invalid password length", async () => {
    const newUser = { username: "username", name: "name", password: "12" };
    const response = await api.post(baseUrl).send(newUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("invalid password length");

    const users = await usersInDb();
    expect(users).toHaveLength(initialUsers.length);
  });

  test("do not create if missing username/password", async () => {
    const newUser = { name: "name" };
    const response = await api.post(baseUrl).send(newUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("missing username or password");

    const users = await usersInDb();
    expect(users).toHaveLength(initialUsers.length);
  });

  test("do not create if username not unique", async () => {
    const newUser = {
      username: initialUsers[0].username,
      name: "name",
      password: "password",
    };
    const response = await api.post(baseUrl).send(newUser);

    expect(response.statusCode).toBe(400);

    const users = await usersInDb();
    expect(users).toHaveLength(initialUsers.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
