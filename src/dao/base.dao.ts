export interface BaseDao<T> {
  findById(id: string): Promise<T | null>;
  findOne(query: any): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T | null>;
  delete(id: any): Promise<boolean | void>;
}
