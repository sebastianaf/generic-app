import express from "express";

import RoleService from "../services/role.service";
import { getRoleSchema } from "../schemas/role.shema";
import validatorHandler from "../middlewares/validator.handler";

const router = express.Router();
const service = new RoleService();

router.get(
  "/",
  validatorHandler(getRoleSchema, `body`),
  async (req, res, next) => {
    try {
      const roles = await service.findAll();
      res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
