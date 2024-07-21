import "reflect-metadata";
import { DataSource, Tree } from "typeorm";
import config from "./config";
import { UserTestimonyTable1721580424926 } from "./migrations/1721580424926-UserTestimonyTable";
import { User, Testimonial } from "./models";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: 5432,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Testimonial],
  migrations: [UserTestimonyTable1721580424926],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: config.DB_HOST,
//   port: 5432,
//   username: config.DB_USER,
//   password: config.DB_PASSWORD,
//   database: config.DB_NAME,
//   synchronize: true,
//   logging: false,
//   entities: ["src/models/**/*.ts"],
//   ssl: true,
//   extra: {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   },
// });
