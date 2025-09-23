import prismaClient from "../../prisma";

interface UserRequest {
  user_id: string;
  name: string;
  address: string;
}

class UpdateUserService {
  async execute({ address, name, user_id }: UserRequest) {
    try {
      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExists) {
        throw new Error("User not exists!");
      }

      const userUpdated = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name: name,
          address: address,
        },
        select: {
          name: true,
          email: true,
          address: true,
        },
      });

      return userUpdated;
    } catch {
      throw new Error("Error updating user!");
    }
  }
}

export { UpdateUserService };
