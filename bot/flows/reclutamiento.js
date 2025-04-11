const { addKeyword } = require("@bot-whatsapp/bot");
const { API_URL } = require("../../env.js");

const flowReclutamiento = addKeyword([
  "1",
  "trabajo",
  "hoja de vida",
  "oja",
  "interesado en",
  "oferta laboral",
])
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
    "📝 Escriba su *Nombre Completo*:",
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const { body, from } = ctx;

      await fetch(`${API_URL}/reclutamiento/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: from, nombre: body }),
      });
    }
  )
  .addAnswer(
    "📞 Ahora escriba su *Número de Teléfono*:",
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const { body, from } = ctx;

      await fetch(`${API_URL}/reclutamiento/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: from, telefono: body }),
      });
    }
  )
  .addAnswer(
    "🏙️ Ahora escriba la *Ciudad* en la que habita:",
    { capture: true },

    async (ctx, { flowDynamic }) => {
      const { body, from } = ctx;

      await fetch(`${API_URL}/reclutamiento/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: from, ciudad: body }),
      });
    }
  )
  .addAnswer("📎 Adjunte su *Hoja de Vida*", {
    delay: 20000,
  })
  .addAnswer("✅ ¡Muchas gracias! Estaremos contactándolo pronto. 🙌");

module.exports = flowReclutamiento;
