const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//offer schema
const userSchema = new Schema(
  {
   
    name:type=String,
    username:
    type=String,
    password:
    type=String,
    type:type=String

  },
  {
    timestamps: true
  }
);
userSchema.index({
  "$**": "text"
});

module.exports = User = mongoose.model("User", userSchema);