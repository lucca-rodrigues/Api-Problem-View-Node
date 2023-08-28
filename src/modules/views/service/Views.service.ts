import User from "../../users/model/Users";
import { InputViews, Views } from "../../views//model/Views";
import UsersService from "../../users/service/Users.service";
import NotificationConfigsService from "../../notificationConfigs/service/NotificationConfigs.service";
import ProblemsService from "../../problems/service/Problems.service";

import Problems from "../../problems/model/Problems";
import {
  CountViewsUseCase,
  CreateViewNotificationUseCase,
  GetViewNotificationExistsUseCase,
  GetViewsHistoryUseCase,
} from "../useCases";
import { logger } from "../../../configs/fluentD/sendLogFluentd";
import { NotificationInteraction } from "../../../utils/NotificationInteraction";
import KafkaInstance from "../../../utils/kafka";

export default class ViewsService {
  /* ------------------- USE CASES ------------------- */
  createViewUseCase = new CreateViewNotificationUseCase();
  getViewUseCase = new GetViewNotificationExistsUseCase();
  countViewsUseCase = new CountViewsUseCase();
  getViewsHistoryUseCase = new GetViewsHistoryUseCase();

  /* ------------------- SERVICES ------------------- */
  notificationsService = new NotificationConfigsService();
  usersService = new UsersService();
  problemsService = new ProblemsService();

  public async createView(data: InputViews): Promise<any> {
    const {
      userId,
      userName,
      userAvatarUrl,
      userEmail,

      problemId,
      description,

      ownerId,
      ownerName,
      ownerAvatarUrl,
      ownerEmail,
    } = data;

    const defaultAvatar =
      "https://i.gyazo.com/499dda909b1ebfe0375d1efa2d5d00a8.png";

    const view: Views = {
      UserId: userId,
      ProblemId: problemId,
    };

    const user: User = {
      id: userId,
      userName,
      avatarUrl: userAvatarUrl ?? defaultAvatar,
      email: userEmail,
    };

    const userOwner: User = {
      id: ownerId,
      userName: ownerName,
      avatarUrl: ownerAvatarUrl ?? defaultAvatar,
      email: ownerEmail,
    };

    const problem: Problems = {
      id: problemId,
      ownerId,
      description,
    };

    try {
      await this.notificationsService.createConfigs();
      const viewAlwreadyExists = await this.getViewUseCase.execute(view);
      const viewerIsOwner =
        userId === ownerId ||
        (await this.problemsService.getProblemByOwner(problemId, userId));

      await this.problemsService.createProblem(problem);

      if (!viewAlwreadyExists && !viewerIsOwner) {
        logger.emit({
          tag: "INFO",
          funcName: "UsersService.createView",
          message: "View not found, and viewer is not owner, creating new view",
        });

        await this.usersService.createUser(user);
        await this.usersService.createUser(userOwner);

        const viewResponse = await this.createViewUseCase.execute(view);

        return viewResponse;
      }
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "ViewsService.createView",
        message: error,
      });
    }
  }

  public async getViews() {
    try {
      const response = await this.countViewsUseCase.execute();

      if (response.length > 0) {
        for (let viewObj of response) {
          const notificationInteraction =
            NotificationInteraction.createFromObjectView(viewObj);
          const formattedNotification = notificationInteraction.format();
          await KafkaInstance.produceToTopic(
            "notification",
            formattedNotification
          );
        }
      }

      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "ViewsService.getViews",
        message: error,
      });
    }
  }

  public async getHistory() {
    try {
      const response = await this.getViewsHistoryUseCase.execute();

      if (response.length > 0) {
        for (let viewObj of response) {
          const notificationInteraction =
            NotificationInteraction.createFromObjectNotView(viewObj);
          const formattedNotification = notificationInteraction.format();
          await KafkaInstance.produceToTopic(
            "notification",
            formattedNotification
          );
        }
      }

      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "ViewsService.getHistory",
        message: error,
      });
    }
  }
}
