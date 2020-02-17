import React, { Component } from 'react'
import axios from 'axios'
import uuidv4 from 'uuid/v4'
import {  Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button ,Alert} from 'reactstrap';
import { log } from 'util';

class Medicine extends Component {

  state={
    medicines:[],
    medicine:
      {
        id: uuidv4(), // react-beautiful-dnd unique key
        barcodeNumber:'',
        name: '',
        description: '',
        price: ''
      },
    newMedicine:{
      barcodeNumber:'',
      name: '',
      description: '',
      price: ''

    },
    editMedicineData: {
      id:'',
      barcodeNumber:'',
      name : '',
      description : '',
      price : ''
    },
    newMedicineModal: false,
    editMedicineModal:false
  }
  toggleNewMedicinetModal() {
    this.setState({
      newMedicineModal: ! this.state.newMedicineModal
    });
  }

  toggleEditMedicineModal() {
    this.setState({
      editMedicineModal: ! this.state.editMedicineModal
    });
  }
  getMedicines = async  ()=> {

    const res = await axios.get(
      "http://localhost:5000/api/medicines/read"
      );
    this.setState({ medicines: res.data.data });

  };
  deleteMedicine=async(id)=> {
    await axios.delete('http://localhost:5000/api/medicines/delete/' + id).then((response) => {
     this.getMedicines()
    });
  }

  addMedicine=async()=>{
  await axios
  .post(
    'http://localhost:5000/api/medicines/create/',
    this.state.newMedicine
  )
  .then((response) => {
    let { medicines } = this.state;

   // requests.push(response.data);

    this.setState({ medicines, newMedicineModal: false, newMedicine: {
      barcodeNumber:'',
      name: '',
      description: '',
      price: ''

    }});
  })
  .catch(error => {
    alert(error.message)
  })}

      updateMedicine = async()=>{
      let {barcodeNumber,
       description  , name , price} = this.state.editMedicineData;
      try{
      await axios.put('http://localhost:5000/api/medicines/update/' + this.state.editMedicineData.id, {

        barcodeNumber,name,description,price
      }).then((response) => {

        this.getMedicines()
        this.setState({
          editMedicineModal: false, editRequestData: { id: '',
          barcodeNumber:'',description:"" ,name:'',price:''}
        })
      });
     }
     catch(error)
     {
      alert(   error)
     }
     }
    editMedicine=async( id )=> {
      this.setState({
        editMedicineData: { id }, editMedicineModal: ! this.state.editMedicineModal
      });

     }

render=()=>{
  this.getMedicines()


  let  medicines = this.state.medicines?this.state.medicines.map((medicine) => {
 return (


         <tr key={medicine.id}>
           <td style={{color:"#000"}}>{medicine.barcodeNumber}</td>
           <td style={{color:"#000"}}>{medicine.name}</td>
           <td style={{color:"#00"}}>{medicine.description}</td>
           <td style={{color:"#000"}}>{medicine.price}</td>
           <td style={{color:"#000"}}>
       <Button color="success" size="sm" className="mr-2" onClick={()=>this.editMedicine(
         medicine['_id'])}>Edit</Button>
       <Button color="danger" size="sm" onClick={()=>this.deleteMedicine(medicine['_id'])}>Delete</Button>
     </td>



         </tr>
       )
     }):""
     return (

       <div className="App container">

       <h1 style={{color:"#000"}}>Medicines</h1>
        <Button className="my-3" color="primary" onClick={this.toggleNewMedicinetModal.bind(this)}>Add Medicine</Button>

        <Input id="barcode" style={{width:"20%",margin:"1%"}} value={this.state.newMedicine.barcodeNumber} onChange={(e) => {
   let { newMedicine } = this.state;

   newMedicine.barcodeNumber = e.target.value;

   this.setState({ newMedicine });
 }} />


<Modal isOpen={this.state.newMedicineModal} toggle={()=>this.toggleNewMedicineModal()}>
<ModalHeader toggle={()=>this.toggleNewMedicineModal()}>Add a new Medicine</ModalHeader>
<ModalBody>

<FormGroup>
 <Label for="name">Name</Label>
 <Input id="name" value={this.state.newMedicine.name} onChange={(e) => {
   let { newMedicine } = this.state;

   newMedicine.name = e.target.value;

   this.setState({ newMedicine });
 }} />
</FormGroup>


<FormGroup>
 <Label for="description">description</Label>
 <Input id="description" value={this.state.newMedicine.description} onChange={(e) => {
   let { newMedicine } = this.state;

   newMedicine.description = e.target.value;

   this.setState({ newMedicine });
 }} />
</FormGroup>

<FormGroup>
 <Label for="price">price</Label>
 <Input id="price" value={this.state.newMedicine.price} onChange={(e) => {
   let { newMedicine } = this.state;

   newMedicine.price = e.target.value;

   this.setState({ newMedicine });
 }} />
</FormGroup>

</ModalBody>
<ModalFooter>
<Button color="primary" onClick={()=>this.addMedicine()}>Add Medicine</Button>
<Button color="secondary" onClick={()=>this.toggleNewMedicineModal()}>Cancel</Button>
</ModalFooter>
</Modal>


<Modal isOpen={this.state.editMedicineModal} toggle={this.toggleEditMedicineModal.bind(this)}>
   <ModalHeader toggle={this.toggleEditMedicineModal.bind(this)}>Edit Medicine</ModalHeader>
   <ModalBody>


     <FormGroup>

        <Label for="name">name</Label>
       <Input id="name" value={this.state.editMedicineData.name} onChange={(e) => {
         let { editMedicineData } = this.state;

         editMedicineData.name = e.target.value;

         this.setState({ editMedicineData });
       }} />
     </FormGroup>

     <FormGroup>

      <Label for="description">description</Label>
      <Input id="description" value={this.state.editMedicineData.description} onChange={(e) => {
      let { editMedicineData } = this.state;

      editMedicineData.description = e.target.value;

      this.setState({ editMedicineData });
      }} />
      </FormGroup>

          <FormGroup>

          <Label for="price">price</Label>
          <Input id="price" value={this.state.editMedicineData.price} onChange={(e) => {
          let { editMedicineData } = this.state;

          editMedicineData.price = e.target.value;

          this.setState({ editMedicineData });
          }} />
          </FormGroup>
   </ModalBody>
   <ModalFooter>
     <Button color="primary" onClick={()=>this.updateMedicine()}>Update Medicine</Button>{' '}
     <Button color="secondary" onClick={this.toggleEditMedicineModal.bind(this)}>Cancel</Button>
   </ModalFooter>
 </Modal>

         <Table>
           <thead>
             <tr>
               <th style={{color:"#000"}}>BarcodeNumber</th>
               <th style={{color:"#000"}}>Name</th>
               <th style={{color:"#000"}}>Description</th>
               <th style={{color:"#000"}}>Price</th>
               <th style={{color:"#000"}}>Action</th>

             </tr>
           </thead>
           <tbody>
             {medicines}
           </tbody>
         </Table>
       </div>
     );
   }

}

// class medicine extends Component {
//     state = {




//     updateRequest = async()=>{
//       let {
//        description  } = this.state.editRequestData;
//   try{
//       await axios.put('https://lirten-hub-guc.herokuapp.com/api/requests/' + this.state.editRequestData.id, {

//         description
//       },{headers: { Authorization: `Bearer ` + this.props.token }}).then((response) => {

//         this.getRequests()
//         this.setState({
//           editRequestModal: false, editRequestData: { id: '',
//           description:"" }
//         })
//       });
//     }
//     catch(error)
//     {
//       alert(   error+"\n"+"Description can't be empty")
//     }
//     }
//     editRequest( id,description ) {
//       this.setState({
//         editRequestData: { id,
//           description }, editRequestModal: ! this.state.editRequestModal
//       });
//     }
//     deleteRequest(id) {





//     render() {


//   }


export default Medicine
