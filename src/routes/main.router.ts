import { FastifyInstance } from "fastify";
import UserRouter from "./user.router";

class MainRouter {
  userRouter: UserRouter;

  constructor() {
    this.userRouter = new UserRouter();

    this.routes = this.routes.bind(this);
  }

  public async routes(fastify: FastifyInstance) {
    fastify.register(this.userRouter.routes, { prefix: "/user" });
  }
}

export default MainRouter;
