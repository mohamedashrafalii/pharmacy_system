const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicine.controller");
const {
  Create,
  Read,
  get_Allmedicines,
  update_medicine,
  delete_medicine,
  ReadBarcode
} = medicineController;

router.post("/create", Create);
router.get("/read/:id", Read);
router.get("/read",get_Allmedicines);
router.put("/update/:id",update_medicine);
router.delete("/delete/:id",delete_medicine);
router.get("/readBarcode/:barcode",ReadBarcode);
module.exports = router;
