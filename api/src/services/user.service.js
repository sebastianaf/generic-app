import sequelize from "../db/sequelize";
import bcryptjs from "bcryptjs";
import RoleService from "./role.service";
import boom from "@hapi/boom";
import errorCodes from "../config/errorCodes";

const roleService = new RoleService();
const { models } = sequelize;

class UserService {
  constructor() {}

  async find(filter) {
    let obj = await models.User.findAll({
      include: ["role", "user"],
    });
    return obj;
  }

  async findOne(id) {
    const obj = await models.User.findByPk(id, {
      include: ["role", "user"],
    });
    console.log(obj);
    if (!obj) {
      throw boom.notFound(
        errorCodes.DB_NOT_FOUND.name,
        errorCodes.DB_NOT_FOUND
      );
    }
    return obj;
  }

  async update(id, data) {
    const obj = await this.findOne(id);

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);
    data.password = hashedPassword;

    const res = await obj.update(data);
    return res;
  }

  async delete(id) {
    const obj = await this.findOne(id);
    await obj.destroy();
    return null;
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
    const hashedPassword = await bcryptjs.hash(firstUser.password, salt);
    if (obj) {
      return await obj.update({
        ...firstUser,
        password: hashedPassword,
      });
    } else {
      return await models.User.create({
        ...firstUser,
        password: hashedPassword,
      });
    }
  }

  async create(data) {
    const { alias, name, password, roleId, userId } = data;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await models.User.create({
      password: hashedPassword,
      alias,
      userId,
      name,
      roleId,
    });
    return newUser;
  }
}

export default UserService;
