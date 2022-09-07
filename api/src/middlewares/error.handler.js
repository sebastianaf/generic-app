import errorCodes from "../config/errorCodes";

const boom = require("@hapi/boom");

const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json({ ...output.payload, data: err.data });
  } else {
    res.status(500).json({
      statusCode: 500,
      error: errorCodes.SERVER_ERROR.title,
      message: errorCodes.SERVER_ERROR.description,
    });
  }
};

export { logErrors, errorHandler };
