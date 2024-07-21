import amqp, { Channel, Connection } from "amqplib";
import CustomError from "../helpers/CustomError";

class RabbitMQService {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private readonly uri: string) {}

  async connect() {
    try {
      this.connection = await amqp.connect(this.uri);
      console.log(this.connection);
      this.channel = await this.connection.createChannel();
      console.log("Connected to RabbitMQ");
    } catch (error) {
      console.error("Failed to connect to RabbitMQ", error);
    }
  }

  async createQueue(queue: string) {
    if (!this.channel) throw new CustomError("Channel is not initialized", 500);

    await this.channel.assertQueue(queue, { durable: false });
    console.log(`Queue ${queue} is ready`);
  }

  async sendMessage(queue: string, message: string) {
    if (!this.channel) throw new CustomError("Channel is not initialized", 500);

    this.channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Sent message: ${message}`);
  }

  async consumeMessages(queue: string, onMessage: (msg: string) => void) {
    if (!this.channel) throw new CustomError("Channel is not initialized", 500);

    await this.channel.assertQueue(queue, { durable: false });
    console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        onMessage(msg.content.toString());
        this.channel?.ack(msg);
      }
    });
  }

  async close() {
    await this.channel?.close();
    await this.connection?.close();
    console.log("Closed RabbitMQ connection");
  }
}

export default RabbitMQService;
