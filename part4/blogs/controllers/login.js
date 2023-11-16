const router = require("express").Router();
const bcrtypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrtypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: "invalid username or password" });
  }

  const token = jwt.sign({ username, id: user.id }, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response.status(200).send({ token, username, name: user.name });
});

module.exports = router;
