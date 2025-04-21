const { addKeyword } = require("@bot-whatsapp/bot");

const flowReclutamiento = require("./reclutamiento");
const flowIncapacidades = require("./incapacidades");
const flowDocumentos = require("./documentos");
const flowOtros = require("./otros");

const flowPrincipal = addKeyword([
  "alo",
  "atras",
  "buen",
  "buenas tardes",
  "buenas",
  "buenos dias",
  "dia",
  "don",
  "doña",
  "hola",
  "mami",
  "menu",
  "menu",
  "menú",
  "noches",
  "ola",
  "señor",
  "señora",
  "volver",
])
  .addAnswer("🙌 Hola bienvenido *Integral de Empaques🍀*")
  .addAnswer(
    [
      "Te atenderemos lo más pronto posible, por favor selecciona una opción:",
      "👉 *1* si estás interesado en _*Trabajar con Nosotros*_",
      "👉 *2*  para informar sobre *Incapacidades*",
      "👉 *3*  para solicitar *Documentos*",
      "👉 *4*  para *Consultas y Otros Servicios*",
      "",
      "Escribe 'MENU' Para volver a este menú en cualquier momento.",
    ],
    null,
    null,
    [flowReclutamiento, flowIncapacidades, flowDocumentos, flowOtros]
  );

module.exports = [flowPrincipal];
