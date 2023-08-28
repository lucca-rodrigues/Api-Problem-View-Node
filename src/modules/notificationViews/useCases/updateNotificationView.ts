import NotificationViewsRepository from "../repository/sequelize/NotificationViewsRepository";
import { logger } from "../../../configs/fluentD/sendLogFluentd";
import NotificationViews from "../model/NotificationViews";

export class UpdateNotificationViewUseCase {
  public async execute(data: NotificationViews, id: number): Promise<any> {
    try {
      const repository = new NotificationViewsRepository();
      return await repository.update(data, id);

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
