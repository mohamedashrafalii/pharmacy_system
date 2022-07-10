const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const ornekFe2ahSchema = new Schema(
  {
    type:String
  },
  {
    timestamps: true
  }
);

module.exports = OrnekFe2ah = mongoose.model("OrnekFe2ah", ornekFe2ahSchema);