const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/controllerUsers");
const router = express.Router();
const {
  loginValidator,
  userValidator,
} = require("../validators/validatorUsers");

//Registro de usuario
router.post("/register", userValidator, registerController);

//Login
router.post("/login", loginValidator, loginController);

module.exports = router;
