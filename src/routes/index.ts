import { Router } from "express";
import viewsRouter from "../modules/views/routes/views.routes";

const routes = Router();

routes.use("/api/v1/views", viewsRouter);

export default routes;
