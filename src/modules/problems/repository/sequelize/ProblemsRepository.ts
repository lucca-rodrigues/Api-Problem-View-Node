import Problems from "../../model/Problems";

const { Problem } = require("../../../../sequelize/app/models");
const { logger } = require("../../../../configs/fluentD/sendLogFluentd");

class ProblemsRepository {
  async findAll() {
    try {
      return await Problem.findAll();
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "ProblemsRepository.findAll",
        message: error,
      });
    }
  }

  async find(problem: Problems) {
    try {
      return await Problem.findOne({
        where: {
          id: problem.id,
        },
      });
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "ProblemsRepository.find",
        message: error,
      });
    }
  }

  async findByOwner(problemId: string, userId: string) {
    try {
      return await Problem.findOne({
        where: {
          id: problemId,
          ownerId: userId,
        },
      });
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "ProblemsRepository.findByOwner",
        message: error,
      });
    }
  }

  async create(data: Problems) {
    try {
      return await Problem.create(data);
    } catch (error) {
      console.log("error", error);
      logger.emit({
        tag: "ERROR",
        funcName: "ProblemsRepository.create",
        message: error,
      });
    }
  }
}

export default ProblemsRepository;
