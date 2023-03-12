const crypto = require("crypto");
const connection = require("../db");

exports.checkTokenValidity = async function (token) {
  try {
    connection.query(
      `SELECT final_time FROM token_list where "token" = '${token}'`,
      (err, result, fields) => {
        if (err) {
          console.error("query error", err.stack);
          return false;
        } else {
          console.log( `SELECT final_time FROM token_list where "token" = '${token}'`,)
          var tokenTime = parseInt(result.final_time);
          var now = Date.now();

          if (tokenTime > now) {
            return true;
          }
          return false;
        }
      }
    );
  } catch (error) {
    return false;
  }
};

exports.tokenGenerator = function () {
  // return "example token generator"
  var time = new Date();
  time.setTime(time.getTime() + 1800000);
  time.setTime(time.getTime() - time.getTimezoneOffset() * 60000);
  var token = crypto.randomBytes(48).toString("hex");

  var sql = `INSERT INTO token_list (final_time, token) VALUES ('${time.getTime()}', '${token}')`;
  console.log(sql);

  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.error("query error", err.stack);
    }
  });
  return token;
};
