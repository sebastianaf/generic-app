import sequelize from "../db/sequelize";
const boom = require("@hapi/boom");
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { MD5, AES, SHA256 } from "crypto-js";

const { models } = sequelize;

class UserService {
  constructor() {}

  async login(data) {
    const { alias, password } = data;
    /**
     * 1. Check the typedAlias in the database
     * 2. Compare the password
     * 3. If the password is correct return a token
     */
    let user = await models.User.findOne({ where: { alias } });
    if (user) {
      const correct = await bcryptjs.compare(password, user.password);
      if (correct) {
        user.dataValues.password = undefined;
        let token = jwt.sign({ ...user.dataValues }, process.env.API_TOKEN, {
          expiresIn: process.env.API_TOKEN_EXPIRATION_TIME,
        });
        token = AES.encrypt(
          token,
          SHA256(process.env.API_TOKEN).toString()
        ).toString();
        return { ...user.dataValues, token };
      }
    }
    return boom.unauthorized("Invalid alias or password");
  }

  async register(data) {
    const { alias, name, password, idUser } = data;
    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(password, salt);
    const newUser = models.User.create({
      password: encryptedPassword,
      alias,
      idUser,
      name,
    });
    return newUser;
  }

  async find() {
    const res = await models.User.findAll();
    return res;
  }
}

export default UserService;
