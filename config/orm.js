// Import MySQL connection
const connection = require('../config/connection.js');

// Helper function for SQL syntax
printQuestionMarks = (num) => {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push('?');
    }
    return arr.toString();
}

// Helper function to convert objects key/value pairs to SQL syntax
objToSql = (ob) => {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            arr.push(key + '=' + value);
        }
    }
    return arr.toString();
}
// Objects for all our SQL statement functions
const orm = {
    selectAll: (tableInput, cb) => {
        const queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, (err, results) => {
            if (err) {
                throw err;
            }
            cb(results);
        });
    },
}


module.exports = orm;
