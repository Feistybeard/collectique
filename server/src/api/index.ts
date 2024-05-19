import express from "express";
const app = express();

import api from "./routes";
api(app);

export default app;
