import sequelize from "../db/sequelize";
import boom from "@hapi/boom";
import bcryptjs from "bcryptjs";

const { models } = sequelize;

class UserService {
  constructor() {}

  async register(data) {
    const { alias, name, password, idUser } = data;
    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(password, salt);
    const record = models.User.build({
      password: encryptedPassword,
      alias,
      idUser,
      name,
    });
    await record.save();
  }

  async find() {
    const res = await models.User.findAll();
    return res;
  }
}

export default UserService;
