const Quantity = require("../../models/quantity.model")
//create
const Create = async(req,res)=>{
    const medicineQuantity = await Quantity.create(req.body)
    .then(
        createdMedicineQuantity =>{
            res.json({
                msg:"Created successfully",
                id:createdMedicine._id,
                data:medicineQuantity
            })
        }
    ).catch(error=>{res.json({err:error.message})}
    )
}
const get_All= async (req, res) => {
    try{
    const medicineQuantity = await Quantity.find()
  
    if(medicineQuantity.length===0)
    res.json({msg : "empty"})
    else
    res.json({ data: medicineQuantity })
  }
catch(error){res.json({err:error.message})}
};
const GetByName= async(req,res)=>{
    const medicineName=req.params.name
    Quantity.find({medicineName:medicineName})
    .then(medicineQuantity=>{
        res.json({
            data:medicineQuantity
        })
    })
    .catch(error=>{res.json({err:error.message})}
    )

} 
const Update= async(req,res)=>{
    try{
        const medicineName = req.params.name;
        
        const medicine =  await Quantity.find({medicineName:medicineName})
        if(!medicine) return res.status(404).send({error:  'Request does not exist'})
        
        //const isValidated = validator.requestUpdateValidation(req.body)
       // if (isValidated.error) return   res.status(400).send({ error: isValidated.error.details[0].message })
        const updateMedicine = await Quantity.updateOne({medicineName:medicineName},req.body)
        res.json({msg: 'Request updated successfully' , data: medicine });
        }
        catch(error)
        {
          console.log(error)
        }
}
module.exports = {
    Create,
    GetByName,
    Update,
    get_All
  };