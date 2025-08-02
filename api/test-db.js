import { sequelize } from "../lib/db";

export default function handler(req, res) {
  res.status(200).json({
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS ? "****" : null,
    DB_NAME: process.env.DB_NAME,
  });
}

/* import { sequelize } from '../lib/db';

export default async function handler(req, res) {
  try {
    await sequelize.authenticate();
    res.status(200).json({ msg: "✅ Conexión con la base de datos exitosa" });
  } catch (error) {
    console.error("Error de conexión a la DB:", error);
    res.status(500).json({
      msg: "❌ Error al conectar a la base de datos",
      error: error.message,
      stack: error.stack,
    });
  }
} */
