const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patient schema
const patientSchema = new Schema(
  {
   
    name:String,
    
    nationalNumber:String,

    militaryNumber:String,

    rotba:{type: Schema.Types.ObjectId, ref: 'Rotba'},

    subPatients:[{type: Schema.Types.ObjectId, ref: 'Patient'}],





  },
  {
    timestamps: true
  }
);

module.exports = Patient = mongoose.model("Patient", patientSchema);