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
};
