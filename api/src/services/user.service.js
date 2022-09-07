import sequelize from "../db/sequelize";
import boom from "@hapi/boom";
import bcryptjs from "bcryptjs";
import errorCodes from "../config/errorCodes";
import RoleService from "./role.service";

const roleService = new RoleService();
const { models } = sequelize;

class UserService {
  constructor() {}

  async find(filter) {
    let obj = await models.User.findAll(filter);
    return obj;
  }

  async update(id, data) {
    const obj = await models.User.findByPk(id);
    if (!obj) {
      throw boom.notFound(
        errorCodes.DB_NOT_FOUND.title,
        errorCodes.DB_NOT_FOUND
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(data.password, salt);
    data.password = encryptedPassword;
    const res = await obj.update(data);
    return res;
  }

  async delete(id) {
    const obj = await models.User.findByPk(id);
    if (!obj) {
      throw boom.notFound(
        errorCodes.DB_NOT_FOUND.title,
        errorCodes.DB_NOT_FOUND
      );
    }
    await obj.destroy();
    return { error: null };
  }

  async findOne(id) {
    const obj = await models.User.findByPk(id);
    if (!obj) {
      throw boom.notFound(
        errorCodes.DB_NOT_FOUND.title,
        errorCodes.DB_NOT_FOUND
      );
    }
    return obj;
  }

  async createfirstUser() {
    let obj2 = await models.Role.findOne({ where: { name: "admin" } });
    if (!obj2) {
      let role = {
        name: "admin",
      };
      roleService.create(role);
    }

    let firstUser = {
      alias: "admin",
      password: "admin",
      userId: 1,
      name: "Admin",
      roleId: 1,
    };

    const obj = await models.User.findOne({ where: { alias: "admin" } });
    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(firstUser.password, salt);
    if (obj) {
      return obj.update({
        ...firstUser,
        password: encryptedPassword,
      });
    } else {
      return this.create({
        ...firstUser,
        password: encryptedPassword,
      });
    }
  }

  async create(data) {
    const { alias, name, password, roleId, userId } = data;
    const obj1 = await models.User.findAll({ where: { name } });
    const obj2 = await models.User.findAll({ where: { alias } });
    if (obj1.length > 0 || obj2.length > 0) {
      throw boom.conflict(
        errorCodes.DB_DUPLICADE.title,
        errorCodes.DB_DUPLICADE
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(password, salt);
    const newUser = await models.User.create({
      password: encryptedPassword,
      alias,
      userId,
      name,
      roleId,
    });
    return newUser;
  }
}

export default UserService;
