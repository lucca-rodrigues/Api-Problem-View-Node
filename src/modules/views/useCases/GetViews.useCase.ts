import ViewsRepository from "../../views/repository/sequelize/ViewsRepository";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class GetViewsUseCase {
  public async execute(lastTime: number): Promise<any> {
    try {
      const repository = new ViewsRepository();
      const response = await repository.findAllByLastDefaultTime(lastTime);

      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "GetViewsUseCase.execute",
        message: error,
      });
    }
  }
}
