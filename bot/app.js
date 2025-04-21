const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MySQLAdapter = require("@bot-whatsapp/database/mysql");

const config = require("./config");
const flows = require("./flows/flows");

const main = async () => {
  const adapterDB = new MySQLAdapter({
    host: config.MYSQL_DB_HOST,
    user: config.MYSQL_DB_USER,
    database: config.MYSQL_DB_NAME,
    password: config.MYSQL_DB_PASSWORD,
    port: config.MYSQL_DB_PORT,
  });

  const adapterFlow = createFlow(flows);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  },{
    blacklist: [],
  });

  QRPortalWeb();
};

main();
