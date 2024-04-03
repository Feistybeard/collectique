import express, { Express, Request, Response } from "express";
import "dotenv/config";
import db from "./plugins/db";
// import api from "./api";

const app: Express = express();
const port = process.env.PORT || 3000;

async function databaseTest() {
  await db.execute("SELECT * FROM users");
}

app.get("/", (req: Request, res: Response) => {
  res.send("Collectique API is running!");
});

app.listen(port, () => {
  console.log(
    `[Collectique API]: Server is running at http://localhost:${port}`
  );
});
