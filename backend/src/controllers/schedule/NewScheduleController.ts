import { Request, Response } from "express";
import { NewScheduleService } from "../../services/schedule/NewScheduleService";

class NewScheduleController {
  async handle(req: Request, res: Response) {
    const { haircut_id, customer } = req.body;
    const user_id = req.user_id;

    const newScheduleService = new NewScheduleService();

    const schedule = await newScheduleService.execute({
      haircut_id,
      customer,
      user_id,
    });

    return res.json(schedule);
  }
}

export { NewScheduleController };
