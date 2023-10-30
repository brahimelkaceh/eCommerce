const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const server = express();

const { connection } = require("./config/db");
const userRouter = require("./routes/userRoutes");
const customerRouter = require("./routes/customerRoutes");
const categoryRouter = require("./routes/categoriesRoutes");
const subcategoriesRouter = require("./routes/subCategoriesRoutes");

const AppError  = require("./helpers/appError")
const globalErrorHandler = require("./controllers/errorController")
// !this is a comment

const db = connection();

require("dotenv").config();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(morgan("dev"));

server.use("/", userRouter);
server.use("/", customerRouter);
server.use("/", categoryRouter);
server.use("/", subcategoriesRouter);

server.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

server.use(globalErrorHandler);

db.connectToMongo();

server.listen(5000, () => {
  console.log("listening on http://localhost:5000");
});
