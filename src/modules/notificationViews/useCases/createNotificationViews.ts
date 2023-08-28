import NotificationViews from "../../notificationViews/model/NotificationViews";
import NotificationViewsRepository from "../../notificationViews/repository/sequelize/NotificationViewsRepository";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class CreateNotificationViewUseCase {
  public async execute(data: NotificationViews): Promise<any> {
    try {
      const repository = new NotificationViewsRepository();
      const response = await repository.create(data);
      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "CreateNotificationConfigUseCase.execute",
        message: error,
      });
    }
  }
}
