import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../services/user.service";
import UserDto from "../dto/user.dto";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (
    request: FastifyRequest<{
      Body: {
        name: string;
        email: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    const userDto: UserDto = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    };

    const newUser = await this.userService.createUser(userDto);

    return reply
      .code(201)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ message: "User successfully created", data: newUser });
  };

  public getUserById = async (
    request: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    const id = request.params.id;

    const user = await this.userService.getUserById(id);

    return reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ data: user });
  };

  public deleteUser = async (
    request: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    const id = request.params.id;

    await this.userService.deleteUser(id);

    return reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ message: "User successfully deleted" });
  };

  public getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await this.userService.getUsers();

    return reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ data: users });
  };

  public updateUser = async (
    request: FastifyRequest<{
      Params: {
        id: string;
      };
      Body: {
        name: string;
        email: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    const id = request.params.id;

    const userDto: UserDto = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    };

    const updatedUser = await this.userService.updateUser(id, userDto);

    return reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ message: "User successfully updated", data: updatedUser });
  };
}
export default UserController;
