import { FastifyInstance } from "fastify";
import UserController from "../controllers/user.controller";
import UserMiddleware from "../middlewares/user.middleware";

class UserRouter {
  userMiddleware: UserMiddleware;
  userController: UserController;

  constructor() {
    this.userMiddleware = new UserMiddleware();
    this.userController = new UserController();

    this.routes = this.routes.bind(this);
  }

  public addSchemas(fastify: FastifyInstance) {
    fastify.addSchema({
      $id: "createUserSchema",
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
    });
  }

  public async routes(fastify: FastifyInstance) {
    this.addSchemas(fastify);

    fastify.get("/", this.userController.getUsers);
    fastify.get(
      "/:id",
      {
        schema: {
          params: {
            type: "object",
            required: ["id"],
            properties: {
              id: { type: "string" },
            },
          },
        },
      },
      this.userController.getUserById
    );

    fastify.post(
      "/",
      {
        schema: {
          body: { $ref: "createUserSchema#" },
        },
      },
      this.userController.createUser
    );

    fastify.put(
      "/:id",
      {
        schema: {
          body: { $ref: "createUserSchema#" },
          params: {
            type: "object",
            required: ["id"],
            properties: {
              id: { type: "string" },
            },
          },
        },
        preHandler: [this.userMiddleware.validateUserId],
      },
      this.userController.updateUser
    );

    fastify.delete(
      "/:id",
      {
        schema: {
          params: {
            type: "object",
            properties: {
              id: { type: "string" },
            },
          },
        },
        preHandler: [this.userMiddleware.validateUserId],
      },
      this.userController.deleteUser
    );
  }
}

export default UserRouter;
