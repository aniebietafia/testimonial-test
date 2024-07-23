import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async signup(req: Request, res: Response) {
    try {
      const user = await this.authService.signUp(req.body);

      res.status(201).json(user);
    } catch (error) {
      res
        .status(400)
        .json({ error: error.message, message: "User already exists" });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const user = await this.authService.login(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
