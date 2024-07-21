import UserRepository from "../repositories/user.repository";
import UserDto from "../dto/user.dto";
import { IUser } from "../types/user.type";
import CustomError from "../helpers/CustomError";
import RabbitMQService from "./rabbitmq.service";

class UserService {
  private userRepository: UserRepository;
  private rabbitMQService: RabbitMQService;

  constructor() {
    this.userRepository = new UserRepository();
    this.rabbitMQService = new RabbitMQService("amqp://localhost:5672");
  }

  public getUsers = (): Promise<IUser[]> => {
    return this.userRepository.getUsers();
  };

  public getUserById = async (id: string): Promise<IUser> => {
    const user = await this.userRepository.getUserById(id);

    if (!user) throw new CustomError("User not found", 404);

    return user;
  };

  public createUser = async (data: UserDto): Promise<IUser> => {
    const user = await this.userRepository.createUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    await this.rabbitMQService.connect();
    await this.rabbitMQService.createQueue("user_create_queue");
    await this.rabbitMQService.sendMessage("user_create_queue", data.email);
    await this.rabbitMQService.close();

    return user;
  };

  public updateUser = (id: string, data: UserDto): Promise<IUser | null> => {
    return this.userRepository.updateUser(id, {
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  public deleteUser = async (id: string): Promise<void> => {
    await this.userRepository.deleteUser(id);
  };

  public findOne = (query: string): Promise<IUser | null> => {
    return this.userRepository.findOne(query);
  };
}

export default UserService;
