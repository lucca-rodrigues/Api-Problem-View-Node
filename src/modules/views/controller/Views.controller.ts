// import ViewsService from "../../views/service/Views.service";

import ViewsService from "../service/Views.service";
import { Request, Response } from "express";

export default class ViewsController {
  public async index(request: Request, response: Response) {
    const service = new ViewsService();
    const responseData = await service.getViews();

    response.status(200).json(responseData);
  }

  public async history(request: Request, response: Response) {
    const service = new ViewsService();
    const responseData = await service.getHistory();

    response.status(200).json(responseData);
  }

  public async create(request: Request, response: Response): Promise<any> {
    const data = request.body;

    const service = new ViewsService();
    const responseData = await service.createView(data);

    response.status(200).json(responseData);
  }
}
