const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`🟢 Backend listo en http://localhost:${PORT}`);
});
