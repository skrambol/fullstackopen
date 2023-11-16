const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.get("/", async (request, response) => {
  const users = await User.find({});

  response.json(users);
});

router.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!(username && password)) {
    // throw ValidationError("invalid password length")
    return response.status(400).json({ error: "missing username or password" });
  }

  if (password.length < 3) {
    // throw ValidationError("invalid password length")
    return response.status(400).json({ error: "invalid password length" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const userObject = new User({ username, name, passwordHash });
  const newUser = await userObject.save();

  response.status(201).json(newUser);
});

module.exports = router;
