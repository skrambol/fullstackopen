const requestLogger = (request, response, next) => {
  if (process.env.NODE_ENV === "test") return next();

  console.info("---");
  console.info("Date:  ", new Date());
  console.info("Method:", request.method);
  console.info("Path:  ", request.path);
  console.info("Body:  ", request.body);

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
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
