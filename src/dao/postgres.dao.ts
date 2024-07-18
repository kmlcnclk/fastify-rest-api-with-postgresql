import { BaseDao } from "./base.dao";
import { Pool } from "pg";

export class PostgreSQLDao<T> implements BaseDao<T> {
  private pool: Pool;
  private tableName: string;

  constructor(pool: Pool, tableName: string) {
    this.pool = pool;
    this.tableName = tableName;
  }

  public findAll = async (): Promise<T[]> => {
    const result = await this.pool.query(`SELECT * FROM ${this.tableName}`);
    return result.rows;
  };

  public findById = async (id: string): Promise<T | null> => {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  };

  public create = async (item: T): Promise<T> => {
    const keys = Object.keys(item as {}).join(", ");
    const values = Object.values(item as {});
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const result = await this.pool.query(
      `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders}) RETURNING *`,
      values
    );

    return result.rows[0];
  };

  public update = async (id: string, item: T): Promise<T | null> => {
    const updates = Object.keys(item as {})
      .map((key, i) => `${key} = $${i + 2}`)
      .join(", ");
    const values = Object.values(item as {});

    const result = await this.pool.query(
      `UPDATE ${this.tableName} SET ${updates} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );

    return result.rows[0] || null;
  };

  public delete = async (id: string): Promise<void> => {
    await this.pool.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
  };

  public findOne = async (query: any): Promise<T | null> => {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE ${query}`
    );

    return result.rows[0] || null;
  };
}
