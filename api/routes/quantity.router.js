const express = require("express");
const router = express.Router();
const quantityController = require("../controllers/quantity.controller");
const {
  Create,
  GetByName,
  Update,
  get_All
  } = quantityController;

router.post("/create", Create);
router.get("/:name", GetByName);
router.put("/:name", Update);
router.get("/", get_All);

module.exports = router;
