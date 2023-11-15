import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const config = {
  host: "85.209.49.177",
  user: "main",
  password: process.env.DB_PW,
  database: "to_praktikum",
};

async function query(sql, params) {
  const connection = await mysql.createConnection(config);
  const [results] = await connection.execute(sql, params);

  return results;
}

export default {
  query,
};
