import Problems from "../../problems/model/Problems";
import ProblemsRepository from "../../problems/repository/sequelize/ProblemsRepository";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class GetAllProblemsUseCase {
  public async execute(): Promise<any> {
    try {
      const repository = new ProblemsRepository();
      const response = await repository.findAll();
      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "GetAllProblemsUseCase.execute",
        message: error,
      });
    }
  }
}
