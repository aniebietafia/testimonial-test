// src/services/UserService.ts
import { User } from "../models/User";
import { IUserService } from "../types";

export class UserService implements IUserService {
  public async getUserById(id: string): Promise<User | null> {
    const user = await User.findOne({
      where: { id },
      relations: ["profile", "products", "organizations"],
    });
    return user;
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await User.find({
      relations: ["profile", "products", "organizations"],
    });
    return users;
  }

  public async registerUser(name: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    await user.hashPassword();
    await user.save();
    return user;
  }

  public async loginUser(email: string, password: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }
}
