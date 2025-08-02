
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/usuarios", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    const [rows] = await connection.execute("SELECT * FROM usuarios");
    res.status(200).json(rows);
    await connection.end();
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los usuarios", error: error.message });
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    // Aquí puedes agregar la lógica para insertar un usuario
    // Por ahora solo devuelve todos los usuarios
    const [rows] = await connection.execute("SELECT * FROM usuarios");
    res.status(200).json(rows);
    await connection.end();
  } catch (error) {
    res.status(500).json({ mensaje: "Error al procesar la solicitud", error: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});