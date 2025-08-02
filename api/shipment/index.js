import { initModels } from "../../models/init-models";
import { sequelize } from "../../lib/db.js";

const { Shipment } = initModels(sequelize);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const shipment = await Shipment.findAll();
    return res.status(200).json(shipment);
  } else if (req.method === "POST") {
    const { name } = req.body;
    const existing = await Shipment.findOne({ where: { name } });
    if (existing)
      return res
        .status(400)
        .json({ msg: "La paquetería ya se encuentra registrada" });

    const created = await Shipment.create({ name });
    return res.status(201).json(created);
  } else {
    res.status(405).json({ msg: "Método no permitido" });
  }
}
