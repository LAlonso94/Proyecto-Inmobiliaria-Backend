const { check } = require("express-validator");

///No lo utilizamos porque para subir imagenes no van por BODY, van por FORM DATA, y esto da error
exports.addEstateValidators = [
  check("operacion").not().isEmpty().withMessage("La operación es requerida"),
  check("tipo").not().isEmpty().withMessage("Agregue un tipo de inmueble"),
  check("dormitorios")
    .not()
    .isEmpty()
    .withMessage("Agregue la cantidad de dormitorios")
    .isNumeric()
    .withMessage("Los dormitorios deben ser en formato número"),
  check("baños")
    .not()
    .isEmpty()
    .withMessage("Agregue la cantidad de baños")
    .isNumeric()
    .withMessage("Los baños deben ser en formato número"),
  check("metrosTerreno")
    .not()
    .isEmpty()
    .withMessage("Agregue los metros cuadrados del terreno"),
  check("metrosEdificados")
    .not()
    .isEmpty()
    .withMessage("Agregue los metros edificados del inmueble"),
  check("observaciones")
    .not()
    .isEmpty()
    .withMessage("Agregue las observaciónes del inmueble"),
  check("descripcion")
    .not()
    .isEmpty()
    .withMessage("La descripción es requerida"),
  check("precio").not().isEmpty().withMessage("Agregue el precio del inmueble"),
  check("garage").not().isEmpty().withMessage("Agregue si tiene garage o no"),
  check("departamento")
    .not()
    .isEmpty()
    .withMessage("Agregue el departamento donde se encuentra el inmueble"),
  check("zona")
    .not()
    .isEmpty()
    .withMessage("Agregue el zona o barrio donde se encuentra el inmueble"),
  check("domicilio")
    .not()
    .isEmpty()
    .withMessage("Agregue el domicilio donde se encuentra el inmueble"),
];

exports.editEstateValidators = [
  check("dormitorios")
    .isNumeric()
    .withMessage("Los dormitorios deben ser en formato número"),
  check("baños")
    .isNumeric()
    .withMessage("Los baños deben ser en formato número"),
];
