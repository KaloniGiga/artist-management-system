import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { Knex } from "knex";
import * as path from "path";

config({ path: path.join(__dirname, `../../.env.development`) });

const configService = new ConfigService();

console.log(
  configService.get("POSTGRES_PASSWORD"),
  process.env.POSTGRES_PASSWORD,
);
const knexConfig: Knex.Config = {
  client: "postgresql",
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
