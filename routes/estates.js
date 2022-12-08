const express = require("express");
const router = express.Router();
const { runValidation } = require("../validators/index");
const {
  allEstates,
  addEstates,
  searchId,
  editEstate,
  deleteEstate,
  filterEstates,
} = require("../controllers/controllersEstates");
const { verifyToken, verifyAdmin } = require("../validators/validatorUsers");
const {
  addEstateValidators,
  editEstateValidators,
} = require("../validators/validatorsEstates");

router.get("/inmuebles", allEstates);
router.get("/publicacion/:id", searchId);
router.post("/inmuebles/filtro", filterEstates);
router.post(
  "/inmuebles/nuevo",
  addEstateValidators,
  verifyToken,
  verifyAdmin,
  runValidation,
  addEstates
);
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

module.exports = router;
