const knex = require("../config/knexFile");
const formidable = require("formidable");
const fs = require("fs");

//Show all photos
exports.photo = (req, res) => {
  knex("imagenes")
    .then((result) => {
      res.set("Content-Type", result[0].filetype);
      return res.send(result[0].filedata);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

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

/////////////////PARA PROBAR LO DE AGREGAR IMAGEN A BD///////

exports.addEstatesWithImage = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not upload",
      });
    }
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
    } = fields;

    try {
      let fileData;
      let fileType;

      if (files.file) {
        if (files.file.size > 1000000) {
          return res.status(400).json({
            error: "Tamaño máximo de la imagen: 1MB",
          });
        }

        fileData = fs.readFileSync(files.file.filepath);
        fileType = files.file.mimetype;

        const newImage = await knex("imagenes")
          //.returning("direccionId")
          .insert([
            {
              filedata: fileData,
              filetype: fileType,
            },
          ]);

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
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

/////////////////////////////////////////////////////////////////////////

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
  const id = req.params.id;
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
    .where("inmuebleId", id)
    .returning("direccionId")
    .del()
    .then((respuesta) => {
      knex("direcciones")
        .where("direccionId", respuesta[0].direccionId)
        .del()
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

//Filter of Estates
exports.filterEstates = (req, res) => {
  const { operacion, tipo, departamento } = req.body;
  knex("inmuebles")
    .join(
      "direcciones",
      "inmuebles.direccionId",
      "=",
      "direcciones.direccionId"
    )
    .then((resultado) => {
      if (operacion) {
        resultado = resultado.filter((item) => {
          return item.operacion === operacion;
        });
      }
      if (tipo) {
        resultado = resultado.filter((item) => {
          return item.tipo === tipo;
        });
      }
      if (departamento) {
        resultado = resultado.filter((item) => {
          return item.departamento === departamento;
        });
      }
      res.json(resultado);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
