require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const { connection } = require("./config/db");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/ordersRoutes");
const customerRouter = require("./routes/customerRoutes");
const categoryRouter = require("./routes/categoriesRoutes");
const subcategoriesRouter = require("./routes/subCategoriesRoutes");
const productsRouter = require("./routes/productsRoutes");
const ordersRouter = require("./routes/ordersRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./helpers/AppError");
const server = express();
const db = connection();
const http = require("http");
const { initializeWebSocket } = require("./middlewares/websocket");

const websocketServer = http.createServer(server);
const wss = initializeWebSocket(websocketServer);

require("dotenv").config();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
server.use(morgan("dev"));

server.use("/", userRouter);
server.use("/", orderRouter);
server.use("/", customerRouter);
server.use("/", categoryRouter);
server.use("/", subcategoriesRouter);
server.use("/", productsRouter);
server.use("/", ordersRouter);
server.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

server.use(globalErrorHandler);

db.connectToMongo();

server.listen(5000, () => {
  console.log("listening on http://localhost:5000");
});
