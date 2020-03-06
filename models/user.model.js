const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//offer schema
const userSchema = new Schema(
  {
   
    userName:
    type=String,
    password:
    type=String

  },
  {
    timestamps: true
  }
);
userSchema.index({
  "$**": "text"
});

module.exports = User = mongoose.model("User", userSchema);