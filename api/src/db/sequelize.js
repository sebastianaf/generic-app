import { Sequelize } from "sequelize";
import { dbData } from "../config/db";
import { setupModels } from "./models";

/**
 * ------------------------ [ DATABASE 01 - DATA ] ------------------------
 */
const sequelize = new Sequelize(dbData.database, dbData.user, dbData.password, {
  dialect: "postgres",
  logging: false,
  host: dbData.host,
  port: dbData.port,
});

/**
 * Setup the models to Sequelize
 */
setupModels(sequelize);
console.log(`Setting up models... OK`);

/**
 * Sync the models with the database
 */
sequelize.sync({ force: true });
console.log(`Syncing models... OK`);

export default sequelize;
