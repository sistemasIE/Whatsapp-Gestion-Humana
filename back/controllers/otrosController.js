const db = require("../db");

module.exports = {
  getAll: async (req, res) => {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM Otros WHERE revisado = false"
      );
      res.json({ status: 200, message: "Consulta exitosa", data: rows });
    } catch (error) {
      console.error("Error al consultar:", error);
      res.status(500).json({ status: 500, message: "Error al consultar" });
    }
  },
  upsert: async (req, res) => {
    const { chatId = null, nombre = null, motivo = null } = req.body;
    const revisado = false;
    try {
      await db.execute(
        `INSERT INTO Otros (chatId, motivo, nombre, revisado) 
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE             
        chatId = IFNULL(VALUES(chatId), chatId),
        nombre = IFNULL(VALUES(nombre), nombre),
        motivo = IFNULL(VALUES(motivo), motivo),
        revisado = IFNULL(VALUES(revisado), revisado)`,
        [chatId, motivo, nombre, revisado]
      );
      res.json({ status: 200, message: "Registro creado/actualizado" });
    } catch (error) {
      console.error("Error insertando:", error);
      res.status(500).json({ status: 500, message: "Error al insertar" });
    }
  },
  remove: async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ status: 400, message: "Falta el ID" });
    try {
      await db.execute("DELETE FROM Otros WHERE idOtros = ?", [id]);
      res.json({
        status: 200,
        message: `Registro de OTROS con ID ${id} eliminado`,
      });
    } catch (error) {
      console.error("Error al eliminar:", error);
      res.status(500).json({ status: 500, message: "Error al eliminar" });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { revisado } = req.body;
    if (!id)
      return res.status(400).json({ status: 400, message: "Falta el ID" });
    try {
      await db.execute("UPDATE Otros SET revisado = ? WHERE idOtros = ?", [
        revisado,
        id,
      ]);
      res.json({
        status: 200,
        message: `Registro de OTROS con ID ${id} actualizado`,
      });
    } catch (error) {
      console.error("Error al actualizar:", error);
      res.status(500).json({ status: 500, message: "Error al actualizar" });
    }
  },
};
