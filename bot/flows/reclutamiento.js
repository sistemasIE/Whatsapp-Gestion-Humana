const { addKeyword } = require("@bot-whatsapp/bot");
const { addToDB, deleteFromDB } = require("../utils/functions");

const flowReclutamiento = addKeyword([
  "1",
  "trabajo",
  "hoja de vida",
  "oja",
  "interesado en",
  "oferta laboral",
])
  .addAnswer(
    "*ATENCIÓN*\n*Si* o *No*\nAutoriza el uso de algunos datos personales, como su número de teléfono, su nombre y su ciudad de residencia, para poder brindarte un mejor servicio. ¿Estás de acuerdo?",
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
    "📝 Escriba su *Nombre Completo*:",
    { capture: true, delay: 3000 },
    async (ctx, { flowDynamic }) => {
      const { body, from } = ctx;
      await addToDB("reclutamiento", { chatId: from, nombre: body });
    }
  )
  .addAnswer(
    "📞 Ahora escriba su *Número de Teléfono*:",
    { capture: true, delay: 3000 },
    async (ctx, { flowDynamic, endFlow }) => {
      const { body, from } = ctx;
      const phoneNumberRegex = /^[0-9]{10}$/; // Regex para validar un número de teléfono de 10 dígitos
      if (!phoneNumberRegex.test(body)) {
        deleteFromDB("reclutamiento", { chatId: from });
        return endFlow({
          body: "Número de teléfono inválido. Por favor, ingrese un número de 10 dígitos.\n*Para reintentar escriba 'MENU'*",
        });
      }

      await addToDB("reclutamiento", { chatId: from, telefono: body });
    }
  )
  .addAnswer(
    "🏙️ Ahora escriba la *Ciudad* en la que habita:",
    { capture: true },

    async (ctx, { flowDynamic }) => {
      const { body, from } = ctx;

      await addToDB("reclutamiento", { chatId: from, ciudad: body });
    }
  )
  .addAnswer(
    "¿A Qué Cargo Aspira?🔎\n\n-Operario de Producción.\n--Técnico de Mantenimiento.\n- Supervisor\n-Administración\n-OTRO (Especifique Cuál)",
    { capture: true },

    async (ctx, { flowDynamic }) => {
      const { body, from } = ctx;

      await addToDB("reclutamiento", { chatId: from, cargo: body });
    }
  )
  .addAnswer("📎 Adjunte su *Hoja de Vida*", {
    delay: 3000,
  })
  .addAnswer("✅ ¡Muchas gracias! Estaremos contactándolo pronto. 🙌", {
    delay: 15000,
  });

module.exports = flowReclutamiento;
