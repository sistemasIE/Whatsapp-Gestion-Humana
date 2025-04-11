const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use('/api/static', express.static(path.join(__dirname, '../bot')));

app.listen(PORT, () => {
  console.log(`🟢 Backend listo en http://localhost:${PORT}`);
});
