const mongoose = require("mongoose");
const { color } = require("./config");

const connectDB = (url) => {
  // mongoose.connection.on("connected", () => {
  //   console.info(color.green, "Connected to MongoDB ✓");
  // });
  //
  // mongoose.connection.on("reconnected", () => {
  //   console.info("MongoDB reconnected!");
  // });
  //
  // mongoose.connection.on("error", (error) => {
  //   console.error(color.red, `Error in MongoDb connection: ${error}`);
  //   mongoose.disconnect();
  // });
  // mongoose.connection.on("disconnected", () => {
  //   console.error(
  //     color.red,
  //     `MongoDB disconnected! Reconnecting in ${2000 / 1000}s...`,
  //   );
  //   setTimeout(() => connectToMongo(), 2000);
  // });
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
