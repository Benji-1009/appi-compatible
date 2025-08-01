
const app = express();
const cors = require("cors");
app.use(cors());

import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  const [rows] = await connection.execute("SELECT * FROM usuarios");
  res.status(200).json(rows);
}
export default async function handler(req, res) {
  if (req.method === "GET") {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
    });
    // Add your GET logic here if needed
  } else if (req.method === "POST") {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [rows] = await connection.execute("SELECT * FROM usuarios");
    res.json(rows);
    connection.end();
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}