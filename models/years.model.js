const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const yearsSchema = new Schema(
  {
    year:String,
    
  },
  {
    timestamps: true
  }
);

module.exports = Years = mongoose.model("Years", yearsSchema);