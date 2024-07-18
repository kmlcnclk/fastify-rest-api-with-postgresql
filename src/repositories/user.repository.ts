import { PostgreSQLDao } from "../dao/postgres.dao";
import PostgresDB from "../db/postgres.db";
import { CreateUserType, IUser } from "../types/user.type";

class UserRepository {
  userDao: PostgreSQLDao<IUser>;
  postgresDB: PostgresDB;

  constructor() {
    this.postgresDB = new PostgresDB();

    this.userDao = new PostgreSQLDao<IUser>(
      this.postgresDB.pool,
      process.env.USER_TABLE_NAME as string
    );

    this.createUser = this.createUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.findOne = this.findOne.bind(this);
  }

  public async getUsers(): Promise<IUser[]> {
    const pool = await this.postgresDB.connect();
    const users = await this.userDao.findAll();

    await pool.release();

    return users;
  }

  public async getUserById(id: string): Promise<IUser | null> {
    const pool = await this.postgresDB.connect();

    const user = await this.userDao.findById(id);
    await pool.release();

    return user;
  }

  public async createUser({
    name,
    email,
    password,
  }: CreateUserType): Promise<IUser> {
    const pool = await this.postgresDB.connect();

    const user = await this.userDao.create({ name, email, password });
    await pool.release();

    return user;
  }

  public async updateUser(
    id: string,
    data: CreateUserType
  ): Promise<IUser | null> {
    const pool = await this.postgresDB.connect();
    const user = await this.userDao.update(id, data);

    await pool.release();

    return user;
  }

  public async deleteUser(id: string): Promise<void> {
    const pool = await this.postgresDB.connect();
    await this.userDao.delete(id);

    await pool.release();
  }

  public async findOne(query: string): Promise<IUser | null> {
    const pool = await this.postgresDB.connect();
    const user = await this.userDao.findOne(query);
    await pool.release();

    return user;
  }
}

export default UserRepository;
