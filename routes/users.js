const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/controllerUsers");
const { runValidation } = require("../validators");
const router = express.Router();
const {
  loginValidator,
  userValidator,
} = require("../validators/validatorUsers");

//Registro de usuario
router.post("/registro", userValidator, runValidation, registerController);

//Login
router.post("/login", loginValidator, runValidation, loginController);

module.exports = router;
