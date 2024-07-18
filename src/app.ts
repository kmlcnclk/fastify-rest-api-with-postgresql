import Fastify from "fastify";
import MainRouter from "./routes/main.router";
import dotenv from "dotenv";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  },
});

async function main() {
  await dotenv.config({ path: "" });

  const mainRouter = new MainRouter();

  await fastify.setErrorHandler((error, request, reply) => {
    reply.send(error);
  });

  await fastify.register(mainRouter.routes, { prefix: "/api" });

  await fastify.listen({
    port: (process.env.PORT as string)
      ? parseInt(process.env.PORT as string)
      : 3000,
    host: (process.env.HOST as string) || "0.0.0.0",
  });
}

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();

    process.exit(0);
  });
});

main();
