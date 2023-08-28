import ViewsRepository from "../../views/repository/sequelize/ViewsRepository";
import { Views } from "../../views/model/Views";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class CreateViewNotificationUseCase {
  public async execute(data: Views): Promise<any> {
    try {
      const repository = new ViewsRepository();

      const response = await repository.create(data);

      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "CreateViewNotificationUseCase.execute",
        message: error,
      });
    }
  }
}
