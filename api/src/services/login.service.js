import sequelize from "../db/sequelize";
import boom from "@hapi/boom";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { encrypt, decrypt } from "../tools/encryption";

import errorCodes from "../config/errorCodes";

const { models } = sequelize;

class LoginService {
  constructor() {}

  async login(data) {
    const { alias, password } = data;
    /**
     * 1. Check the alias in the database
     * 2. Compare the password
     * 3. If the password is correct return a token
     */
    let user = await models.User.findOne({ where: { alias } });
    if (user) {
      const correct = await bcryptjs.compare(
        password,
        user.dataValues.password
      );
      if (correct) {
        user.dataValues.password = undefined;
        let role = await models.Role.findOne({
          where: { id: user.dataValues.roleId },
        });
        let token = jwt.sign(
          { role: role.dataValues.name, ...user.dataValues },
          process.env.API_TOKEN,
          {
            expiresIn: process.env.API_TOKEN_EXPIRATION_TIME,
          }
        );
        token = encrypt(token);
        return { token };
      }
    }
    throw boom.badRequest(
      errorCodes.BAD_USER_OR_PASSWORD.title,
      errorCodes.BAD_USER_OR_PASSWORD
    );
  }

  async check(token) {
    const decrypted = decrypt(token);
    if (!decrypted) {
      throw boom.badData(errorCodes.BAD_TOKEN.title, errorCodes.BAD_TOKEN);
    }
    return decrypted;
  }
}

export default LoginService;
