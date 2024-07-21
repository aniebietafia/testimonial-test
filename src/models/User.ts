import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { IsEmail, Length } from "class-validator";
import ExtendedBaseEntity from "./extended-base-entity";
import { getIsInvalidMessage } from "../utils";
import bcrypt from "bcryptjs";

@Entity()
@Unique(["email"])
export class User extends ExtendedBaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  @IsEmail(undefined, { message: getIsInvalidMessage("Email") })
  email: string;

  @Column()
  password: string;

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
