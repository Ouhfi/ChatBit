import app from "./app.js";
import env from "./config/env.js";
import sequelize from "./config/Database.js";
import "./models/index.js";

try {
  await sequelize.authenticate();
  console.log("Database connection established successfully.");

  await sequelize.sync();
  console.log("Models synchronized successfully.");

  app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
  });

  console.log("After app.listen()");
} catch (error) {
  console.error("Unable to connect to database:", error);
}