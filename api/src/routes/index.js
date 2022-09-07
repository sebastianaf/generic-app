import express from "express";

/**
 * Import Routes
 */
import userRouter from "./user.router";
import roleRouter from "./role.router";
import accessRouter from "./access.router";
import loginRouter from "./login.router";

const routerAPI = (app) => {
  const router = express.Router();
  app.use("/api", router);

  /**
   * Routes
   */
  router.use("/users", userRouter);
  router.use("/roles", roleRouter);
  router.use("/access", accessRouter);
  router.use("/login", loginRouter);

};

export default routerAPI;
