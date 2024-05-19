import "dotenv/config";

export const SERVER_PORT = process.env.SERVER_PORT || 3000;

export const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 27017,
  name: process.env.DB_NAME || "collectique",
};

export const JWT_SECRET = process.env.JWT_SECRET;
