import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisConfig = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  maxRetriesPerRequest: null, // Required for BullMQ
};

const redisConnection = new Redis(redisConfig);

redisConnection.on("error", (err) => {
  console.error("Redis connection error:", err);
  if (err) {
    process.exit(1);
  }
});

redisConnection.on("connect", () => {
  console.log("Successfully connected to Redis");
});

export { redisConnection, redisConfig };
