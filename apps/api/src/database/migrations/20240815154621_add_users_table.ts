import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TYPE role AS ENUM ('super_admin', 'artist_manager', 'artist');
  `);

  await knex.raw(`
    CREATE TYPE gender AS ENUM ('m', 'f', 'o');
  `);

  await knex.raw(`CREATE TABLE users (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(256) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    dob TIMESTAMP,
    gender gender NOT NULL,
    role_type role NOT NULL,
    address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) `);

  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';

    CREATE TRIGGER update_users_updated_at BEFORE UPDATE
    ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TRIGGER IF EXISTS update_users_updated_at ON users;
    DROP FUNCTION IF EXISTS update_updated_at_column cascade;
  `);
  await knex.raw(`DROP TABLE users`);
  await knex.raw(`
    DROP TYPE IF EXISTS role;
  `);

  await knex.raw(`
    DROP TYPE IF EXISTS gender;
  `);
}
