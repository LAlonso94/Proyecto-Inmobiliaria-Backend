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
    res.json(newEstate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
