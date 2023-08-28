import {
  CreateProblemUseCase,
  GetProblemUseCase,
  GetProblemByOwnerUseCase,
  GetAllProblemsUseCase,
} from "../../problems/useCases";
import Problems from "../../problems/model/Problems";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export default class ProblemsService {
  public async find(problemId: string, ownerId: string): Promise<any> {
    try {
      const useCase = new GetProblemByOwnerUseCase();
      const response = await useCase.execute(problemId, ownerId);
      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "ProblemsService.find",
        message: error,
      });
    }
  }

  public async findAll(): Promise<any> {
    try {
      const useCase = new GetAllProblemsUseCase();
      const response = await useCase.execute();
      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "ProblemsService.findAll",
        message: error,
      });
    }
  }

  public async getProblem(data: Problems): Promise<any> {
    try {
      const useCase = new GetProblemUseCase();
      const response = await useCase.execute(data);
      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "ProblemsService.getProblem",
        message: error,
      });
    }
  }

  public async getProblemByOwner(
    problemId: string,
    userId: string
  ): Promise<any> {
    try {
      const useCase = new GetProblemByOwnerUseCase();
      const response = await useCase.execute(problemId, userId);
      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "ProblemsService.getProblemByOwner",
        message: error,
      });
    }
  }

  public async createProblem(data: Problems): Promise<any> {
    try {
      const useCase = new CreateProblemUseCase();

      const problemAlreadyExists = await this.getProblem(data);

      if (!problemAlreadyExists) {
        logger.emit({
          tag: "INFO",
          funcName: "UsersService.createUser",
          message: "Problem not found, creating new problem",
        });
        const response = await useCase.execute(data);
        return response;
      }
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "ProblemsService.createProblem",
        message: error,
      });
    }
  }
}
