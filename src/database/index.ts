import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../modules/accounts/entities/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
import { CreateCategories1662575549333 } from "./migrations/1662575549333-CreateCategories";
import { CreateSpecifications1662605988388 } from "./migrations/1662605988388-CreateSpecifications";
import { CreateUsers1662689908852 } from "./migrations/1662689908852-CreateUsers";
import { AlterUserDeleteUsername1662871280861 } from "./migrations/1662871280861-AlterUserDeleteUsername";
// yarn typeorm -d src/database/index.ts migration:run
export const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "database_rentalx",
  username: "docker",
  password: "ignite",
  database: "rentx",
  entities: [Category, Specification, User],
  migrations: [
    CreateCategories1662575549333,
    CreateSpecifications1662605988388,
    CreateUsers1662689908852,
    AlterUserDeleteUsername1662871280861,
  ],
});

dataSource
  .initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
