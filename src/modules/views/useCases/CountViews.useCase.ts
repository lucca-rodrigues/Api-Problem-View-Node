import NotificationConfigsService from "../../notificationConfigs/service/NotificationConfigs.service";
import UsersService from "../../users/service/Users.service";
import { GetViewsUseCase } from "../../views/useCases";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class CountViewsUseCase {
  async execute(): Promise<any> {
    const getViewsUseCase = new GetViewsUseCase();
    const notificationConfigsService = new NotificationConfigsService();
    const usersService = new UsersService();
    const defaultTimeToNotify = await notificationConfigsService.getConfigs();

    const problemsViews = await getViewsUseCase.execute(defaultTimeToNotify);

    try {
      const groupViews = async (problemsViews: any) => {
        const acc: any = {};
        for (const view of problemsViews) {
          const problemId = view.ProblemId;
          const userOwner = await usersService.getUser({
            id: view.problems.ownerId,
            userName: "",
            avatarUrl: "",
            email: "",
          });

          if (!acc[problemId]) {
            acc[problemId] = {
              problemId: problemId,
              idFirstViewer: view.users.id,
              firstViewer: view.users.userName,
              description: view.problems.description,
              views: 0,
              avatarUrl: view.users.avatarUrl,
              owner: userOwner,
            };
          }
          acc[problemId].views++;
        }
        return acc;
      };
      const groupedViews = await groupViews(problemsViews);

      const result = Object.values(groupedViews).map((problem: any) => {
        if (problem.views > 1) {
          problem.views -= 1;
        } else {
          problem.views = 0;
        }
        return problem;
      });

      return result;
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "CountViewsUseCase.execute",
        message: error,
      });
    }
  }
}
