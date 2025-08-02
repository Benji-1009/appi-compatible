import { initModels } from "../../models/init-models";
import { sequelize } from "../../lib/db.js";

const { Users } = initModels(sequelize);

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const id = req.query.id;
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    await user.update(req.body);
    return res.status(200).json(user);
  } else {
    res.status(405).json({ msg: "Método no permitido" });
  }
}
