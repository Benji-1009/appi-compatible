export default function handler(req, res) {
  res.status(200).json({
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS ? "**** (oculto)" : null,
    DB_NAME: process.env.DB_NAME,
  });
}
