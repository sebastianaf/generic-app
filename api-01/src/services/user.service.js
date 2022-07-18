import sequelize from "../db/sequelize";
import boom from "@hapi/boom";

const { models } = sequelize;

class UserService {
  constructor() {}

  async find() {
    try {
      const res = await models.User.findAll();
      return res;
    } catch (error) {
      return boom.badData();
    }
  }
}

export default UserService;
