import "reflect-metadata";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import colors from "colors";
import { logger } from "./src/middlewares/logger";
import { getDBConnection } from "./src/dbconfig/db";
// all routes
import { setupRoutes } from "./src/routes/routes";
const app = express();

// access publice folder for image
// Connect to database
if (process.env.NODE_ENV !== "test") {
  getDBConnection();
}
// middleware
app.use(cookieParser()); // cookie parser when we needed the cookies value then we simply get and set
app.use(express.json()); // you ensure that your express application can handle json data sent in the request body automatically
app.use(express.urlencoded({ extended: true })); // it parses incoming request with url-encoded payloads and is based on a body parser.
app.use(cors()); // cros for different http method enable

// logger assign
app.use(logger);

//main route
setupRoutes(app);
// error Handler
//root route
app.get("/", (req, res) => {
  res.send("Welcome to nodejs server!");
});

//not found route
app.get("*", (req, res) => {
  res.send("Not found route, Please right route hite");
});

const PORT = 3900;

const server = app.listen(PORT, () => {
  console.log(colors.magenta(`Server running port is ${PORT}`));
});

//handle and unhandle promise rejections
process.on("unhandledRejection", (err: any, _message) => {
  console.log(colors.red(`Error ${err.message}`));
  // close server & process exit
  server.close(() => process.exit(1));
});
