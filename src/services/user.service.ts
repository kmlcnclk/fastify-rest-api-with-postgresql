import UserRepository from "../repositories/user.repository";
import UserDto from "../dto/user.dto";
import { IUser } from "../types/user.type";
import CustomError from "../helpers/CustomError";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public getUsers = (): Promise<IUser[]> => {
    return this.userRepository.getUsers();
  };

  public getUserById = async (id: string): Promise<IUser> => {
    const user = await this.userRepository.getUserById(id);

    if (!user) throw new CustomError("User not found", 404);

    return user;
  };

  public createUser = (data: UserDto): Promise<IUser> => {
    return this.userRepository.createUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
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
