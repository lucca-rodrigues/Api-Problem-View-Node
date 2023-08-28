import { Op } from "sequelize";
import NotificationViews from "../../model/NotificationViews";

const { NotificationView } = require("../../../../sequelize/app/models");
const { logger } = require("../../../../configs/fluentD/sendLogFluentd");

class NotificationViewRepository {
  async find() {
    try {
      return await NotificationView.findOne();
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "NotificationViewRepository.find",
        message: error,
      });
    }
  }

  async findByLogSubs(notificationFind: string) {
    try {
      return await NotificationView.findOne({
        where: {
          log: {
            [Op .iLike]: `%${notificationFind}%`, 
          },
        },
      });
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "NotificationViewRepository.findByLog",
        message: error,
      });
    }
  }

  async create(data: NotificationViews) {
    try {
      return await NotificationView.create(data);
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "NotificationViewRepository.create",
        message: error,
      });
    }
  }

  async update(data: NotificationViews, id: number) {
    try {
      return await NotificationView.update(data, {
        where: { id: id },
        returning: true,
      });
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "NotificationViewRepository.update",
        message: error,
      });
    }
  }
}

export default NotificationViewRepository;
