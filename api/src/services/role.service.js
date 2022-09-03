import sequelize from "../db/sequelize";

const { models } = sequelize;

class RoleService {
  constructor() {}

  async findAll() {
    let roles = await models.Role.findAll();
    return roles;
  }

  async findOne({ id }) {
    let role = await models.Role.findOne({ where: { id } });
    return role;
  }
}

export default RoleService;
