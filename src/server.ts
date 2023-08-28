// index.ts
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";

import AppError from "./middlewares/errors/AppError";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
const { default: AdminBro } = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
import adminBro from "./admin";
import { authenticate } from './admin-auth';

const port = process.env.PORT || 3001;
const app = express();
const adminBroRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate,
  cookieName: 'adminbro',
  cookiePassword: 'some-long-and-secure-password',
});

app.use(cors());
app.use(express.json());
app.use(adminBro.options.rootPath, adminBroRouter);

app.use(routes);
app.get("/health", (request, response) => {
  return response.status(200).json({ message: "Server is running" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}! 🏆`);
  console.log(`Admin is started on http://localhost:${port}/admin`);
});
