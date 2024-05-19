import db from "./api/services/db";
import app from "./app";
import { SERVER_PORT } from "./config";

const port = SERVER_PORT || 3000;

app.listen(port, () => {
  db();
  console.log(
    `[Collectique API]: Server is running at http://localhost:${port}`
  );
});
