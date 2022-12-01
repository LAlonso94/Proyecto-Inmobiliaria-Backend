const express = require("express");
const router = express.Router();
const { runValidation } = require("../validators/index");
const {
  allEstates,
  addEstates,
  searchId,
  editEstate,
  deleteEstate,
} = require("../controllers/controllersEstates");
const { verifyToken, verifyAdmin } = require("../validators/validatorUsers");

router.get("/inmuebles", verifyToken, verifyAdmin, allEstates);
router.get("/publicacion/:id", searchId);
router.post("/inmuebles/nuevo", addEstates);
router.put("/inmuebles/editar/:id", editEstate);
router.delete("/inmuebles/borrar/:id", deleteEstate);

module.exports = router;
