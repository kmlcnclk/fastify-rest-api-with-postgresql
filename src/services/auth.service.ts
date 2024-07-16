import { FastifyReply } from "fastify";
import UserService from "./user.service";
import CustomError from "../helpers/CustomError";
import AuthDto from "../dto/auth.dto";

class AuthService {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async signIn(reply: FastifyReply, userDto: AuthDto) {
    const user = await this.userService.findOne(`email = '${userDto.email}'`);

    if (!user) throw new CustomError("User not found", 404);

    if (user.password !== userDto.password)
      throw new CustomError("Invalid credentials", 401);

    const token = reply.jwtSign({ id: user.id, email: user.email });

    return token;
  }
}

export default AuthService;
