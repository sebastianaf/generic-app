import sequelize from "../db/sequelize";
import bcryptjs from "bcryptjs";
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
    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(data.password, salt);
    data.password = encryptedPassword;
    const res = await obj.update(data);
    return res;
  }

  async delete(id) {
    const obj = await models.User.findByPk(id);
    await obj.destroy();
    return { error: null };
  }

  async findOne(id) {
    const obj = await models.User.findByPk(id);
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
