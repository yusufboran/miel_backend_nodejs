const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  connectionLimit: 5,
});

let conn;
try {
  conn = pool.getConnection();
  const rows = conn.query("SELECT 1 as val");
  // rows: [ {val: 1}, meta: ... ]

  const res = conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
  // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
} finally {
  if (conn) conn.release(); //release to pool
}
