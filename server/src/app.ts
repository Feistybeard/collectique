import express, { Express, Request, Response } from "express";
import cors from "cors";
import api from "./api";
import errorHandler from "./api/middlewares/errorHandler.middleware";

const app: Express = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", api);

app.use(errorHandler);

export default app;
