const { View, Problem, User } = require("../../../../sequelize/app/models");
const { isToday } = require("date-fns");
const { Op, fn, col, literal, QueryTypes } = require('sequelize');
const sequelize = require("../../../../sequelize/config/db")
import { Views } from "../../model/Views";

const { logger } = require("../../../../configs/fluentD/sendLogFluentd");

class ViewsRepository {
  async find(data: Views) {
    try {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );

      const response = await View.findAll({
        where: {
          UserId: data.UserId,
          ProblemId: data.ProblemId,
          createdAt: {
            [Op.between]: [startOfDay, endOfDay],
          },
        },
      });

      const exists = response.some((item: any) =>
        isToday(new Date(item.createdAt))
      );
      return exists;
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "ViewsRepository.find",
        message: error,
      });
    }
  }

  async findAll() {
    try {
      return await View.findAll();
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "ViewsRepository.findAll",
        message: error,
      });
    }
  }

  async findAllByLastDefaultTime(lastTime: number): Promise<any> {
    try {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getTime() - lastTime * 60 * 1000);

      const response = await View.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, currentDate],
          },
        },
        include: [
          { model: Problem, as: "problems" },
          { model: User, as: "users" },
        ],
      });

      return response;
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "ViewsRepository.findAllByLastDefaultTime",
        message: error,
      });
    }
  }

  async findAllViewsByLastDays(problemId: string) {
    try {
      const currentDate = new Date();
      const startDate = new Date(
        currentDate.getTime() - 5 * 24 * 60 * 60 * 1000
      );
      const response = await View.findAll({
        where: {
          ProblemId: problemId,
          createdAt: {
            [Op.between]: [startDate, currentDate],
          },
        },
      });

      return response;
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "ViewsRepository.findAllViewsByLastDays",
        message: error,
      });
    }
  }


  async findAllViewsLastDays() {
    try {
      // Query:
      // 1. Obtendo data da ultima visualização de cada desafio (ProblemId && LatestCreatedAt)
      // 2. Verificando se ultima visualização no desafio faz mais de 5 dias
      const query = `
        WITH LatestView AS (
            SELECT
                "ProblemId",
                MAX("createdAt") AS "LatestCreatedAt"
            FROM
                public."Views"
            GROUP BY
                "ProblemId"
        )
        SELECT
            p."id" as "problemId",
            p."ownerId",
            p."description",
            p."createdAt",
            p."updatedAt",
            lv."LatestCreatedAt",
            v."id" as "viewId"
        FROM
            LatestView lv
            INNER JOIN public."Problems" p ON lv."ProblemId" = p."id"
            INNER JOIN public."Views" v ON lv."ProblemId" = v."ProblemId" AND lv."LatestCreatedAt" = v."createdAt"
        WHERE
            lv."LatestCreatedAt" < NOW() - INTERVAL '5 days';
      `;

      const response = await sequelize.query(query, 
        { type: QueryTypes.SELECT }
      );

      return response;
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "ViewsRepository.findAllViewsLastDays",
        message: error,
      });
    }
  }


  async create(data: Views) {
    try {
      return await View.create(data);
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "ViewsRepository.create",
        message: error,
      });
    }
  }
}

export default ViewsRepository;
