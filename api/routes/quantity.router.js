const express = require("express");
const router = express.Router();
const quantityController = require("../controllers/quantity.controller");
const verify = require("../controllers/verifyToken.controller")
const {
  Create,
  GetByName,
  Update,
  get_All
  } = quantityController;

router.post("/create",verify, Create);
router.get("/:name",verify, GetByName);
router.put("/:name",verify, Update);
router.get("/",verify, get_All);

module.exports = router;
