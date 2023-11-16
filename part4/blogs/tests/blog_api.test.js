const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb,
} = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const api = supertest(app);
jest.mock("jsonwebtoken");

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(initialUsers);

  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe("GET /api/blogs", () => {
  test("gets all blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('blog/s have "id" property', async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
    expect(response.body[0].user.id).toBeDefined();
  });
});

describe("POST /api/blogs", () => {
  test("if invalid token, return status 401", async () => {
    jwt.verify.mockImplementation(() => {
      const error = new Error();
      error.name = "JsonWebTokenError";

      throw error;
    });

    const newBlog = {
      title: "newest title",
      author: "O. Thor",
      url: "http://example.org/newest-title",
      likes: 2,
    };
    const response = await api.post("/api/blogs").send(newBlog);

    expect(response.statusCode).toBe(401);

    const allBlogs = await blogsInDb();
    expect(allBlogs).toHaveLength(initialBlogs.length);
  });

  test("creates new blog", async () => {
    jwt.verify.mockReturnValue({
      username: initialUsers[0].username,
      id: initialUsers[0]._id,
    });

    const newBlog = {
      title: "newest title",
      author: "O. Thor",
      url: "http://example.org/newest-title",
      likes: 2,
    };
    const response = await api.post("/api/blogs").send(newBlog);

    expect(response.statusCode).toBe(201);

    const allBlogs = await blogsInDb();
    expect(allBlogs).toHaveLength(initialBlogs.length + 1);

    const users = await usersInDb();
    expect(users[0].blogs).toHaveLength(initialUsers[0].blogs.length + 1);
  });

  test('if "likes" is missing, default to 0', async () => {
    jwt.verify.mockReturnValue({
      username: initialUsers[0].username,
      id: initialUsers[0]._id,
    });

    const newBlog = {
      title: "newest title",
      author: "O. Thor",
      url: "http://example.org/newest-title",
    };
    const response = await api.post("/api/blogs").send(newBlog);

    expect(response.statusCode).toBe(201);
    expect(response.body.likes).toBe(0);

    const allBlogs = await blogsInDb();
    expect(allBlogs).toHaveLength(initialBlogs.length + 1);
  });

  test('if "title" or "url" is missing, status code = 400', async () => {
    jwt.verify.mockReturnValue({
      username: initialUsers[0].username,
      id: initialUsers[0]._id,
    });

    const newBlog = { author: "O. Thor" };
    expect(newBlog.title).toBeUndefined();
    expect(newBlog.url).toBeUndefined();

    const response = await api.post("/api/blogs").send(newBlog);

    expect(response.statusCode).toBe(400);

    const allBlogs = await blogsInDb();
    expect(allBlogs).toHaveLength(initialBlogs.length);
  });
});

describe("DELETE /api/blogs/:id", () => {
  test("deletes successfully", async () => {
    const allBlogs = await blogsInDb();
    const id = allBlogs[0].id;
    const response = await api.delete(`/api/blogs/${id}`);

    expect(response.statusCode).toBe(204);

    const updatedBlogs = await blogsInDb();
    expect(updatedBlogs).toHaveLength(initialBlogs.length - 1);
  });

  test("deletes nothing if id is incorrect", async () => {
    const id = "000000000000000000000000";
    const response = await api.delete(`/api/blogs/${id}`);

    expect(response.statusCode).toBe(204);

    const allBlogs = await blogsInDb();
    expect(allBlogs).toHaveLength(initialBlogs.length);
  });
});

describe("PUT /api/blogs/:id", () => {
  test("updates successfully", async () => {
    const allBlogs = await blogsInDb();
    const id = allBlogs[0].id;
    const newBlog = {
      title: "newest title",
      author: "O. Thor",
      url: "http://example.org/newest-title",
    };
    const response = await api.put(`/api/blogs/${id}`).send(newBlog);

    expect(response.statusCode).toBe(200);

    const updatedBlogs = await blogsInDb();
    expect(updatedBlogs[0].title).toBe(newBlog.title);
    expect(updatedBlogs[0].author).toBe(newBlog.author);
    expect(updatedBlogs[0].url).toBe(newBlog.url);
  });

  test('if "likes" is only in the body, update likes only', async () => {
    const allBlogs = await blogsInDb();
    const id = allBlogs[0].id;
    const response = await api.put(`/api/blogs/${id}`).send({ likes: 42 });

    expect(response.statusCode).toBe(200);

    const updatedBlogs = await blogsInDb();
    expect(updatedBlogs[0].title).toBe(allBlogs[0].title);
    expect(updatedBlogs[0].author).toBe(allBlogs[0].author);
    expect(updatedBlogs[0].url).toBe(allBlogs[0].url);
    expect(updatedBlogs[0].likes).toBe(42);
  });

  test('if "id" does not exist, status code = 404', async () => {
    const id = "000000000000000000000000";
    const response = await api.put(`/api/blogs/${id}`).send({ likes: 42 });

    expect(response.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
