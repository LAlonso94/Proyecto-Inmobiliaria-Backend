const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

//MIDDLEWARES
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//RUTAS
const users = require("./routes/users");
const estates = require("./routes/estates");
app.use("/api", users);
app.use("/api", estates);

//EJECUCION DEL SERVIDOR
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
