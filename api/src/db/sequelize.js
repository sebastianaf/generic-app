import { Sequelize } from "sequelize";
import { dbUsers, dbData } from "../config/db";
import { setupModels } from "./models";

/**
 * ------------------------ [ DATABASE 01 - USERS ] ------------------------
 */
/* const sequelizeUsers = new Sequelize(database, user, password, {
  dialect: "postgres",
  logging: false,
  host,
  port,
});
 */
/**
 * Setup the models to Sequelize
 */
/* console.log(`-----------Septing up models-----------`);
setupModels(sequelizeUsers);
 */
/**
 * Sync the models with the database
 */
console.log(`-----------Syncing models-----------`);
/* sequelizeUsers.sync({ force: false }); */

/**
 * ------------------------ [ DATABASE 02 - DATA ] ------------------------
 */
const sequelizeData = new Sequelize(
  dbData.database,
  dbData.user,
  dbData.password,
  {
    dialect: "postgres",
    logging: false,
    host: dbData.host,
    port: dbData.port,
  }
);

/**
 * Setup the models to Sequelize
 */
console.log(`-----------Septing up models-----------`);
setupModels(sequelizeData);

/**
 * Sync the models with the database
 */
console.log(`-----------Syncing models-----------`);
sequelizeData.sync({ force: false });

export { sequelizeData, sequelizeUsers };
