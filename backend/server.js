const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const server = express();

const { connection } = require("./config/db");
const userRouter = require("./routes/userRoutes");
const customerRouter = require("./routes/customerRoutes");
const categoriesRouter = require('./routes/categoriesRoutes');
const subCategoriesRouter = require('./routes/subCategoriesRoutes');
const productsRouter = require('./routes/productsRoutes');


// !this is a comment

const db = connection();

require("dotenv").config();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(morgan("dev"));

server.use("/", userRouter);
server.use("/", customerRouter);

server.use('/categories', categoriesRouter);
server.use('/subcategories', subCategoriesRouter);
server.use('/products', productsRouter);

db.connectToMongo();

server.listen(5000, () => {
  console.log("listening on http://localhost:5000");
});
