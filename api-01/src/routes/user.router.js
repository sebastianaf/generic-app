import express from "express";

import UserService from "../services/user.service";

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

export default router;
