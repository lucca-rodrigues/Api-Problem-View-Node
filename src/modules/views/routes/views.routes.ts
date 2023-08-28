import { Router } from "express";
import ViewsController from "../controller/Views.controller";
import isAuthenticated from "../../../middlewares/auth/isAuthenticated";

const viewsRouter = Router();
const viewsController = new ViewsController();

/**
 * @description: THIS REQUEST RETURN COUNTER VIEWS ON DEFAULT TIME SELECTED AND CONTAINS QUANTITY OF PROBLEM
 * @method: GET
 * @route: /api/v1/views
 * return: [{ problemId, firstViewer, description, views, avatarUrl }]
 */
viewsRouter.get("/", viewsController.index);

/**
 * @description: THIS REQUEST VERIFY AND RETURN PROBLEMS WHEN NOT CONTAINS VIEWS ON LAST 5 DAYS
 * @method: GET
 * @route: /api/v1/views/history
 * return: [{ problemId, ownerId, description, avatarUrl }]
 */
viewsRouter.get("/history", viewsController.history);

/**
 * @description: THIS REQUEST SAVE THE PROBLEM, VIEW, OWNER AND VIEWER USER
 * @method: POST
 * @route: /api/v1/views
 * params: { problemId, userId, userName, ownerId, description, avatarUrl, email }
 */
viewsRouter.post("/", isAuthenticated, viewsController.create);

export default viewsRouter;
