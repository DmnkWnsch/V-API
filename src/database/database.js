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

async function query(sql, params) {
  const connection = await mysql.createConnection(config);
  const [results] = await connection.execute(sql, params);

  return results;
}

export default {
  query,
};
