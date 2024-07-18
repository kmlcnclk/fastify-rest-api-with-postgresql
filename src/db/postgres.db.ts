import pg from "pg";

class PostgresDB {
  pool: pg.Pool;

  constructor() {
    this.pool = new pg.Pool({
      user: process.env.POSTGRES_USER as string,
      host: process.env.POSTGRES_HOST as string,
      database: process.env.POSTGRES_DATABASE as string,
      password: process.env.POSTGRES_PASSWORD as string,
      port: (process.env.POSTGRES_PORT as string)
        ? parseInt(process.env.POSTGRES_PORT as string)
        : 5431,
    });
  }

  public connect(): Promise<pg.PoolClient> {
    return this.pool.connect();
  }

  public async disconnect(): Promise<void> {
    await this.pool.end();
  }
}

export default PostgresDB;
