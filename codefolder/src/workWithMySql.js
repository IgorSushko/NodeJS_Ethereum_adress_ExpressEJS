const mysql = require('mysql');

const settings = require('./settings');

const connection = mysql.createConnection({
  host: settings.DB_HOST,
  database: settings.DB_NAME,
  user: settings.DB_USER,
  password: settings.DB_PASS,
});

connection.connect((err) => {
  if (err) {
    console.error(`Error connecting: ${err.stack}`);
    return;
  }
  console.log(`Connected as id ${connection.threadId}`);
});
/**
 * @returns {string} results
 */
module.exports.readFromDb = () => {
  connection.query('SELECT * FROM tblLuhnResult1', (error, results) => {
    if (error) throw error;
    results.forEach((result) => {
      console.log(result);
    });
    // return is not propagated outside!
    return results;
  });
};
module.exports.readFromDbCorrect = () => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM tblLuhnResult1', (error, results) => {
    if (error) {
      reject(error);
    }
    resolve(results);
  });
});

/**
 * @param {int} Rcardnumber
 * @param {string} Rresult
 * @param {string} Rcomments
 * @returns {void}
 */
module.exports.writeToDb = (Rcardnumber, Rresult, Rcomments = '') => {
  const RtimeStamp = Date.now();
  connection.query('INSERT INTO tblLuhnResult1 (cardnumber, result,timeStamp,comments) VALUES (?,?,?,?)', [Rcardnumber, Rresult, RtimeStamp, Rcomments], (error) => {
    if (error) throw error;
    // only here will end
    // but without promise will not wait
  });
};

// connection.end();
