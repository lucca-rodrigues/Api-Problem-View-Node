// import UsersRepository from "../../users/repository/sequelize/UsersRepository";
// import User from "../../users/model/Users";
import UsersRepository from "../repository/sequelize/UsersRepository";
import User from "../model/Users";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class GetUserUseCase {
  public async execute(user: User): Promise<any> {
    try {
      const repository = new UsersRepository();
      const response = await repository.find(user);

      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "GetUserUseCase.execute",
        message: error,
      });
    }
  }
}
