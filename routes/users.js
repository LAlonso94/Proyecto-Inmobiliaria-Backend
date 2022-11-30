const express = require("express");
const { register } = require("../controllers/controllerUsers");
const router = express.Router();
const { runValidation } = require("../validators/index");
const { validatorUser } = require("../validators/validatorUsers");

//Registro de usuario
router.post("/register", validatorUser, register);

module.exports = router;
