import mongoose from "mongoose";
import { DB_CONFIG } from "../../config";
import { log } from "console";

const db = async () => {
  await mongoose
    .set("strictQuery", false)
    .connect(
      `mongodb://${DB_CONFIG.username}:${DB_CONFIG.password}@${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.name}?authSource=${DB_CONFIG.authsource}`
    )
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((err) => console.error(err));
};

export default db;
