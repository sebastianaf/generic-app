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
};

class Role extends Model {
  static associate(models) {
    this.hasMany(models.User, {
      foreignKey: "roleId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLE_TABLE,
      modelName: "Role",
      timestamps: true,
      underscored: true,
    };
  }
}

export { ROLE_TABLE, RoleSchema, Role };
