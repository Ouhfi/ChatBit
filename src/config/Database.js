import { Sequelize } from "sequelize";

import env from "./env.js";


const sequelize = new Sequelize(

  {
    password: env.db.password,

    username: env.db.username,
    host: env.db.host,
    port: env.db.port,
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;