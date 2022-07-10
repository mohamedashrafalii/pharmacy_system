const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const serviceSchema = new Schema(
  {
    nameAr:String,
    nameEn:String,
    quantity:Number,
    price:Number,
    total:Number,
    state:Boolean
  },
  {
    timestamps: true
  }
);

module.exports = Service = mongoose.model("Service", serviceSchema);