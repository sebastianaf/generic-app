import { Model, DataTypes, Sequelize } from "sequelize";
import { ROLE_TABLE } from "./role.model";

const USER_TABLE = "users";

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },

  alias: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  roleId: {
    allowNull: true,
    field: "role_id",
    type: DataTypes.INTEGER,
    references: {
      model: ROLE_TABLE,
      key: "id",
    },
  },

  userId: {
    allowNull: true,
    field: "id_user",
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "id",
    },
  },

  createAt: {
    allowNull: true,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

export { USER_TABLE, UserSchema, User };
