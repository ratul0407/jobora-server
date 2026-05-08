import { Job, Worker } from "bullmq";
import { EMAIL_QUEUE_NAME, IEmailJobData } from "../queues/sendEmail.queue";
import { sendMail } from "../utils/sendEmail";
import { redisConnection } from "../config/redis.config";

export const processEmailJob = async (job: Job<IEmailJobData>) => {
  const { to, subject, templateName, templateData, attachments } = job.data;
  await sendMail({
    to,
    subject,
    templateName,
    templateData,
    attachments,
  });
};

export const emailWorker = new Worker<IEmailJobData>(
  EMAIL_QUEUE_NAME,
  processEmailJob,
  {
    connection: redisConnection,
    concurrency: 5,
  },
);

emailWorker.on("completed", (job) => {
  console.log(
    `✅ Email sent successfully | Job ID: ${job.id} | To: ${job.data.to}`,
  );
});

emailWorker.on("failed", (job, err) => {
  console.error(
    `❌ Email job failed | Job ID: ${job?.id} | To: ${job?.data.to}`,
  );
  console.error(`   Reason: ${err.message}`);

  // Log when all retries are exhausted
  if (job && job.attemptsMade >= (job.opts.attempts ?? 1)) {
    console.error(
      `🚨 All retries exhausted for job ${job.id}. Manual intervention needed.`,
    );
  }
});
emailWorker.on("error", (err) => {
  console.error("Email worker error:", err);
});

// Graceful shutdown — important for production
const gracefulShutdown = async (signal: string) => {
  console.log(`${signal} received. Closing email worker...`);
  await emailWorker.close();
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
