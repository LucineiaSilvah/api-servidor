import express from "express";

import { config } from "dotenv";

import router from "./routes.js";
import cors from "cors";
config();
const app = express();

app.use(express.json());
app.use(cors());
const baseUrl = process.env.BASE_URL ?? "http://localhost";
const port = process.env.PORT ?? 3000;
app.use(router);
app.listen(port, () => {
  console.log(`servidor rodando ${baseUrl}:${port}\n `);
});
