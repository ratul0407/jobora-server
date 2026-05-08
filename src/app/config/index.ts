import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV as "development" | "production",
  port: Number(process.env.PORT) as number,
  database_url: process.env.DATABASE_URL as string,
  frontend_url: process.env.FRONTEND_URL as string,
  bcrypt_salt_round: Number(process.env.BCRYPT_SALT_ROUND) as number,
  express_session_secret: process.env.EXPRESS_SESSION_SECRET as string,
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET as string,
    refresh_secret: process.env.JWT_REFRESH_SECRET as string,
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as string,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,
  },
  smtp: {
    host: process.env.SMTP_HOST as string,
    port: Number(process.env.SMTP_PORT) as number,
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
    from: process.env.SMTP_FROM as string,
  },
  redis: {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT) as number,
    pass: process.env.REDIS_PASS as string,
    username: process.env.REDIS_USERNAME as string,
  },
};
