// import UsersRepository from "../../users/repository/sequelize/UsersRepository";
// import User from "../../users/model/Users";
import UsersRepository from "../repository/sequelize/UsersRepository";
import User from "../model/Users";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class CreateUserUseCase {
  public async execute(data: User): Promise<any> {
    try {
      const repository = new UsersRepository();
      const response = await repository.create(data);

      return response;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "CreateUserUseCase.execute",
        message: error,
      });
    }
  }
}
