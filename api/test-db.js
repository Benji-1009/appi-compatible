import { sequelize } from "../lib/db";

export default async function handler(req, res) {
  try {
    await sequelize.authenticate();
    res.status(200).send("✅ Conexión con la base de datos exitosa");
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al conectar", error: error.message });
  }
}
