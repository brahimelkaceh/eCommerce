const express = require("express");
const server = express();

const { connection } = require("./config/db");
// !this is a comment

const db = connection();

require("dotenv").config();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/userRoutes");
server.use("/", userRouter);
const customerRouter = require("./routes/customerRoutes");
server.use("/", customerRouter);
db.connectToMongo();

server.listen(5000, () => {
  console.log("listening on 5000");
});
