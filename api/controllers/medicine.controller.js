const Medicine = require("../../models/medicine.model");
//Create 
const {addMedicineValidation,editMedicineValidation} = require("../../validations/medicineValidation")
const Create =async (req, res) => {
  const {error} = addMedicineValidation(req.body)
  if(error) return res.send(error.details[0].message) 
  const medicine = await Medicine.create(req.body)

  .then(createdMedicine => {
        res.json({
            msg:"Created successfully",
            id:createdMedicine._id,
            data:createdMedicine
          });
         
    },
    
    )
    .catch(error => {
      res.json({
        err: error.message
      });
    });
    
   
    //req.body={medicineName:}
};

//Read by id
const Read =async (req, res) => {
    Medicine.findById(req.params.id)
    .then(foundMedicine => {
      res.json({
        msg: "This Medicine information",
        data: foundMedicine
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};
//get by barcode number
const ReadBarcode =async (req, res) => {
  const barcode = req.params.barcode
  Medicine.find({barcodeNumber:barcode})
  .then(foundMedicine => {
    res.json({
      msg: "This Medicine information",
      data: foundMedicine
    });
  })
  .catch(error => {
    res.json({
      err: error.message
    });
  });
};
//read all
get_Allmedicines= async (req, res) => {
  try{
  const medicine = await Medicine.find()

  if(medicine.length===0)
  res.json({msg : "empty"})
  else
  res.json({ data: medicine })
}
catch(error){res.json({err:error.message})}
};


update_medicine = async  (req, res) => {
  try{
    const {error} = editMedicineValidation(req.body)
    if(error) return res.send(error.details[0].message) 
    
  const medicineId = req.params.id;
  
  const medicine =  await Medicine.findById(medicineId)
  if(!medicine) return res.status(404).send({error:  'Request does not exist'})
  
  //const isValidated = validator.requestUpdateValidation(req.body)
 // if (isValidated.error) return   res.status(400).send({ error: isValidated.error.details[0].message })
  const updateMedicine = await Medicine.updateOne({'_id':medicineId},req.body)
  res.json({msg: 'Request updated successfully' , data: medicine });
  }
  catch(error)
  {
    console.log(error)
  }
}

delete_medicine =  async (req, res) => {
  try{ 
  const id = req.params.id;
  const deletedMedicine = await Medicine.findByIdAndRemove(id) 
 
  res.json({msg:'Request was deleted successfully', data: deletedMedicine });
  }
  catch(error){
    console.log(error)
  }
}
module.exports = {
    Create,
    Read,
    get_Allmedicines,
    update_medicine,
    delete_medicine,
    ReadBarcode
  };
  
