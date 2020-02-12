const express = require("express");
const router = express.Router();
const receiptController = require("../controllers/receipt.controller");
const {
  Create,
  Read,
  SendMail,
  ReadAll
} = receiptController;

router.post("/create", Create);
router.get("/read/:id", Read);
router.post("/sendMail", SendMail);
router.get("/read",ReadAll)
module.exports = router;
