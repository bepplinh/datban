import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

const orderQueue = new Queue("orderQueue", {
  connection: redisConnection,
});

export { orderQueue };
