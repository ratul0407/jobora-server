import { Server } from "http";
import config from "./app/config/index";
import app from "./app";
export function bootstrap() {
  let server: Server;
  try {
    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
    const exitHandler = () => {
      if (server) {
        server.close(() => {
          console.log(`Server closed gracefully.`);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (error) => {
      console.log(
        "Unhandled Rejection is detected, we are closing our server...",
      );
      if (server) {
        server.close(() => {
          console.log(error);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("Error during server startup", error);
    process.exit(1);
  }
}

(async () => {
  await bootstrap();
})();
