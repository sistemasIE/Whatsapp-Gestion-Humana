const { addKeyword } = require("@bot-whatsapp/bot");
const { addToDB } = require("../utils/functions.js");

const flowOtros = addKeyword(["4", "otros", "consultas", "consulta"])
  .addAnswer(
    "*ATENCIÓN*\n*Si* o *No*\nAutoriza el uso de algunos datos personales, como su nombre, para poder brindarte un mejor servicio. ¿Estás de acuerdo?",
    { capture: true, delay: 3000 },
    async (ctx, { flowDynamic, endFlow }) => {
      const { body } = ctx;

      if (
        body.toUpperCase().trim() === "SI" ||
        body.toUpperCase().trim() === "S"
      ) {
        return;
      } else {
        return endFlow({
          body: "¡Entendido! Si cambias de opinión, no dudes en contactarnos.",
        });
      }
    }
  )
  .addAnswer(
    "¡Perfecto!\nEscriba su *Nombre Completo*",
    { capture: true, delay: 3000 },
    async (ctx) => {
      const { body, from } = ctx;

      await addToDB("otros", { chatId: from, nombre: body });
    }
  )
  .addAnswer(
    "Escriba *EN UN SOLO MENSAJE 1️⃣* brevemente *el motivo* de su mensaje ",
    { capture: true, delay: 3000 },
    async (ctx) => {
      const { body, from } = ctx;

      await addToDB("otros", { chatId: from, motivo: body });
    }
  )
  .addAnswer(
    "Muchas Gracias!\n\n\nRecibimos tu consulta y la estamos procesando. Te responderemos lo más pronto posible."
  );

module.exports = flowOtros;
