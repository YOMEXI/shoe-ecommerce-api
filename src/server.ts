import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";

import app from "./app";

const port = process.env.PORT;

try {
  createConnection();
  console.log("DB cleanly connected");
} catch (error) {
  console.log(error);
}

app.listen(port, async () => {
  console.log(`app running on port ${port}`);
});
