const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicine.controller");
const verify = require("../controllers/verifyToken.controller")



const {
  Create,
  Read,
  get_Allmedicines,
  update_medicine,
  delete_medicine,
  ReadBarcode
} = medicineController;

router.post("/create",verify, Create);
router.get("/read/:id",verify, Read);
router.get("/read",verify,get_Allmedicines);
router.put("/update/:id",verify,update_medicine);
router.delete("/delete/:id",verify,delete_medicine);
router.get("/readBarcode/:barcode",verify,ReadBarcode);


module.exports = router;
