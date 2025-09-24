import prismaClient from "../../prisma";

interface FinishRequest {
  schedule_id: string;
  user_id: string;
}

class FinishScheduleService {
  async execute({ schedule_id, user_id }: FinishRequest) {
    if (!schedule_id || !user_id) {
      throw new Error("Bad Request");
    }

    try {
      const belongsToUser = await prismaClient.service.findFirst({
        where: {
          id: schedule_id,
          user_id,
        },
      });

      if (!belongsToUser) {
        throw new Error("Not authorized");
      }

      await prismaClient.service.delete({
        where: {
          id: schedule_id,
        },
      });

      return { message: "finalizado com sucesso" };
    } catch {
      throw new Error("Error on finish schedule");
    }
  }
}

export { FinishScheduleService };
