const express = require("express");
const { register } = require("../controllers/controllerUsers");
const router = express.Router();
const { runValidation } = require("../validators/index");

//Registro de usuario
router.post("/register", register);

module.exports = router;
