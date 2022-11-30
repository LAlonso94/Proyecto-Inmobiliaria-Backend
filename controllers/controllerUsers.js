const knex = require("../config/knexFile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerController = async (req, res) => {
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

exports.loginController = (req, res) => {
  const { email, password } = req.body;
  knex("usuarios")
    .where({ email: email })
    .then(async (resultado) => {
      if (!resultado.length) {
        res.status(404).json({
          error: "Email y/o contraseña incorrecta/s",
        });
        return;
      }
      const validatePassword = await bcrypt.compare(
        password,
        resultado[0].password
      );
      if (!validatePassword) {
        res.status(404).json({
          error: "Email y/o contraseña incorrecta/s",
        });
        return;
      }
      const token = jwt.sign(
        {
          nombre: resultado[0].nombre,
          email: resultado[0].email,
          id: resultado[0].usuarioId,
          perfil: resultado[0].perfil,
        },
        process.env.TOKEN_SECRET
      );

      res.json({ success: true, token: token });
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};
