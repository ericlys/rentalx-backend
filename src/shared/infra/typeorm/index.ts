import "reflect-metadata";
import { DataSource } from "typeorm";
// yarn typeorm -d src/database/index.ts migration:run
// yarn typeorm -d src/shared/infra/typeorm/index.ts migration:run
// yarn typeorm migration:create src/database/migrations/{name}
// yarn typeorm migration:create src/shared/infra/typeorm/migrations/CreateCars
export const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "docker",
  password: "ignite",
  database: "rentx",
  entities: ["src/modules/**/entities/*.ts"],
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
});

export function createConnection(
  host = "database_rentalx"
): Promise<DataSource> {
  return dataSource
    .setOptions({
      host,
    })
    .initialize();
}
