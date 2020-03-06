const express = require("express");
const router = express.Router();
const receiptController = require("../controllers/receipt.controller");
const verify = require("../controllers/verifyToken.controller")

const {
  Create,
  Read,
  SendMail,
  ReadAll
} = receiptController;

router.post("/create",verify, Create);
router.get("/read/:id", Read);
router.post("/sendMail",verify, SendMail);
router.get("/read",verify,ReadAll)
module.exports = router;
