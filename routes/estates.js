const express = require("express");
const router = express.Router();
const { runValidation } = require("../validators/index");
const { allEstates } = require("../controllers/controllersEstates");

router.get("/inmuebles", allEstates);

module.exports = router;
