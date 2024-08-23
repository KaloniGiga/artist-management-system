import { Global, Module } from "@nestjs/common";
import {
  ConfigurableDatabaseModule,
  CONNECTION_POOL,
  DATABASE_OPTIONS,
} from "./database.module.definition";
import DatabaseOptions from "./types/databaseOptions";
import { Pool } from "pg";
import DatabaseService from "./database.service";

@Global()
@Module({
  exports: [DatabaseService],
  providers: [
    DatabaseService,
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        return new Pool({
          host: databaseOptions.host,
          port: databaseOptions.port,
          user: databaseOptions.user,
          password: databaseOptions.password,
          database: databaseOptions.database,
          ssl: {
            rejectUnauthorized: false,
          },
        });
      },
    },
  ],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
