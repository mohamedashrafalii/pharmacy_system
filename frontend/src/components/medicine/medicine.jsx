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
        date:''
      },
    newMedicine:{
      barcodeNumber:'',
      name: '',
      description: '',
      price: '',
      activeIngredients:'',
      date:''

    },
    editMedicineData: {
      id:'',
      barcodeNumber:'',
      name: '',
      description: '',
      price: '',
      activeIngredients:'',
      date:''
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
    let oldMedicine=""
    await axios.get("http://localhost:5000/api/medicines/read/"+ id)
    .then((res)=>{oldMedicine=res.data.data})
    let quantityOldMed=0
    await axios.delete('http://localhost:5000/api/medicines/delete/' + id).then((response) => {

     this.getMedicines()
    });


    for(var i=0;i<this.state.quantities.length;i++)
    {
       if(this.state.quantities[i].medicineName===oldMedicine.name)
      {
        quantityOldMed=this.state.quantities[i].quantity
      }
    }
    const body={medicineName:oldMedicine.name,
      quantity:quantityOldMed-1>=0?quantityOldMed-1:0}

      this.updateMedicineQuantity(body,oldMedicine.name)
      this.getQuantities()
  }

  addMedicineQuantity=async(body)=>{
    await axios
    .post(
      'http://localhost:5000/api/medicinesQuantity/create',body
    )
      .then()
      .catch(error => {
        alert(error.message)
      })
  }
  updateMedicineQuantity=async(body,name)=>
  {
    await axios
    .put('http://localhost:5000/api/medicinesQuantity/'+name,body)
    .then(
      this.getQuantities()
    )
      .catch(error => {
        alert(error.message)
      })
  }
  getQuantities=async()=>{
   const res= await axios
    .get('http://localhost:5000/api/medicinesQuantity/')
    this.setState({ quantities: res.data.data });


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

if(this.state.quantities)
    {
      var flag=false

      for(var i=0;i<this.state.quantities.length;i++)
      {
         if(this.state.quantities[i].medicineName===this.state.newMedicine.name)
        {
          this.setState({quantity:this.state.quantities[i]})
          console.log(this.state.quantity)
          flag=true}
      }
      if(!flag)
      {
      const body={medicineName:this.state.newMedicine.name,
        quantity:1}
        this.addMedicineQuantity(body)}
      else
      {
        const body={medicineName:this.state.newMedicine.name,
          quantity:this.state.quantity.quantity+1}
          console.log(body)
          this.updateMedicineQuantity(body,this.state.newMedicine.name)
      }




  }
  else
  {   const body={medicineName:this.state.newMedicine.name,
    quantity:1}

this.addMedicineQuantity(body)}
  this.getMedicines()
  this.getQuantities()
   this.setState({ medicines, newMedicineModal: false, newMedicine: {
      barcodeNumber:'',
      name: '',
      description: '',
      price: '',
      activeIngredients:'',
      date:''


    }});

    })
  .catch(error => {
    alert(error.message)
  })

}

      updateMedicine = async()=>{
      let {barcodeNumber,
       description  , name , price,date,activeIngredients} = this.state.editMedicineData;
      try{

        let oldMedicine=""
        await axios.get("http://localhost:5000/api/medicines/read/"+ this.state.editMedicineData.id)
        .then((res)=>{oldMedicine=res.data.data})
        await axios.put('http://localhost:5000/api/medicines/update/' + this.state.editMedicineData.id, {

        barcodeNumber,name,description,price,date,activeIngredients
      }).then((response) => {
console.log(oldMedicine.name+" " +name)
        if(oldMedicine.name!==name)
        {


      var flag=false

      for(var i=0;i<this.state.quantities.length;i++)
      {
         if(this.state.quantities[i].medicineName===name)
        {
          this.setState({quantity:this.state.quantities[i]})
          console.log(this.state.quantity)
          flag=true}
      }
      if(!flag)
      {
      const body={medicineName:name,
        quantity:1}
        this.addMedicineQuantity(body)}
      else
      {
        const body={medicineName:name,
          quantity:this.state.quantity.quantity+1}
          this.updateMedicineQuantity(body,name)
      }
      let quantityOldMed =0;
      for(var i=0;i<this.state.quantities.length;i++)
      {
         if(this.state.quantities[i].medicineName===oldMedicine.name)
        {
          quantityOldMed=this.state.quantities[i].quantity
        }
      }
      const body={medicineName:oldMedicine.name,
        quantity:quantityOldMed-1>=0?quantityOldMed-1:0}
        this.updateMedicineQuantity(body,oldMedicine.name)



}
        this.getMedicines()
        this.setState({
          editMedicineModal: false, editRequestData: { id: '',
          barcodeNumber:'',description:"" ,name:'',price:'',activeIngredients:'',
          date:''}
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
     componentDidMount()
     {this.getMedicines()
      this.getQuantities()}
componentDidUpdate()
{}
render=()=>{

  let  medicines = this.state.medicines?this.state.medicines.map((medicine) => {
 return (


         <tr key={medicine.id}>
           <td style={{color:"#000"}}>{medicine.barcodeNumber}</td>
           <td style={{color:"#000"}}>{medicine.name}</td>
           <td style={{color:"#000"}}>{medicine.date}</td>
           <td style={{color:"#000"}}>{medicine.activeIngredients}</td>
           <td style={{color:"#00"}}>{medicine.description}</td>
           <td style={{color:"#000"}}>{medicine.price}</td>

           <td style={{color:"#000"}}>
       <Button color="success" size="sm" className="mr-2" onClick={()=>this.editMedicine(
         medicine['_id'])}>Edit</Button>
       <Button color="danger" size="sm" onClick={()=>this.deleteMedicine(medicine['_id'])}>Delete</Button>
     </td>



         </tr>
       )
     }):"";
     let  quantities = this.state.quantities?this.state.quantities.map((quantity) => {
      return (


              <tr key={quantity.id}>

                <td style={{color:"#000"}}>{quantity.medicineName}</td>

                <td style={{color:"#000"}}>{quantity.quantity}</td>


              </tr>
            )
          }):"";
     return (

       <div className="App container">

       <h1 style={{color:"#000"}}>Medicines</h1>
        <Button className="my-3" color="primary" onClick={this.toggleNewMedicinetModal.bind(this)}>Add Medicine</Button>

        <Input id="barcode" style={{width:"20%",margin:"1%"}} value={this.state.newMedicine.barcodeNumber} onChange={(e) => {
   let { newMedicine } = this.state;

   newMedicine.barcodeNumber = e.target.value;

   this.setState({ newMedicine });
 }} />


<Modal isOpen={this.state.newMedicineModal} toggle={this.toggleNewMedicinetModal.bind(this)}>
<ModalHeader toggle={this.toggleNewMedicinetModal.bind(this)}>Add a new Medicine</ModalHeader>
<ModalBody>

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
               <th style={{color:"#000"}}>Action</th>

             </tr>
           </thead>
           <tbody>
             {medicines}
           </tbody>
         </Table>

         <Table>
           <thead>
             <tr>

               <th style={{color:"#000"}}>Name</th>
               <th style={{color:"#000"}}>quantity</th>

             </tr>
           </thead>
           <tbody>
             {quantities}
           </tbody>
         </Table>
       </div>
     );
   }

}



export default Medicine