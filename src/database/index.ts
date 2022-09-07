import "reflect-metadata";
import { DataSource } from "typeorm";

import { CreateCategories1662575549333 } from "./migrations/1662575549333-CreateCategories";

export const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: [CreateCategories1662575549333],
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
