import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { Knex } from "knex";
import * as path from "path";

config({
  path: path.join(
    __dirname,
    `../../.env.${process.env.NODE_ENV || "development"}`,
  ),
});
const configService = new ConfigService();

const knexConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: configService.get("POSTGRES_HOST"),
    port: configService.get("POSTGRES_PORT"),
    user: configService.get("POSTGRES_USER"),
    password: configService.get("POSTGRES_PASSWORD"),
    database: configService.get("POSTGRES_DB"),
  },
  migrations: {
    directory: "./migrations",
  },
};

export default knexConfig;
