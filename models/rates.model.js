const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const ratesSchema = new Schema(
  {
    type:String,
    price:String,
  },
  {
    timestamps: true
  }
);

module.exports = Rates = mongoose.model("Rates", ratesSchema);