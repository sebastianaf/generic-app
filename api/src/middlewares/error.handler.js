import { ValidationError } from "sequelize";
import errorCodes from "../config/errorCodes";

const boom = require("@hapi/boom");

const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json({ ...output.payload, data: err.data });
  }
  next(err);
};

const ormErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      error: { detail: err.parent.detail, ...err.errors[0] },
    });
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    statusCode: 500,
    message: err.message,
    stack: err.stack,
  });
};
export { logErrors, boomErrorHandler, ormErrorHandler, errorHandler };
