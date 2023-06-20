const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const HttpError = require("./misc/Errors/HttpError")
const router = require("./router/");
const db = require("./model");
const dotenv = require('dotenv');
const path = require("path");
dotenv.config();

const PORT = process.env.PORT;
global.appRoot = path.resolve(__dirname);
global.API_PATH = `http://localhost:${PORT}`
 
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => next(new HttpError(404, "page introuvable")));
app.use((error, req, res, next) => res.status(error.code).json(error.message));


db.sequelize  
  .sync()
  .then((result) => {
    app.listen(PORT, () =>
      console.log(`server is liteneing on port ${PORT} ...`)
    );
  })
  .catch((error) => console.log(error));
