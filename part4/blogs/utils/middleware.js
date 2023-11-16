const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  if (process.env.NODE_ENV === "test") return next();

  console.info("---");
  console.info("Date:  ", new Date());
  console.info("Method:", request.method);
  console.info("Path:  ", request.path);
  console.info("Body:  ", request.body);

  next();
};

const getToken = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(error.message);
  }

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "expired token" });
  }

  next(error);
};

module.exports = {
  requestLogger,
  getToken,
  unknownEndpoint,
  errorHandler,
};
