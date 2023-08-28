import NotificationConfigsRepository from "../../notificationConfigs/repository/sequelize/NotificationConfigsRepository";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class GetNotificationConfigUseCase {
  public async execute(): Promise<number> {
    try {
      const repository = new NotificationConfigsRepository();
      const response = await repository.find();
      return response?.notificationTime;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "GetNotificationConfigUseCase.execute",
        message: error,
      });

      return Promise.reject(error);
    }
  }
}
