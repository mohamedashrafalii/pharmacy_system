const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//offer schema
const medicineSchema = new Schema(
  {
   
    name: 
    type=String,
    description:
    type=String,
    price:
    type=Number,
    barcodeNumber:
    type=Number,
    activeIngredients:
    type=String,
    date:type=String,
    quantity:type=Number

  },
  {
    timestamps: true
  }
);
medicineSchema.index({
  "$**": "text"
});

module.exports = Medicine = mongoose.model("Medicine", medicineSchema);