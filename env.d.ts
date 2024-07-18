declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";

    HOST: string;
    PORT: string;

    JWT_TABLE_NAME: string;
    USER_TABLE_NAME: string;

    TOKEN_SECRET: string;

    POSTGRES_USER: string;
    POSTGRES_HOST: string;
    POSTGRES_DATABASE: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_PORT: string;
  }
}
