import pg from "pg";

class PostgresDB {
  pool: pg.Pool;

  constructor() {
    this.pool = new pg.Pool({
      user: "admin",
      host: "localhost",
      database: "asd",
      password: "admin",
      port: 5431,
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
