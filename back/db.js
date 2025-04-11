const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "usr",
  password: "pass",
  database: "bot",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
