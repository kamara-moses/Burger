// Import MySQL connection.
const connection = require('../config/connection');

// Helper function for SQL syntax.
printQuestionMarks = (num) => {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push('?');
  }
  return arr.toString();
}

// Helper function to convert objects key/value pairs to SQL syntax.
objToSql = (ob) => {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = "' + value + '";
      }
      arr.push(key + '=' + value);
    }
  }
  return arr.toString();
}

// Objects for all our SQL statement functions.
const orm = {
  selectAll: (table, cb) => {
    var dbQuery = 'SELECT * FROM ' + table + ';';

    connection.query(dbQuery, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  insertOne: (table, cols, vals, cb) => {
    var dbQuery =
      'INSERT INTO ' +
      table +
      ' (' +
      cols.toString() +
      ') ' +
      'VALUES (' +
      printQuestionMarks(vals.length) +
      ') ';

    console.log(dbQuery);
    connection.query(dbQuery, vals, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  updateOne: (table, objColVals, condition, cb) => {
    var dbQuery =
      'UPDATE ' +
      table +
      ' SET ' +
      objToSql(objColVals) +
      ' WHERE ' +
      condition;

    console.log(dbQuery);

    connection.query(dbQuery, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  deleteOne: (table, condition, cb) => {
    var dbQuery = 'DELETE FROM ' + table + ' WHERE ' + condition;
    console.log(dbQuery);

    connection.query(dbQuery, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;