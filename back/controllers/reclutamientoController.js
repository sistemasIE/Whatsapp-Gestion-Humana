const db = require("../db");

module.exports = {
  getAll: async (req, res) => {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM Reclutamiento WHERE revisado = false"
      );
      res.json({ status: 200, message: "Consulta exitosa", data: rows });
    } catch (error) {
      console.error("Error al consultar reclutamiento:", error);
      res.status(500).json({ status: 500, message: "Error al consultar" });
    }
  },

  upsert: async (req, res) => {
    const { chatId, nombre, telefono, ciudad, revisado } = req.body;
    if (!chatId)
      return res.status(400).json({ status: 400, message: "Falta chatId" });

    try {
      await db.execute(
        `INSERT INTO Reclutamiento (chatId, nombre, telefono, ciudad, revisado)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
           nombre = IFNULL(VALUES(nombre), nombre),
           telefono = IFNULL(VALUES(telefono), telefono),
           ciudad = IFNULL(VALUES(ciudad), ciudad),
           revisado = IFNULL(VALUES(revisado), revisado)`,
        [
          chatId,
          nombre ?? null,
          telefono ?? null,
          ciudad ?? null,
          revisado ?? false,
        ]
      );

      res.json({ status: 200, message: "Registro creado/actualizado" });
    } catch (error) {
      console.error("Error en upsert reclutamiento:", error);
      res
        .status(500)
        .json({ status: 500, message: "Error al insertar/actualizar" });
    }
  },

  remove: async (req, res) => {
    const { id } = req.params;

    try {
      const [result] = await db.execute(
        "DELETE FROM Reclutamiento WHERE idReclutamiento = ?",
        [id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ status: 404, message: "No encontrado" });
      }
      res.json({ status: 200, message: "Reclutamiento eliminado" });
    } catch (error) {
      console.error("Error al eliminar reclutamiento:", error);
      res.status(500).json({ status: 500, message: "Error al eliminar" });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { revisado } = req.body;

    try {
      const [result] = await db.execute(
        "UPDATE Reclutamiento SET revisado = ? WHERE idReclutamiento = ?",
        [revisado, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ status: 404, message: "No encontrado" });
      }
      res.json({ status: 200, message: "Reclutamiento actualizado" });
    } catch (error) {
      console.error("Error al actualizar reclutamiento:", error);
      res.status(500).json({ status: 500, message: "Error al actualizar" });
    }
  },
};
