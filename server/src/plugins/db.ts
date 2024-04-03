import { createClient } from "@libsql/client";

console.log("DB_URL_DEV", process.env.DB_URL_DEV);
const db = createClient({
  url: process.env.DB_URL_DEV || "",
  // authToken: process.env.DB_TOKEN || "",
});

export default db;
