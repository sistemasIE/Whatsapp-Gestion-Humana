const { addKeyword } = require("@bot-whatsapp/bot");

const flowDocumentos = addKeyword([
  "3",
  "documento",
  "carne",
  "carnet",
  "carta laboral",
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
  ) //
  .addAnswer(
    ["1- Para Carnets 🪪", "2- Para Cartas Laborales 📝"],
    {
      capture: true,
    },
    async (ctx, { flowDynamic, endFlow }) => {
      const { body, from } = ctx;
      if (isNaN(Number(body)))
        return endFlow("Opción no válida, por favor intente de nuevo.");

      if (body === "1") {
        await fetch(`${API_URL}/reclutamiento/upsert`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId: from, idTipoDocumento: 1 }),
        });
      } else if (body === "2") {
        await fetch(`${API_URL}/reclutamiento/upsert`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId: from, idTipoDocumento: 2 }),
        });
      }
    }
  )
    .addAnswer(
    "📝 Escriba su *Nombre Completo*:",
    { capture: true },
    async (ctx, {}) => {
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
  );

module.exports = flowDocumentos;
