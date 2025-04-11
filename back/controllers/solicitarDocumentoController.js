const db = require("../db");
const { update } = require("./otrosController");

module.exports = {
  getAll: async (req, res) => {
    try {
      const [rows] = await db.execute(
        `SELECT s.*, t.nombreDocumento 
         FROM solicitarDocumentos s 
         JOIN TipoDocumento t ON s.idTipoDocumento = t.idTipoDocumento
         WHERE revisado = false`
      );
      res.json({ status: 200, message: "OK", data: rows });
    } catch (error) {
      console.error("Error consultando:", error);
      res.status(500).json({ status: 500, message: "Error al consultar" });
    }
  },

  upsert: async (req, res) => {
    const {
      chatId,
      idTipoDocumento,
      nombreEmpleado = null,
      numeroDeCedula = null,
      correoElectronico = null,
      fechaSolicitud = new Date(), // se manda desde JS o se toma el momento actual
    } = req.body;

    const revisado = false;

    if (!chatId || !idTipoDocumento) {
      return res
        .status(400)
        .json({ status: 400, message: "Falta chatId o idTipoDocumento" });
    }

    try {
      await db.execute(
        `INSERT INTO solicitarDocumentos 
     (chatId, idTipoDocumento, nombreEmpleado, numeroDeCedula, correoElectronico, fechaSolicitud, revisado)
   VALUES (?, ?, ?, ?, ?, ?, ?)
   ON DUPLICATE KEY UPDATE
     idTipoDocumento = IFNULL(VALUES(idTipoDocumento), idTipoDocumento),
     nombreEmpleado = IFNULL(VALUES(nombreEmpleado), nombreEmpleado),
     numeroDeCedula = IFNULL(VALUES(numeroDeCedula), numeroDeCedula),
     correoElectronico = IFNULL(VALUES(correoElectronico), correoElectronico),
     fechaSolicitud = IFNULL(VALUES(fechaSolicitud), fechaSolicitud),
     revisado = IFNULL(VALUES(revisado), revisado)`,
        [
          chatId,
          idTipoDocumento,
          nombreEmpleado,
          numeroDeCedula,
          correoElectronico,
          fechaSolicitud,
          revisado,
        ]
      );

      res.json({ status: 200, message: "Registro creado/actualizado" });
    } catch (error) {
      console.error("Error en upsert:", error);
      res
        .status(500)
        .json({ status: 500, message: "Error al insertar/actualizar" });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const [result] = await db.execute(
        "DELETE FROM solicitarDocumentos WHERE idSolicDoc = ?",
        [id]
      );
      res.json({ status: 200, message: `Solicitud con ID ${id} eliminada` });
    } catch (error) {
      console.error("Error al eliminar:", error);
      res.status(500).json({ status: 500, message: "Error al eliminar" });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { revisado } = req.body;

    try {
      await db.execute(
        `UPDATE solicitarDocumentos SET revisado = ? WHERE idSolicDoc = ?`,
        [revisado, id]
      );
      return res.json({
        status: 200,
        message: `Solicitud con ID ${id} actualizada`,
      });
    } catch (error) {
      return res
        .status(404)
        .json({ status: 404, message: `Solicitud con ID ${id} no encontrada` });
    }
  },
};
