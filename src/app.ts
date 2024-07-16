import Fastify from "fastify";
import MainRouter from "./routes/main.router";

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
  const mainRouter = new MainRouter();
  await fastify.register(mainRouter.routes, { prefix: "/api" });

  await fastify.listen({
    port: 3000,
    host: "0.0.0.0",
  });
}

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();

    process.exit(0);
  });
});

main();
