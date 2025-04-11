const { addKeyword } = require("@bot-whatsapp/bot");
const { API_URL } = require("../../env.js");

const flowOtros = addKeyword(["4", "otros", "consultas", "consulta"])
  .addAnswer(
    "*ATENCIÓN*\n*Si* o *No*\nAutoriza el uso de algunos datos personales, como tu número de teléfono, para poder brindarte un mejor servicio. ¿Estás de acuerdo?",
    { capture: true },
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
    "¡Perfecto!      Escriba su *Nombre Completo*",
    { capture: true },
    async (ctx) => {
      const { body, from } = ctx;

      await fetch(`${API_URL}/otros/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: from, nombre: body }),
      });
    }
  )
  .addAnswer(
    "Escriba *EN UN SOLO MENSAJE 1️⃣* brevemente *el motivo* de su mensaje ",
    { capture: true },
    async (ctx) => {
      const { body, from } = ctx;

      await fetch(`${API_URL}/otros/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: from, motivo: body }),
      });
    }
  )
  .addAnswer(
    "Muchas Gracias!\n\n\nRecibimos tu consulta y la estamos procesando. Te responderemos lo más pronto posible."
  );

module.exports = flowOtros;
