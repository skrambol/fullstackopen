const Blog = require("../models/blog");
const User = require("../models/user");

const bcrypt = require("bcrypt");

const passwordHash = bcrypt.hashSync("password", 10);
const initialUsers = [
  {
    username: "user1",
    name: "user one",
    _id: "655574a228bbdac44685d29d",
    passwordHash,
    blogs: ["655353b86ee9c7a5a92452c1", "655353b86ee9c7a5a92452c0"],
  },
  {
    username: "user2",
    name: "two user",
    _id: "655574b928bbdac44685d2a2",
    passwordHash,
    blogs: ["655353b86ee9c7a5a92452c3", "655353b86ee9c7a5a92452c2"],
  },
  {
    username: "user3",
    name: "three three",
    _id: "655574c628bbdac44685d2a9",
    passwordHash,
    blogs: ["655353b86ee9c7a5a92452c5", "655353b86ee9c7a5a92452c4"],
  },
];

const initialBlogs = [
  {
    _id: "655353b86ee9c7a5a92452c0",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: initialUsers[0]._id,
  },
  {
    _id: "655353b86ee9c7a5a92452c1",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: initialUsers[0]._id,
  },
  {
    _id: "655353b86ee9c7a5a92452c2",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: initialUsers[1]._id,
  },
  {
    _id: "655353b86ee9c7a5a92452c3",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: initialUsers[1]._id,
  },
  {
    _id: "655353b86ee9c7a5a92452c4",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user: initialUsers[2]._id,
  },
  {
    _id: "655353b86ee9c7a5a92452c5",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    user: initialUsers[2]._id,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});

  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb,
};
