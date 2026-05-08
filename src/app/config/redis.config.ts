import Redis from "ioredis";
import config from "./index";

export const redisConnection = {
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.pass,
  username: config.redis.username,
  maxRetriesPerRequest: null,
};

export const redisClient = new Redis(redisConnection);

redisClient.on("error", (err) => {
  console.log("Redis Client Error", err);
});
redisClient.on("connect", () => {
  console.log("Redis Client Connected from redis.config.ts");
});
