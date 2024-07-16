import { FastifyInstance } from "fastify";
import UserRouter from "./user.router";
import AuthRouter from "./auth.router";

class MainRouter {
  userRouter: UserRouter;
  authRouter: AuthRouter;

  constructor() {
    this.userRouter = new UserRouter();
    this.authRouter = new AuthRouter();

    this.routes = this.routes.bind(this);
  }

  public async routes(fastify: FastifyInstance) {
    fastify.register(this.userRouter.routes, { prefix: "/user" });
    fastify.register(this.authRouter.routes, { prefix: "/auth" });
  }
}

export default MainRouter;
