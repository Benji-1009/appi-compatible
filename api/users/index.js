import { initModels } from "../../models/init-models";
import { sequelize } from "../../lib/db.js";

const { Users } = initModels(sequelize);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const users = await Users.findAll();
    return res.status(200).json(users);
  } else if (req.method === "POST") {
    const { name, email, platforms } = req.body;
    if (!name)
      return res.status(400).json({ msg: "El campo 'name' es requerido" });

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser)
      return res
        .status(400)
        .json({
          msg: "El correo ya se encuentra registrado, intenta con otro",
        });

    const user = await Users.create({
      name,
      email,
      platforms: Array.isArray(platforms) ? platforms.join(", ") : platforms,
    });
    return res.status(201).json(user);
  } else {
    res.status(405).json({ msg: "Método no permitido" });
  }
}
