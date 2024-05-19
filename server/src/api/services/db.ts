import mongoose from "mongoose";
import { DB_CONFIG } from "../../config";

const db = async () => {
  await mongoose
    .set("strictQuery", false)
    .connect(`mongodb://${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.name}`)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((err) => console.error(err));
};

export default db;
