import express, { Request, Response, type Application } from "express";
import cors from "cors";
import config from "./app/config/index";
import cookieParser from "cookie-parser";
import router from "./app/routers";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFouond";
const app: Application = express();

app.use(
  cors({
    origin: [config.frontend_url],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Jobora Server is running",
    environment: config.node_env,
    uptime: process.uptime().toFixed(2) + "seconds",
    timeStamp: new Date().toISOString(),
  });
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
