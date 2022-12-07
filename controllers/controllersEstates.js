const knex = require("../config/knexFile");

//Show all the available estates
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

//Add one new Estate
exports.addEstates = async (req, res) => {
  const {
    operacion,
    tipo,
    dormitorios,
    baños,
    metrosTerreno,
    metrosEdificados,
    observaciones,
    descripcion,
    precio,
    garage,
    departamento,
    zona,
    domicilio,
  } = req.body;
  try {
    const newAddress = await knex("direcciones")
      .returning("direccionId")
      .insert([
        {
          departamento: departamento,
          zona: zona,
          domicilio: domicilio,
        },
      ]);
    console.log(newAddress);
    const newEstate = await knex("inmuebles").insert(
      [
        {
          operacion: operacion,
          tipo: tipo,
          dormitorios: dormitorios,
          baños: baños,
          metrosTerreno: metrosTerreno,
          metrosEdificados: metrosEdificados,
          observaciones: observaciones,
          descripcion: descripcion,
          precio: precio,
          garage: garage,
          direccionId: newAddress[0].direccionId,
        },
      ],
      ["operacion", "tipo", "dormitorios"]
    );
    res.json({
      newEstate: newEstate,
      message: "El inmueble se agrego correctamente",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Search one specific estate by id
exports.searchId = (req, res) => {
  const { id } = req.params;
  knex("inmuebles")
    .join(
      "direcciones",
      "inmuebles.direccionId",
      "=",
      "direcciones.direccionId"
    )
    .where("inmuebles.inmuebleId", id)
    .then((respuesta) => {
      res.json(respuesta[0]);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

//Edit one existing estate selected by id
exports.editEstate = async (req, res) => {
  const { id } = req.params;
  const {
    operacion,
    tipo,
    dormitorios,
    baños,
    metrosTerreno,
    metrosEdificados,
    observaciones,
    descripcion,
    precio,
    garage,
    departamento,
    zona,
    domicilio,
  } = req.body;
  knex("inmuebles")
    .where("inmuebleId", id)
    .returning("direccionId")
    .update({
      operacion: operacion,
      tipo: tipo,
      dormitorios: dormitorios,
      baños: baños,
      metrosTerreno: metrosTerreno,
      metrosEdificados: metrosEdificados,
      observaciones: observaciones,
      descripcion: descripcion,
      precio: precio,
      garage: garage,
    })
    .then((respuesta) => {
      knex("direcciones")
        .where("direccionId", respuesta[0].direccionId)
        .update({
          departamento: departamento,
          zona: zona,
          domicilio: domicilio,
        })
        .then((respuesta) => {
          res.json({
            inmueble: respuesta[0],
            message: "Se ha actualizado el inmueble correctamente",
          });
        });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

//Delete one existing estate
exports.deleteEstate = (req, res) => {
  const id = req.params.id;
  knex("inmuebles")
    .where("direccionId", id)
    .del()
    .then(() => {
      knex("direcciones")
        .where("direccionId", id)
        .del()
        .then((respuesta) => {
          res.json({
            respuesta: respuesta,
            message: "Se ha borrado al inmueble correctamente",
          });
        });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

//Filter of Estates
exports.filterEstates = (req, res) => {
  const { operacion, tipo, departamento } = req.body;
  knex("inmuebles").join(
    "direcciones",
    "inmuebles.direccionId",
    "=",
    "direcciones.direccionId"
  );
};
