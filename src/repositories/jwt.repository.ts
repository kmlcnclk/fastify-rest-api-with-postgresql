import { PostgreSQLDao } from "../dao/postgres.dao";
import PostgresDB from "../db/postgres.db";
import { CreateJwtType, IJwt } from "../types/jwt .type";

class JwtRepository {
  jwtDao: PostgreSQLDao<IJwt>;
  postgresDB: PostgresDB;

  constructor() {
    this.postgresDB = new PostgresDB();

    this.jwtDao = new PostgreSQLDao<IJwt>(
      this.postgresDB.pool,
      process.env.JWT_TABLE_NAME as string
    );

    this.createJwt = this.createJwt.bind(this);
    this.getJwts = this.getJwts.bind(this);
  }

  public async getJwts(): Promise<IJwt[]> {
    const pool = await this.postgresDB.connect();
    const jwts = await this.jwtDao.findAll();
    await pool.release();

    return jwts;
  }

  public async createJwt({ token }: CreateJwtType): Promise<IJwt> {
    const pool = await this.postgresDB.connect();
    const jwt = await this.jwtDao.create({ token });
    await pool.release();

    return jwt;
  }
}

export default JwtRepository;
