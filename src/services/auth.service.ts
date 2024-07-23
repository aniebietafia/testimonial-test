import { AppDataSource } from "../data-source";
import { User, Profile } from "../models";
import { IAuthService, IUserSignUp, IUserLogin } from "../types";
import BcryptHelper from "../utils/bcrypt.util";
import { generateToken } from "../utils/jwt";

export class AuthService implements IAuthService {
  public async signUp(
    payload: IUserSignUp
  ): Promise<{ userWithoutPassword: Partial<User> }> {
    const { firstName, lastName, email, password, phone } = payload;
    const bcryptHelper = new BcryptHelper(password);

    try {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcryptHelper.hashPassword();
      const user = new User();
      user.name = `${firstName} ${lastName}`;
      user.email = email;
      user.password = hashedPassword;

      const profile = new Profile();
      profile.first_name = firstName;
      profile.last_name = lastName;
      profile.phone = phone;
      profile.avatarUrl = "";

      user.profile = profile;

      const createdUser = await AppDataSource.manager.save(user);
      const { password: _, ...userWithoutPassword } = createdUser;

      await AppDataSource.manager.save(profile);

      return { userWithoutPassword };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  public async login(
    payload: IUserLogin
  ): Promise<{ access_token: string; user: Partial<User> }> {
    const { email, password } = payload;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error("User not found");
      }

      const bcryptHelper = new BcryptHelper(password);
      const isPasswordValid = await bcryptHelper.comparePassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = generateToken({ user });
      const { password: _, ...userWithoutPassword } = user;

      return { user: userWithoutPassword, access_token: token };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
