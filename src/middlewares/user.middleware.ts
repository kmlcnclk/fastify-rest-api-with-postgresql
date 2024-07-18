import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../services/user.service";

class UserMiddleware {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public validateUserId = async (
    request: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply
  ): Promise<void> => {
    const { id } = request.params;

    await this.userService.getUserById(id);
  };
}

export default UserMiddleware;
