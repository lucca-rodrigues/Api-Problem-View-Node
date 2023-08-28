import Problems from "../../problems/model/Problems";
import ProblemsRepository from "../../problems/repository/sequelize/ProblemsRepository";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class GetProblemUseCase {
  public async execute(problem: Problems): Promise<any> {
    try {
      const repository = new ProblemsRepository();
      const response = await repository.find(problem);
      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "GetProblemUseCase.execute",
        message: error,
      });
    }
  }
}
