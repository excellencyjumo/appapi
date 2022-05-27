const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "db4free.net",
  user: "dummy_user",
  password: "Wc-4BKp!fe$md-T",
  database: "dummy_nit_db",
  port: "3306"
});

module.exports = connection;
