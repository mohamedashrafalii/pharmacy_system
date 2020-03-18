const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//offer schema
const receiptSchema = new Schema(
  {
   
    receipt: [JSON],
  },
  {
    timestamps: true
  }
);
receiptSchema.index({
  "$**": "text"
});

module.exports = Receipt = mongoose.model("Receipt", receiptSchema);
