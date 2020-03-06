const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const {
  Register,get_Allusers,Login}=authController
  router.post("/Register", Register);
  router.get("/",get_Allusers);
  router.post("/Login",Login)
  module.exports = router;
