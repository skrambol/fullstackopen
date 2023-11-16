const Blog = require("../models/blog");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");

  response.json(blogs);
});

router.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({ title, author, url, likes, user });
  const newBlog = await blog.save();

  user.blogs = user.blogs.concat(newBlog.id);
  await user.save();

  response.status(201).json(newBlog);
});

router.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    const user = await User.findById(decodedToken.id).populate("blogs");

    if (blog.user.toString() !== decodedToken.id) {
      return response.status(401).json({ error: "invalid user/blog" });
    }

    await blog.delete();
    user.blogs.filter((b) => b.id !== blog._id.toString());
    await user.save();
  }
  response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true },
  );

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = router;
