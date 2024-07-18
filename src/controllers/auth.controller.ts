import { FastifyReply, FastifyRequest } from "fastify";
import AuthService from "../services/auth.service";
import AuthDto from "../dto/auth.dto";

class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public signIn = async (
    request: FastifyRequest<{
      Body: {
        email: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    const userDto: AuthDto = {
      email: request.body.email,
      password: request.body.password,
    };

    const token = await this.authService.signIn(reply, userDto);

    return reply.status(200).send({ token });
  };
}

export default AuthController;
