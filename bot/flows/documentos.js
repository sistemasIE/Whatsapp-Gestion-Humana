const { addKeyword } = require("@bot-whatsapp/bot");
const { addToDB, deleteFromDB } = require("../utils/functions.js");

const flowDocumentos = addKeyword([
  "3",
  "documento",
  "carne",
  "carnet",
  "carta laboral",
])
  .addAnswer(
    "*ATENCIÓN*\n*Si* o *No*\nAutoriza el uso de algunos datos personales, como su cédula, su nombre , su número de teléfono, y su correo, para poder brindarte un mejor servicio. ¿Estás de acuerdo?",
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
  ) //
  .addAnswer(
    ["1- Para Cartas Laborales 📝", "2- Para Carnets 🪪"],
    {
      capture: true,
      delay: 3000,
    },
    async (ctx, { flowDynamic, endFlow }) => {
      const { body, from } = ctx;
      if (isNaN(Number(body)))
        return endFlow("Opción no válida, por favor intente de nuevo.");

      if (body === "1") {
        const data = { chatId: from, idTipoDocumento: 1 };
        await addToDB("solicitar-documento", data);
      } else if (body === "2") {
        const data = { chatId: from, idTipoDocumento: 2 };
        const res = await addToDB("solicitar-documento", data);
      }
    }
  )
  .addAnswer(
    // NOMBRE COMPLETO
    "📝 Escriba su *Nombre Completo*:",
    { capture: true, delay: 3000 },
    async (ctx, {}) => {
      const { body, from } = ctx;

      const data = { chatId: from, nombreEmpleado: body };
      await addToDB("solicitar-documento", data);
    }
  )
  .addAnswer(
    // NÚMERO DE CÉDULA
    "🪪*Número de Cédula*:",
    { capture: true, delay: 3000 },
    async (ctx, { flowDynamic, endFlow }) => {
      const { body, from } = ctx;
      const chatId = from;

      // Validar que el número de cédula sea un número
      if (isNaN(Number(body))) {
        await deleteFromDB("solicitar-documento", chatId);
        return endFlow(
          "Número de cédula no válido, por favor intente de nuevo escribiendo *MENU*."
        );
      }

      const data = { chatId: from, numeroDeCedula: body };
      await addToDB("solicitar-documento", data);
    }
  )
  .addAnswer(
    // CORREO ELECTRÓNICO
    "✉️ Escriba la *dirección de correo* a *DÓNDE LLEGARÁ EL DOCUMENTO*, por favor:",
    { capture: true },
    async (ctx, { flowDynamic, endFlow }) => {
      const { body, from } = ctx;
      const chatId = from;
      // Validar que el correo electrónico tenga un formato válido
      if (!body.toUpperCase().includes("@")) {
        await deleteFromDB("solicitar-documento", chatId);
        return endFlow(
          "Correo electrónico no válido, por favor intente de nuevo escribiendo *MENU*."
        );
      }

      const data = { chatId: from, correoElectronico: body };
      await addToDB("solicitar-documento", data);

      return await flowDynamic(
        "✅ Gracias por tu información, en un plazo máximo de *(3) tres días recibirás el documento solicitado*."
      );
    }
  );

module.exports = flowDocumentos;
