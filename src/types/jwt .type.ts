export interface IJwt {
  id?: string;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateJwtType = {
  token: string;
};
