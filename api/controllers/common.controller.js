
// const {addTargetValidation,editTargetValidation} = require("../../validations/medicineValidation")
var ObjectID = require("mongodb").ObjectID

function Create(Target) {return async (req, res) => {
//   const {error} = addTargetValidation(req.body)
//   if(error) return res.send(error.details[0].message) 

  const target = await Target.create(req.body)

  .then(createdTarget => {
        res.json({
            msg:"Created successfully",
            id:createdTarget._id,
            data:createdTarget
          });
         
    },
    
    )
    .catch(error => {
      res.json({
        err: error.message
      });
    });
}}

function Read_by_id(Target){return async (req, res) => {
    Target.findById(req.params.id)
    .then(foundTarget => {
      res.json({
        data: foundTarget
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
}}

//read all
function Get_all(Target) {return async (req, res) => {
  try{
  const target = await Target.find()

  if(target.length===0)
  res.json({msg : "empty"})
  else
  res.json({ data: target })
}
catch(error){res.json({err:error.message})}
}}


function Update(Target) {return async  (req, res) => {
  try{
    // const {error} = editTargetValidation(req.body)
    // if(error) return res.send(error.details[0].message) 
    // console.log(req.params)
  if(!ObjectID.isValid(req.params.id))
  return res.status(422).send({error:  'id is not valid'})
  const targetId = req.params.id;
  
  
  const target =  await Target.findById(targetId)
  if(!target) return res.status(422).send({error:  'Id does not exist'})
  
  //const isValidated = validator.requestUpdateValidation(req.body)
 // if (isValidated.error) return   res.status(400).send({ error: isValidated.error.details[0].message })
  const updateTarget = await Target.updateOne({'_id':targetId},req.body)
  res.json({msg: 'Target updated successfully' , data: target });
  }
  catch(error)
  {
    console.log(error)
  }
}}

function Delete(Target) {return async (req, res) => {
  try{ 
  const id = req.params.id;
  const deletedTarget = await Target.findByIdAndRemove(id) 
 
  res.json({msg:'Request was deleted successfully', data: deletedTarget });
  }
  catch(error){
    console.log(error)
  }
}}
module.exports = {
    Create,
    Read_by_id,
    Get_all,
    Update,
    Delete
  
  };