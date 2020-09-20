const mysql = require('mysql');

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'KyMyAr091217$',
        database: 'burgers_db'
    });
};

//Make connection
connection.connect((err) => {
    if(err){
        console.log('error connecting:' + err.stack)
        return
    }
    console.log('connected as' + connection.threadId);
});

//Export connection for our ORM to use
module.exports = connection;