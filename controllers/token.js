const crypto = require("crypto");
const client = require("../db");

exports.checkTokenValidity = async function (token) {
  try {
    const result = await client.query(
      `SELECT final_time FROM public.token_list where "token" = '${token}'`
    );
    var tokenTime = parseInt(result.rows[0].final_time);
    var now = Date.now();

    if (tokenTime > now) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

exports.tokenGenerator = function () {
  var time = new Date();
  time.setTime(time.getTime() + 1800000);
  time.setTime(time.getTime() - time.getTimezoneOffset() * 60000);
  var token = crypto.randomBytes(48).toString("hex");

  var sql = `INSERT INTO token_list (final_time, "token") VALUES('${time.getTime()}', '${token}');`;
  client.query(sql);

  return token;
};
