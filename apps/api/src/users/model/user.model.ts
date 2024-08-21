import { Exclude, Expose } from "class-transformer";
import { RoleEnum } from "../types/types";
import { GenderEnum } from "@server/common/types/types";

class UserModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  @Exclude()
  password: string;
  phone: string;
  dob: Date;
  gender: GenderEnum;
  role: RoleEnum;
  @Expose({ name: "address" })
  Address: string;
}

export default UserModel;
