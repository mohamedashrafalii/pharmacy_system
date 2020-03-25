import React, { Component } from 'react'
import axios from 'axios'
import uuidv4 from 'uuid/v4'
import {  Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button ,Alert} from 'reactstrap';
import { log } from 'util';
import 'date-fns';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,

  KeyboardDatePicker,
} from '@material-ui/pickers';
import { isThisQuarter } from 'date-fns';
import { MdBorderRight } from 'react-icons/md';
class Medicine extends Component {

  state={
    firstTime:true,
    medicines:[],
    quantities:[],
    quantity:{
      medicineName:'',
      quantity:0
    },
    medicine:
      {
        id: uuidv4(), // react-beautiful-dnd unique key
        barcodeNumber:'',
        name: '',
        description: '',
        price: '',
        activeIngredients:'',
        date:'',
        quantity:""
      },
    newMedicine:{
      barcodeNumber:'',
      name: '',
      description: '',
      price: '',
      activeIngredients:'',
      date:'',
      quantity:""

    },
    editMedicineData: {
      id:'',
      barcodeNumber:'',
      name: '',
      description: '',
      price: '',
      activeIngredients:'',
      date:'',
      quantity:""
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
      "hhtps://pharma-system.herokuapp.com/api/medicines/read",{headers: { authToken : this.props.value }}
      );
    this.setState({ medicines: res.data.data });

  };
  deleteMedicine=async(id)=> {

    await axios.delete('hhtps://pharma-system.herokuapp.com/api/medicines/delete/' + id,{headers: { authToken : this.props.value }})
    .then((response) => {

     this.getMedicines()
    })
    .catch(error=>{alert(error.message)});

  }

  addMedicine=async()=>{
  await axios
  .post(
    'hhtps://pharma-system.herokuapp.com/api/medicines/create/',
    this.state.newMedicine,{headers: { authToken : this.props.value }}
  )
  .then((response) => {
    if(response.data.msg!=="Created successfully")
    return alert(response.data)
    let { medicines } = this.state;
    this.getMedicines()

    this.setState({ medicines, newMedicineModal: false, newMedicine: {
       barcodeNumber:'',
       name: '',
       description: '',
       price: '',
       activeIngredients:'',
       date:'',
       quantity:''
  }}
    )
  })

  .catch(error => {
    alert(error.message)
  })

}

      updateMedicine = async()=>{
      let {barcodeNumber,
       description  , name , price,date,activeIngredients,quantity} = this.state.editMedicineData;
      try{

         await axios.put('hhtps://pharma-system.herokuapp.com/api/medicines/update/' + this.state.editMedicineData.id, {

        barcodeNumber,name,description,price,date,activeIngredients,quantity
      },{headers: { authToken : this.props.value }})
      .then((response) =>
      {  if(response.data.msg!=="Request updated successfully")
      return alert(response.data)
          this.getMedicines()
        this.setState({
          editMedicineModal: false, editRequestData: { id: '',
          barcodeNumber:'',description:"" ,name:'',price:'',activeIngredients:'',
          date:'',quantity:""}
        })})}


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
     componentDidMount()
     {this.getMedicines()

    }
componentDidUpdate()
{}
render=()=>{

  if(this.props.value)
  {
  let  medicines = this.state.medicines?this.state.medicines.map((medicine) => {
 return (

         <tr key={medicine.id}>
           <td style={{color:"#000"}}>{medicine.barcodeNumber}</td>
           <td style={{color:"#000"}}>{medicine.name}</td>
           <td style={{color:"#000"}}>{medicine.date}</td>
           <td style={{color:"#000"}}>{medicine.activeIngredients}</td>
           <td style={{color:"#00"}}>{medicine.description}</td>
           <td style={{color:"#000"}}>{medicine.price}</td>
           <td style={{color:"#000"}}>{medicine.quantity}</td>

           <td style={{color:"#000"}}>
       <Button color="success" size="sm" className="mr-2" onClick={()=>this.editMedicine(
         medicine['_id'])}>Edit</Button>
       <Button color="danger" size="sm" onClick={()=>this.deleteMedicine(medicine['_id'])}>Delete</Button>
     </td>



         </tr>
       )
     }):"";

     return (
<div> <div className="App container">

       <h1 style={{color:"#000"}}>Medicines</h1>
        <Button className="my-3" color="primary" onClick={this.toggleNewMedicinetModal.bind(this)}>Add Medicine</Button>



<Modal isOpen={this.state.newMedicineModal} toggle={this.toggleNewMedicinetModal.bind(this)}>
<ModalHeader toggle={this.toggleNewMedicinetModal.bind(this)}>Add a new Medicine</ModalHeader>
<ModalBody>

<FormGroup>
 <Label for="barcode">barcode number</Label>
 <Input id="barcode"  value={this.state.newMedicine.barcodeNumber} onChange={(e) => {
   let { newMedicine } = this.state;newMedicine.barcodeNumber = e.target.value;

   this.setState({ newMedicine });
 }} />
</FormGroup>

<FormGroup>
 <Label for="name">name</Label>
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

<FormGroup>
 <Label for="quantity">quantity</Label>
 <Input id="quantity" value={this.state.newMedicine.quantity} onChange={(e) => {
   let { newMedicine } = this.state;

   newMedicine.quantity = e.target.value;

   this.setState({ newMedicine });
 }} />
</FormGroup>


<FormGroup>
 <Label for="activeIngredients">active ingredients</Label>
 <Input id="activeIngredients" value={this.state.newMedicine.activeIngredients} onChange={(e) => {
   let { newMedicine } = this.state;

   newMedicine.activeIngredients = e.target.value;

   this.setState({ newMedicine });
 }} />
</FormGroup>

<FormGroup>
 <Label for="date">expiry date</Label>
 <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">

        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={this.state.newMedicine.date}
          onChange={ (e)=> {
            let { newMedicine } = this.state;
            const targetDate=""+e;
            const target=targetDate.substring(4,16)
            newMedicine.date =target;

            this.setState({ newMedicine });

          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

      </Grid>
    </MuiPickersUtilsProvider>

</FormGroup>
</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.addMedicine()}>Add Medicine</Button>
<Button color="secondary" onClick={this.toggleNewMedicinetModal.bind(this)}>Cancel</Button>
</ModalFooter>

</Modal>


<Modal isOpen={this.state.editMedicineModal} toggle={this.toggleEditMedicineModal.bind(this)}>
   <ModalHeader toggle={this.toggleEditMedicineModal.bind(this)}>Edit Medicine</ModalHeader>
   <ModalBody>

   <FormGroup>

<Label for="barcodeNumber">barcode number</Label>
<Input id="barcodeNumber" value={this.state.editMedicineData.barcodeNumber} onChange={(e) => {
 let { editMedicineData } = this.state;

 editMedicineData.barcodeNumber = e.target.value;

 this.setState({ editMedicineData });
}} />

</FormGroup>

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

          <FormGroup>

          <Label for="quantity">quantity</Label>
          <Input id="quantity" value={this.state.editMedicineData.quantity} onChange={(e) => {
          let { editMedicineData } = this.state;

          editMedicineData.quantity = e.target.value;

          this.setState({ editMedicineData });
          }} />
          </FormGroup>

          <FormGroup>
 <Label for="activeIngredients">active ingredients</Label>
 <Input id="activeIngredients" value={this.state.editMedicineData.activeIngredients} onChange={(e) => {
   let { editMedicineData } = this.state;

   editMedicineData.activeIngredients = e.target.value;

   this.setState({ editMedicineData });
 }} />
</FormGroup>

<FormGroup>
 <Label for="date">expiry date</Label>
 <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">

        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={this.state.editMedicineData.date}
          onChange={ (e)=> {
            let { editMedicineData } = this.state;
            const targetDate=""+e;
            const target=targetDate.substring(4,16)
            editMedicineData.date =target;

            this.setState({ editMedicineData });

          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

      </Grid>
    </MuiPickersUtilsProvider>

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
               <th style={{color:"#000"}}>Expiry Date</th>
               <th style={{color:"#000"}}>ActiveIngredients</th>
               <th style={{color:"#000"}}>Description</th>
               <th style={{color:"#000"}}>Price</th>
               <th style={{color:"#000"}}>quantity</th>
               <th style={{color:"#000"}}>Action</th>
             </tr>
           </thead>
           <tbody>
             {medicines}
           </tbody>
         </Table>

         </div>

       </div>
     );
   }
   else {return  (
     <h>Not Authorized</h>
   )
   }
  }

}



export default Medicine
