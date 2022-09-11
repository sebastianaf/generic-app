import express from "express";

import AccessService from "../services/access.service";
import {
  postAccessSchema,
  patchAccessSchema,
  getIdAccessSchema,
  getIdQueryAccessSchema,
} from "../schemas/access.schema";
import validatorHandler from "../middlewares/validator.handler";

const router = express.Router();
const service = new AccessService();

router.get(
  "/",
  validatorHandler(getIdQueryAccessSchema, `query`),
  async (req, res, next) => {
    try {
      let result = [];
      if (req.query._id) {
        result = await service.find({ _id: req.query._id });
      } else {
        result = await service.find({});
      }
      res.status(200).json({ statusCode: 200, error: null, data: result });
      next();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(postAccessSchema, `body`),
  async (req, res, next) => {
    try {
      const result = await service.save(req.body);
      res.status(200).json({ statusCode: 200, error: null, data: result });
      next();
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/",
  validatorHandler(getIdAccessSchema, `query`),
  validatorHandler(patchAccessSchema, `body`),
  async (req, res, next) => {
    try {
      const result = await service.updateOne(req.query._id, req.body);
      res.status(200).json({ statusCode: 200, error: null, data: result });
      next();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/",
  validatorHandler(getIdAccessSchema, `query`),
  async (req, res, next) => {
    try {
      const result = await service.deleteOne(req.query._id);
      res.status(200).json({ statusCode: 200, error: null, data: result });
      next();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
