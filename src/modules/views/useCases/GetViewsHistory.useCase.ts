import ProblemsService from "../../problems/service/Problems.service";
import ViewsRepository from "../../views/repository/sequelize/ViewsRepository";
import NotificationViewsService from "../../notificationViews/service/NotificationViews.service";
import UsersService from "../../users/service/Users.service";
import { logger } from "../../../configs/fluentD/sendLogFluentd";

export class GetViewsHistoryUseCase {
  async execute(): Promise<any> {
    const repository = new ViewsRepository();
    const problemsService = new ProblemsService();
    const usersService = new UsersService();
    const notificationViewService = new NotificationViewsService();

    try {
      // Desafios com mais de 5 dias sem nova visualização
      let challengesWhithoutView = await repository.findAllViewsLastDays();

      if(challengesWhithoutView.length > 0) {
        challengesWhithoutView = await Promise.all( challengesWhithoutView.map(async (problem: any) => {

          let shouldNotify = false;
          // Última notificação exibida de não visualizado
          let lastNotificationThisProblem = await notificationViewService.getNotificationViewBySubLog(`NotView:${problem['problemId']}`)
          
          // Se ja notificado, verifica se passaram 5 dias(para notificar novamente), senão cria uma nova
          if(lastNotificationThisProblem && lastNotificationThisProblem['dataValues']) {
            let whenWasNotified = new Date(lastNotificationThisProblem['dataValues']['updatedAt']);
            let currentDate = new Date();
            const daysDifference = (currentDate.getTime() - whenWasNotified.getTime()) / (1000 * 60 * 60 * 24);

            if (daysDifference > 5) {
              // Notificar novamente, se passaram 5 dias e não teve visualizações ou notificacao
              shouldNotify = true;
              await notificationViewService.updateNotificationView(lastNotificationThisProblem['dataValues'], lastNotificationThisProblem['dataValues']['id'])
            }
          } else { // Criando nova notificação
            await notificationViewService.createNotificationView({
              lastNotificationId: problem['viewId'],
              lastNotificationTime: problem['LatestCreatedAt'],
              success: true,
              log: `NotView:${problem['problemId']}`
            });
            shouldNotify = true;
          }

          // Se necessario notificar, ou notificar novamente, é retornado o objeto
          if(shouldNotify) {
            const userOwner = await usersService.getUser({
              id: problem?.ownerId,
              userName: "",
              avatarUrl: "",
              email: "",
            });
            return {
              problemId: problem?.problemId,
              description: problem?.description,
              owner: userOwner
            };
          } else {
            return null;
          }
        }));
      };

      return challengesWhithoutView.filter((value: any) => value !== null);
    } catch (error) {
      logger.emit({
        tag: "ERROR",
        funcName: "GetViewsHistoryUseCase.execute",
        message: error,
      });
    }
  }
}
