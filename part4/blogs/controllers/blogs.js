const Blog = require("../models/blog");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }

  return null
}

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");

  response.json(blogs);
});

router.post("/", async (request, response) => {
  const {title, author, url, likes} = request.body
  const decodedToken = jwt.verify(getToken(request), process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({title, author, url, likes, user});
  const newBlog = await blog.save();

  user.blogs = user.blogs.concat(newBlog.id)
  await user.save()

  response.status(201).json(newBlog);
});

router.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);

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
