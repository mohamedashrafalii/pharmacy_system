const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const departmentsEmployeesSchema = new Schema(
  {
    username:String,
    password:String,
    state:Boolean,
    department:{type: Schema.Types.ObjectId, ref: 'Departments'}

  },
  {
    timestamps: true
  }
);

module.exports = DepartmentsEmployees = mongoose.model("DepartmentsEmployees", departmentsEmployeesSchema);