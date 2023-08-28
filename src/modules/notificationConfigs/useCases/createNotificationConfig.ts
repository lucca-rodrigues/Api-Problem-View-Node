import NotificationConfigs from "../../notificationConfigs/model/NotificationConfigs";
import NotificationConfigsRepository from "../../notificationConfigs/repository/sequelize/NotificationConfigsRepository";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class CreateNotificationConfigUseCase {
  public async execute(timeConfig: NotificationConfigs): Promise<any> {
    try {
      const repository = new NotificationConfigsRepository();
      const response = await repository.create(timeConfig);
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
