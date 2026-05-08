import { Queue, QueueEvents } from "bullmq";
import { redisConnection } from "../config/redis.config";

export interface IEmailJobData {
  to: string;
  subject: string;
  templateName: string;
  templateData: Record<string, any>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

export const EMAIL_QUEUE_NAME = "email";
export const emailQueue = new Queue<IEmailJobData>(EMAIL_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: {
      age: 24 * 3600,
      count: 100,
    },
    removeOnFail: {
      age: 7 * 24 * 3600,
    },
  },
});

const emailQueueEvents = new QueueEvents(EMAIL_QUEUE_NAME, {
  connection: redisConnection,
});

emailQueueEvents.on("completed", ({ jobId }) => {
  console.log(`Job ${jobId} completed`);
});
emailQueueEvents.on("failed", ({ jobId }) => {
  console.log(`Job ${jobId} failed`);
});

export const addEmailJob = async (
  data: IEmailJobData,
  jobName = "sendEmail",
) => {
  const job = await emailQueue.add(jobName, data);
  console.log(`📨 Email job ${job.id} added to queue for ${data.to}`);
  return job;
};
