import { User, UserSchema } from "./user.model";
import { Role, RoleSchema } from "./role.model";

const setupModels = (sequelize) => {
  /**
   * Models
   */
  User.init(UserSchema, User.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));

  /**
   * Associations
   */
  User.associate(sequelize.models);
  Role.associate(sequelize.models);
};

export { setupModels };
