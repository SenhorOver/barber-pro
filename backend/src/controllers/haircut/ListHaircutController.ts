import { Request, Response } from "express";
import { ListHaircutService } from "../../services/haircut/ListHaircutService";

class ListHaircutController {
  async handle(req: Request, res: Response) {
    const status = req.query.status as string;
    const user_id = req.user_id;

    const listHaircutService = new ListHaircutService();

    const haircuts = await listHaircutService.execute({ status, user_id });

    return res.json(haircuts);
  }
}

export { ListHaircutController };
