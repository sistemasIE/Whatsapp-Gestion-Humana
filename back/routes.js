const express = require("express");
const router = express.Router();
const otros = require("./controllers/otrosController");
const reclutamiento = require("./controllers/reclutamientoController");
const tipoDocumentoController = require("./controllers/tipoDocumentoController");
const solicitarDocumentoController = require("./controllers/solicitarDocumentoController");

// Otros
router.get("/otros", otros.getAll);
router.post("/otros/upsert", otros.upsert);
router.put("/otros/:id", otros.update);
router.delete("/otros/:id", otros.remove);

// Reclutamiento
router.get("/reclutamiento", reclutamiento.getAll);
router.post("/reclutamiento/upsert", reclutamiento.upsert);
router.put("/reclutamiento/:id", reclutamiento.update);
router.delete("/reclutamiento/:id", reclutamiento.remove);

// TipoDocumento
router.get("/tipo-documento", tipoDocumentoController.getAll);
router.post("/tipo-documento", tipoDocumentoController.create);
router.delete("/tipo-documento/:id", tipoDocumentoController.delete);

// SolicitarDocumento
router.get("/solicitar-documento", solicitarDocumentoController.getAll);
router.post("/solicitar-documento/upsert", solicitarDocumentoController.upsert);
router.put("/solicitar-documento/:id", solicitarDocumentoController.update);
router.delete("/solicitar-documento/:id", solicitarDocumentoController.delete);

module.exports = router;
