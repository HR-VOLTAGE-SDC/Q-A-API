const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool ({
  user: process.env.UserDB,
  password: process.env.Password,
  database: process.env.Database,
  host: process.env.Host,
  port: process.env.Port
})
// I would like to check whether it is connected
const db = pool.connect();

// db
// .then(db => console.log('Connected to PSQL'))
// .catch(err => console.log(err, 'Issue connecting to PSQL'))

module.exports = pool;
