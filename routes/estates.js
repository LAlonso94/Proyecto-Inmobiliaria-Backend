const express = require("express");
const router = express.Router();
const { runValidation } = require("../validators/index");
const {
  allEstates,
  searchId,
  editEstate,
  deleteEstate,
  filterEstates,
  addEstatesWithImage,
  photo,
} = require("../controllers/controllersEstates");
const { verifyToken, verifyAdmin } = require("../validators/validatorUsers");

router.get("/inmuebles", allEstates);
router.get("/publicacion/:id", searchId);
router.post("/inmuebles/filtro", filterEstates);
router.post("/inmuebles/nuevo", addEstatesWithImage);
router.put(
  "/inmuebles/editar/:id",
  verifyToken,
  verifyAdmin,
  runValidation,
  editEstate
);
router.delete(
  "/inmuebles/borrar/:id",
  verifyToken,
  verifyAdmin,
  runValidation,
  deleteEstate
);
router.put("/inmuebles/editar/:id", editEstate);
router.delete("/inmuebles/borrar/:id", deleteEstate);

router.get("/photos/:id", photo);

module.exports = router;
