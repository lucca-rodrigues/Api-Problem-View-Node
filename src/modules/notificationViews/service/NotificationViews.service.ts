import {
  CreateNotificationViewUseCase,
  GetNotificationViewUseCase,
  UpdateNotificationViewUseCase,
} from "../../notificationViews/useCases";
import NotificationViews from "../../notificationViews/model/NotificationViews";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export default class NotificationViewsService {
  
  public async getNotificationViewBySubLog(str: string): Promise<any> {
    try {
      const useCase = new GetNotificationViewUseCase();
      return await useCase.execute(str)
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "NotificationViewsService.createNotificationView",
        message: error,
      });
    }
  }
 
  public async updateNotificationView(data: NotificationViews, id: number): Promise<any> {
    try {
      const useCase = new UpdateNotificationViewUseCase();
      await useCase.execute(data, id)
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "NotificationViewsService.updateNotificationView",
        message: error,
      });
    }
  }

  public async createNotificationView(data: NotificationViews): Promise<any> {
    try {
      const useCase = new CreateNotificationViewUseCase();
      await useCase.execute(data)
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "NotificationViewsService.createNotificationView",
        message: error,
      });
    }
  }
}
