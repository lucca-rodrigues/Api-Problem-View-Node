import NotificationViewsRepository from "../../notificationViews/repository/sequelize/NotificationViewsRepository";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class GetNotificationViewUseCase {
  public async execute(notificationFind: string): Promise<any> {
    try {
      const repository = new NotificationViewsRepository();
      return await repository.findByLogSubs(notificationFind);

    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "GetNotificationViewUseCase.execute",
        message: error,
      });

      return Promise.reject(error);
    }
  }
}
