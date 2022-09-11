import express from "express";

import UserService from "../services/user.service";
import { getIdUserSchema, getIdQueryUserSchema, postUserSchema, patchUserSchema } from "../schemas/user.schema";
import validatorHandler from "../middlewares/validator.handler";

const router = express.Router();
const service = new UserService();

router.get(
  "/",
  validatorHandler(getIdQueryUserSchema, `query`),
  async (req, res, next) => {
    try {
      let obj = [];
      if (req.query._id) {
        obj = await service.findOne(req.query._id);
      } else {
        obj = await service.find({});
      }
      res.status(200).json(obj);
      next()
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(postUserSchema, `body`),
  async (req, res, next) => {
    try {
      const obj = await service.create(req.body);
      res.status(201).json(obj);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/",
  validatorHandler(getIdUserSchema, `query`),
  validatorHandler(patchUserSchema, `body`),
  async (req, res, next) => {
    try {
      const obj = await service.update(req.query._id, req.body);
      res.status(200).json(obj);
      next();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/",
  validatorHandler(getIdUserSchema, `query`),
  async (req, res, next) => {
    try {
      const result = await service.delete(req.query._id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
