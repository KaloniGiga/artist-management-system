import { Injectable, NotFoundException } from "@nestjs/common";
import DatabaseService from "@server/database/database.service";
import { plainToInstance } from "class-transformer";
import UserModel from "../model/user.model";
import UserDto from "../dto/user.dto";

@Injectable()
class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllUser(page: number, limit: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `SELECT * FROM users LIMIT $1 OFFSET $2`,
      [limit, page * limit],
    );
    return plainToInstance(UserModel, databaseResponse.rows);
  }

  async getUserById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `SELECT * FROM users WHERE id=$1`,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(UserModel, entity);
  }

  async getUserByEmail(email: string) {
    const databaseResponse = await this.databaseService.runQuery(
      `SELECT * FROM users WHERE email=$1`,
      [email],
    );
    return databaseResponse.rows[0];
  }

  async create(userData: UserDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
         INSERT INTO users (first_name, last_name, email, password, phone, dob, gender, role_type, address, artist_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETuRNING *
        `,
      [
        userData.first_name,
        userData.last_name,
        userData.email,
        userData.password,
        userData.phone,
        userData.dob,
        userData.gender,
        userData.role_type,
        userData.address,
        userData.artistId ? userData.artistId : null,
      ],
    );

    return plainToInstance(UserModel, databaseResponse.rows[0]);
  }

  async update(id: number, userData: UserDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      UPDATE users
      SET first_name = $2, last_name = $3, email = $4, phone = $5, dob = $6, gender = $7, role_type = $8, address = $9, password = $10, artist_id = $11 WHERE id = $1 RETURNING *
      `,
      [
        id,
        userData.first_name,
        userData.last_name,
        userData.email,
        userData.phone,
        userData.dob,
        userData.gender,
        userData.role_type,
        userData.address,
        userData.password,
        userData.artistId ? userData.artistId : null,
      ],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(UserDto, entity);
  }

  async delete(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
        DELETE FROM users WHERE id=$1
        `,
      [id],
    );
    if (databaseResponse.rowCount == 0) {
      throw new NotFoundException();
    }
  }
}

export default UsersRepository;
