import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const config = {
  host: "85.209.49.177",
  user: "toprak",
  //password: process.env.DB_PW,
  password: "7BfPKAmLaSKHeRnY76lF",
  database: "to_praktikum",
};

const pool = mysql.createPool({
  host: "85.209.49.177",
  user: "toprak",
  //password: process.env.DB_PW,
  password: "7BfPKAmLaSKHeRnY76lF",
  database: "to_praktikum",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

async function query(sql, params) {
  //const connection = await mysql.createConnection(config);
  const [results] = await pool.execute(sql, params);

  return results;
}

export default {
  query,
};
