import bcrypt from "bcryptjs";

export default class BcryptHelper {
  private saltRounds = 10;
  private password: string;

  constructor(password: string) {
    this.password = password;
  }

  public async hashPassword(): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(this.password, salt);
  }

  public async comparePassword(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
