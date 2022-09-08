import "reflect-metadata";
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
import { CreateCategories1662575549333 } from "./migrations/1662575549333-CreateCategories";
import { CreateSpecifications1662605988388 } from "./migrations/1662605988388-CreateSpecifications";
// yarn typeorm -d src/database/index.ts migration:run
export const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "docker",
  password: "ignite",
  database: "rentx",
  entities: [Category, Specification],
  migrations: [
    CreateCategories1662575549333,
    CreateSpecifications1662605988388,
  ],
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
