const db = require("../db");

module.exports = {
  getAll: async (req, res) => {
    let query = "SELECT * FROM TipoDocumento";
    try {
      const [rows] = await db.execute(query);
      res.json({
        status: 200,
        message: "TipoDocumento obtenidos",
        data: rows,
      });
    } catch (error) {
      console.error("Error obteniendo TipoDocumento:", error);
      res.status(500).json({
        status: 500,
        message: "Error al obtener TipoDocumento",
      });
    }
  },
  create: async (req, res) => {
    const { nombreDocumento } = req.body;
    if (!nombreDocumento) {
      return res
        .status(400)
        .json({ status: 400, message: "Falta nombreDocumento" });
    }

    try {
      await db.execute(
        "INSERT INTO TipoDocumento (nombreDocumento) VALUES (?)",
        [nombreDocumento]
      );
      res.json({ status: 200, message: "TipoDocumento creado" });
    } catch (error) {
      console.error("Error creando TipoDocumento:", error);
      res
        .status(500)
        .json({ status: 500, message: "Error al crear TipoDocumento" });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await db.execute("DELETE FROM TipoDocumento WHERE idTipoDocumento = ?", [
        id,
      ]);
      res.json({
        status: 200,
        message: `TipoDocumento con ID ${id} eliminado`,
      });
    } catch (error) {
      console.error("Error eliminando TipoDocumento:", error);
      res
        .status(500)
        .json({ status: 500, message: "Error al eliminar TipoDocumento" });
    }
  },
};
