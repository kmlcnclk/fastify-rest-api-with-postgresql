import RabbitMQService from "./services/rabbitmq.service";

export async function receive() {
  const rabbitMQ = new RabbitMQService("amqp://localhost:5672");

  await rabbitMQ.connect();
  await rabbitMQ.createQueue("user_create_queue");
  await rabbitMQ.consumeMessages("user_create_queue", (msg) => {
    // TODO: Implement the logic to sending an email to the user `Welcome to our platform!`

    console.log(`Received message: ${msg}`);
  });

  process.on("SIGINT", async () => {
    console.log("Received SIGINT. Closing RabbitMQ connection.");
    await rabbitMQ.close();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    console.log("Received SIGTERM. Closing RabbitMQ connection.");
    await rabbitMQ.close();
    process.exit(0);
  });
}

receive().catch(console.error);
