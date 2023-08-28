import {
  CreateNotificationConfigUseCase,
  GetNotificationConfigUseCase,
} from "../../notificationConfigs/useCases";
import NotificationConfigs from "../../notificationConfigs/model/NotificationConfigs";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export default class NotificationConfigsService {
  public async getConfigs(): Promise<any> {
    try {
      const useCase = new GetNotificationConfigUseCase();
      const response = await useCase.execute();

      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "NotificationConfigsService.getConfigs",
        message: error,
      });
    }
  }

  public async createConfigs(timeConfig?: NotificationConfigs): Promise<any> {
    try {
      const useCase = new CreateNotificationConfigUseCase();
      const defaultTimeConfig = timeConfig ?? { notificationTime: 30 };

      const configsAlreadyExists = await this.getConfigs();

      if (!configsAlreadyExists) {
        logger.emit({
          tag: "INFO",
          funcName: "NotificationConfigsService.createConfigs",
          message: "Configs not found, creating new default time config",
        });
        const response = await useCase.execute(defaultTimeConfig);
        return response;
      }
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "NotificationConfigsService.createConfigs",
        message: error,
      });
    }
  }
}
