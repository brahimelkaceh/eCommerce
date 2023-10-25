require("dotenv").config();
module.exports = {
  server: {
    PORT: process.env.PORT || 5000,
  },
  database: {
    uri: process.env.MONGO_URI,
    options: {
      timestamps: true,
      versionKey: false,
      useNewUrlParser: true,
    },
  },
  color: {
    green: "\x1b[32m",
    red: "\x1b[31m",
  },
  notFoundTemplate: 404,
  jwtSecretKey: process.env.JWT_SECRET_KEY || "testsecret",
};
