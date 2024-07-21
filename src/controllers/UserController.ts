// src/controllers/UserController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models";
import { generateToken } from "../utils/jwt";

class UserController {
  public async registerUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    // Validate the request
    if (!(email && password && name)) {
      res.status(400).send({ message: "All input is required" });
    }

    // Create a new user
    const user = await AppDataSource.getRepository(User).create({
      name,
      email,
      password,
    });

    // Hash the password
    await user.hashPassword();

    // Save the user
    await AppDataSource.getRepository(User).save(user);

    // Return the user
    res.status(201).json({ status_code: 201, message: "User created successfully", data: user });
  }

  public async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).send({ message: "All input is required" });
      }

      // Get user from database
      const user = await AppDataSource.getRepository(User).findOne({ where: { email } });

      if (!user) {
        res.status(400).send({ message: "Invalid credentials" });
      }

      // Check if encrypted password match
      if (!user.comparePassword(password)) {
        res.status(400).send({ message: "Invalid credentials" });
      }

      // Create token
      const token = generateToken({ email });

      res.status(200).json({ status_code: 200, message: "User logged in successfully", data: { user }, token });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

export default UserController;
