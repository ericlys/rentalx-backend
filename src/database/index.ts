import "reflect-metadata";
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";
import { CreateCategories1662575549333 } from "./migrations/1662575549333-CreateCategories";

export const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "database",
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: [CreateCategories1662575549333],
  entities: [Category],
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
