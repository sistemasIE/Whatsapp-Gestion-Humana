const { addKeyword } = require("@bot-whatsapp/bot");

const flowIncapacidades = addKeyword([
  "2", "incapacid", "incapacidad", "enfermo"
]).addAnswer([
  "Para incapacidades, comunicarse con el siguiente número:",
  "_Número de Incapacidades_",
  "+57 316 467 5439",
]);

module.exports = flowIncapacidades;
