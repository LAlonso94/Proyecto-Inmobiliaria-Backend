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
router.post("/inmuebles/nuevo", addEstateValidators, runValidation, addEstates);
router.put(
  "/inmuebles/editar/:id",
  editEstateValidators,
  runValidation,
  editEstate
);
router.delete("/inmuebles/borrar/:id", deleteEstate);

module.exports = router;
