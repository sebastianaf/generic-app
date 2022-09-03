import { Model, DataTypes, Sequelize } from "sequelize";

const ROLE_TABLE = "roles";

const RoleSchema = {
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

  createAt: {
    allowNull: true,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Role extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLE_TABLE,
      modelName: "Role",
      timestamps: false,
    };
  }
}

export { ROLE_TABLE, RoleSchema, Role };
