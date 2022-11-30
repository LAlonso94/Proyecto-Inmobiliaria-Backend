const express = require("express");
const router = express.Router();
const { runValidation } = require("../validators/index");
const { allEstates, addEstates } = require("../controllers/controllersEstates");

router.get("/inmuebles", allEstates);
router.post("/inmuebles/nuevo", addEstates);

module.exports = router;
