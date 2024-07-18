import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserRouter from "./user.router";
import AuthRouter from "./auth.router";
import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";

class MainRouter {
  userRouter: UserRouter;
  authRouter: AuthRouter;

  constructor() {
    this.userRouter = new UserRouter();
    this.authRouter = new AuthRouter();

    this.routes = this.routes.bind(this);
    this.addJwtPlugin = this.addJwtPlugin.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
  }

  private async verifyToken(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  }

  private async addJwtPlugin(fastify: FastifyInstance) {
    await fastify.register(fastifyJwt, {
      secret: process.env.TOKEN_SECRET as string,
    });

    await fastify.decorate("authenticate", this.verifyToken);
  }

  public async routes(fastify: FastifyInstance) {
    fastify.register(fp(this.addJwtPlugin));

    fastify.register(this.userRouter.routes, { prefix: "/user" });
    fastify.register(this.authRouter.routes, { prefix: "/auth" });
  }
}

export default MainRouter;
