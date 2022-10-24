import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
// yarn typeorm -d src/database/index.ts migration:run
// yarn typeorm -d src/shared/infra/typeorm/index.ts migration:run
// yarn typeorm migration:create src/database/migrations/{name}
// yarn typeorm migration:create src/shared/infra/typeorm/migrations/CreateCars
export const dataSource = new DataSource({
  type: "postgres",
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  // host: process.env.NODE_ENV === "test" ? "localhost" : "database_rentalx",
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.DB_DATABASE_TEST
      : process.env.DB_DATABASE,
  // .js - build
  // .ts - in development
  entities: ["src/modules/**/entities/*.js"],
  migrations: ["src/shared/infra/typeorm/migrations/*.js"],
});

export async function createConnection(
  host = process.env.DB_HOST
): Promise<DataSource> {
  return dataSource
    .setOptions({
      host,
    })
    .initialize();
}
