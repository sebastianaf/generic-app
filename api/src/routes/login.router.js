import express from "express";

import LoginService from "../services/login.service";
import { getLoginSchema, postLoginSchema } from "../schemas/login.schema";
import validatorHandler from "../middlewares/validator.handler";

const router = express.Router();
const service = new LoginService();

router.post(
  "/",
  validatorHandler(postLoginSchema, `body`),
  async (req, res, next) => {
    try {
      const obj = await service.login(req.body);
      res.status(200).json(obj);
      next();
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  async (req, res, next) => {
    try {
      const obj = await service.check(req.headers.token);
      res.status(200).json(obj);
      next();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
