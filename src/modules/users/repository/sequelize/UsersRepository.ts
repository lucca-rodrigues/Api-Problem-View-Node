import Users from "../../model/Users";

const { User } = require("../../../../sequelize/app/models");
const { logger } = require("../../../../configs/fluentD/sendLogFluentd");

class UsersRepository {
  async find(data: Users) {
    try {
      return await User.findOne({
        where: {
          id: data.id,
        },
      });
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "UsersRepository.find",
        message: error,
      });
    }
  }

  async create(data: Users) {
    try {
      return await User.create(data);
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "UsersRepository.create",
        message: error,
      });
    }
  }
}

export default UsersRepository;
