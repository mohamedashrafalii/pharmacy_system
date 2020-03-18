const express = require("express");
const router = express.Router();
const authController = require("../controllers/users.controller");
const verify = require("../controllers/verifyToken.controller")
const {
  addUser,get_Allusers,delete_user,getByUsername}=authController
  router.post("/addUser",verify, addUser);
  router.get("/",verify,get_Allusers);
  router.delete("/delete/:id",verify,delete_user);
  router.get("/:username",verify,getByUsername);
  
  module.exports = router;
