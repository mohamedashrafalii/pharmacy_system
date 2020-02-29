const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quantitySchema = new Schema(
    {
medicineName:type=String,
quantity:type=Number
    }
)
quantitySchema.index({
    "$**": "text"
  });
module.exports = Quantity = mongoose.model("Quantity", quantitySchema);