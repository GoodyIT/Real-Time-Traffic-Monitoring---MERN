import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
    user: 'root',
    // password: 'loveonsand09',
    password: '',
    database: 'traffic',
    multipleStatements: true,
});

connection.connect();

export default connection;
