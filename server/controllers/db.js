const sqlite3 = require('sqlite3').verbose()
const connection = new sqlite3.Database('./server/data/db.db')
module.exports = connection;




