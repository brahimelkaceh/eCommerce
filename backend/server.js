const express = require("express");
const server = express();

const { connection } = require("./config/db");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoriesRoutes")
const subCategoriesRouter=require("./routes/subCategoriesRoutes")
const productsRouter=require("./routes/productsRoutes")
// !this is a comment

const db = connection();

require("dotenv").config();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/", userRouter);
server.use("/" , categoryRouter)
server.use("/",subCategoriesRouter)
server.use("/",productsRouter)
db.connectToMongo();

server.listen(5000, () => {
  console.log("listening on 5000");
});
