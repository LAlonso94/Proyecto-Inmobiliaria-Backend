const { check } = require("express-validator");

exports.validatorUser = [
  check("nombre")
    .not()
    .isEmpty()
    .withMessage("El nombre es requerido")
    .isString()
    .withMessage("El nombre no debe contener números"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Se requiere el email")
    .isEmail()
    .withMessage("Formato de email inválido"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Se requiere contraseña")
    .isLength({ min: 8, max: 120 })
    .withMessage("La password debe tener un mínimo 8 caracteres"),
];
