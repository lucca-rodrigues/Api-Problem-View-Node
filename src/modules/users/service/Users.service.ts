import { CreateUserUseCase, GetUserUseCase } from "../useCases";
import User from "../model/Users";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export default class UsersService {
  public async getUser(user: User): Promise<any> {
    try {
      const useCase = new GetUserUseCase();
      const response = await useCase.execute(user);

      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "UsersService.getUser",
        message: error,
      });
    }
  }

  public async createUser(user: User): Promise<any> {
    try {
      const useCase = new CreateUserUseCase();

      const userAlreadyExists = await this.getUser(user);

      if (!userAlreadyExists) {
        logger.emit({
          tag: "INFO",
          funcName: "UsersService.createUser",
          message: "User not found, creating new user",
        });

        const response = await useCase.execute(user);
        return response;
      }
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "UsersService.createUser",
        message: error,
      });
    }
  }
}
