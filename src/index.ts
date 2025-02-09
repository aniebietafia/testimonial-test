import "reflect-metadata";
import { AppDataSource } from "./data-source";
import log from "./utils/logger";
import express, { Express, Request, Response } from "express";
import config from "./config";
import authRoute from "./routes/auth";
import testimonialRouter from "./routes/testimonial";
import userRoute from "./routes/user";
import dotenv from "dotenv";

dotenv.config();

const port = config.port;
const server: Express = express();
AppDataSource.initialize()
  .then(async () => {
    // seed().catch(log.error);
    server.use(express.json());
    server.get("/", (req: Request, res: Response) => {
      res.send("Hello world");
    });
    server.use("/api/v1", authRoute);
    server.use("/api/v1", testimonialRouter);
    server.use("/api/v1", userRoute);

    server.listen(port, () => {
      log.info(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => console.error(error));

export default server;
