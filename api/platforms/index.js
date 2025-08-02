import { initModels } from "../../models/init-models";
import { sequelize } from "../../lib/db.js";

const { Platforms } = initModels(sequelize);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const platforms = await Platforms.findAll();
    return res.status(200).json(platforms);
  } else if (req.method === "POST") {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ msg: "El campo 'name' es requerido" });

    const existing = await Platforms.findOne({ where: { name } });
    if (existing)
      return res
        .status(400)
        .json({ msg: "La plataforma ya se encuentra registrada" });

    const platform = await Platforms.create({ name });
    return res.status(201).json(platform);
  } else {
    res.status(405).json({ msg: "Método no permitido" });
  }
}
