const knex = require("../config/knexFile");

exports.allEstates = (req, res) => {
  knex("inmuebles")
    .join(
      "direcciones",
      "inmuebles.direccionId",
      "=",
      "direcciones.direccionId"
    )
    .then((respuesta) => {
      res.json(respuesta);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
