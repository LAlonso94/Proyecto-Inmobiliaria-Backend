const knex = require("../config/knexFile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { nombre, email, password, perfil } = req.body;

  const salt = await bcrypt.genSalt(10);
  const passwordEncrypt = await bcrypt.hash(password, salt);

  knex("usuarios")
    .where({ email: email })
    .then((resultado) => {
      if (resultado.length) {
        res.status(400).json({ error: "El email ya esta siendo utilizado" });
        return;
      }
      knex("usuarios")
        .insert({
          nombre: nombre,
          email: email,
          password: passwordEncrypt,
          perfil: perfil,
        })
        .then(() => {
          res.json({
            success: true,
            mensaje: "El usuario se ha registrado correctamente",
          });
        })
        .catch((error) => {
          res.status(400).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
