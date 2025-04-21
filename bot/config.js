const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  MYSQL_DB_HOST: process.env.MYSQL_DB_HOST,
  MYSQL_DB_USER: process.env.MYSQL_DB_USER,
  MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
  MYSQL_DB_NAME: process.env.MYSQL_DB_NAME,
  MYSQL_DB_PORT: process.env.MYSQL_DB_PORT,
};
