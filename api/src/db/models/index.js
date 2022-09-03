import { User, UserSchema } from "./user.model";
import { Role, RoleSchema } from "./role.model";

const setupModels = (sequelize) => {
  User.init(UserSchema, User.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  /**
   *
   * Here the other models
   *
   */
};

export { setupModels };
