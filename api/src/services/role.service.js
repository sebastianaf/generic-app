import sequelize from "../db/sequelize";

const { models } = sequelize;

class RoleService {
  constructor() {}

  async find(filter) {
    let obj = await models.Role.findAll(filter);
    return obj;
  }

  async findOne(id) {
    const obj = await models.Role.findByPk(id);
    return obj;
  }

  async create(data) {
    const obj2 = await models.Role.create(data);
    return obj2;
  }

  async update(id, data) {
    const obj = await models.Role.findByPk(id);
    const res = await obj.update(data);
    return res;
  }

  async delete(id) {
    const obj = await models.Role.findByPk(id);
    await obj.destroy();
    return { error: null };
  }
}

export default RoleService;
