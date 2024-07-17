import { FastifyReply } from "fastify";
import UserService from "./user.service";
import CustomError from "../helpers/CustomError";
import AuthDto from "../dto/auth.dto";
import JwtService from "./jwt.service";

class AuthService {
  private userService: UserService;
  private jwtService: JwtService;

  constructor() {
    this.userService = new UserService();
    this.jwtService = new JwtService();

    this.signIn = this.signIn.bind(this);
  }

  public async signIn(reply: FastifyReply, userDto: AuthDto) {
    const user = await this.userService.findOne(`email = '${userDto.email}'`);

    if (!user) throw new CustomError("User not found", 404);

    if (user.password !== userDto.password)
      throw new CustomError("Invalid credentials", 401);

    const token = await reply.jwtSign({ id: user.id, email: user.email });

    await this.jwtService.createJwt({ token });

    return token;
  }
}

export default AuthService;
