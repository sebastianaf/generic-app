import express from "express";

import UserService from "../services/user.service";
import {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} from "../schemas/user.schema";
import validatorHandler from "../middlewares/validator.handler";

const router = express.Router();
const service = new UserService();

router.get("/", async (req, res, next) => {
  try {
    const users = await service.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validatorHandler(createUserSchema, `body`),
  async (req, res, next) => {
    try {
      const users = await service.register(req.body);
      console.log(users);
      res.send({});
    } catch (error) {
      next(error);
    }
  }
);

export default router;
