const mysql = require('mysql');
const db = require('./db');

const connection = mysql.createConnection({
  host: db.host,
  user: db.username,
  password: db.password,
  database: db.database
});
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database: ' + error.stack);
    return;
  }
  console.log('Connected to MySQL database with threadId: ' + connection.threadId);
});

module.exports={connection}