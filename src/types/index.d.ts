import { User } from "../models";

export interface IUserService {
  getUserById(id: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
}

export interface IRole {
  role: "super_admin" | "admin" | "user";
}

export interface IUserSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUserProfileUpdate {
  first_name: string;
  last_name: string;
  phone: string;
  avatarUrl: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAuthService {
  login(payload: IUserLogin): Promise<unknown>;
  signUp(payload: IUserSignUp, res: unknown): Promise<unknown>;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
