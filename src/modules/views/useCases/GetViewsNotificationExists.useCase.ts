// import User from "../../users/model/Users";
import ViewsRepository from "../../views/repository/sequelize/ViewsRepository";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class GetViewNotificationExistsUseCase {
  public async execute(data: any): Promise<any> {
    try {
      const repository = new ViewsRepository();

      const response = await repository.find(data);

      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "GetViewNotificationExistsUseCase.execute",
        message: error,
      });
    }
  }
}
