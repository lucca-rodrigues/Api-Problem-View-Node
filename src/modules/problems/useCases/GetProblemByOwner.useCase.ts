import Problems from "../../problems/model/Problems";
import ProblemsRepository from "../../problems/repository/sequelize/ProblemsRepository";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class GetProblemByOwnerUseCase {
  public async execute(problemId: string, userId: string): Promise<any> {
    try {
      const repository = new ProblemsRepository();
      const response = await repository.findByOwner(problemId, userId);
      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "GetProblemByOwnerUseCase.execute",
        message: error,
      });
    }
  }
}
