import NotificationConfigs from "../../model/NotificationConfigs";

const { NotificationConfig } = require("../../../../sequelize/app/models");
const { logger } = require("../../../../configs/fluentD/sendLogFluentd");

class NotificationConfigsRepository {
  async find() {
    try {
      return await NotificationConfig.findOne();
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "NotificationConfigsRepository.find",
        message: error,
      });
    }
  }

  async create(data: NotificationConfigs) {
    try {
      return await NotificationConfig.create(data);
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "NotificationConfigsRepository.create",
        message: error,
      });
    }
  }
}

export default NotificationConfigsRepository;
