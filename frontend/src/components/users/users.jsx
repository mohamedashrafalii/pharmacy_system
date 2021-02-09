import React, { Component } from "react"
import axios from "axios"
import uuidv4 from "uuid/v4"
import {  Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button ,Alert} from "reactstrap";

import "date-fns";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import staticVariables from '../statics'
class User extends Component {

  state={
    firstTime:true,
    Users:[],

    user:
      {
        id: uuidv4(), // react-beautiful-dnd unique key
      name:"",
      type:"",
      username:"",
      password:""
    },
    newUser:{
      name:"",
      type:"",
      username:"",
      password:""
    },
    newUserModal: false
  }

  toggleNewUserModal() {
    this.setState({
      newUserModal: ! this.state.newUserModal
    });
  }
    getUsers = async  ()=> {

    const res = await axios.get(
      staticVariables.backendUrl+"/users/",{headers: { authToken : this.props.value }}
      );
    this.setState({ Users: res.data.data });

  };
  deleteUser=async(id)=> {

    await axios.delete(staticVariables.backendUrl+"/users/delete/" + id,{headers: { authToken : this.props.value }})
    .then((response) => {

     this.getUsers()
    })
    .catch(error=>{alert(error.message)})
    ;

  }

  addUser=async()=>{
  await axios
  .post(
    staticVariables.backendUrl+"/users/addUser/",
    this.state.newUser,{headers: { authToken : this.props.value }}
  )
  .then((response) => {
    if(response.data.msg!=="Created successfully")
    alert(response.data)
    else{
    let { Users } = this.state;
    this.getUsers()

    this.setState({ Users, newUserModal: false, newUser: {

       name: "",
      type:"",
      username:"",
      password:""
  }}
    )}
      }
)

  .catch(error => {
    alert(error)
  })

}


     componentDidMount()
     {this.getUsers()

    }
componentDidUpdate()
{}
render=()=>{
  if(this.props.value)
  {
  let  Users = this.state.Users?this.state.Users.map((user) => {
 return (

         <tr key={user.id}>
           <td style={{color:"#000"}}>{user.name}</td>
           <td style={{color:"#000"}}>{user.type}</td>


           <td style={{color:"#000"}}>
       <Button color="danger" size="sm" onClick={()=>this.deleteUser(user["_id"])}>Delete</Button>
     </td>



         </tr>
       )
     }):"";

     return (
<div> <div className="App container">

       <h1 style={{color:"#000"}}>Users</h1>
        <Button className="my-3" color="primary" onClick={this.toggleNewUserModal.bind(this)}>Add User</Button>



<Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)}>
<ModalHeader toggle={this.toggleNewUserModal.bind(this)}>Add a new User</ModalHeader>
<ModalBody>





<FormGroup>
 <Label for="name">Name</Label>
 <Input  id="name" value={this.state.newUser.name} onChange={(e) => {
   let { newUser } = this.state;

   newUser.name = e.target.value;

   this.setState({ newUser });
 }} />
</FormGroup>

<FormGroup>
 <Label for="username">Username</Label>
 <Input id="username" value={this.state.newUser.username} onChange={(e) => {
   let { newUser } = this.state;

   newUser.username = e.target.value;

   this.setState({ newUser });
 }} />
</FormGroup>


<FormGroup>
<Label for="userType">User Type</Label>
<RadioGroup aria-label="type" name="type" value={this.state.newUser.type} onChange={(e) => {
   let { newUser } = this.state;

   newUser.type = e.target.value;

   this.setState({ newUser });
 }}>
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          <FormControlLabel value="user" control={<Radio />} label="User" />

</RadioGroup>
</FormGroup>


<FormGroup>
 <Label for="password">Password</Label>
 <Input id="password" value={this.state.newUser.password} onChange={(e) => {
   let { newUser } = this.state;

   newUser.password = e.target.value;

   this.setState({ newUser });
 }} />
</FormGroup>


</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.addUser()}>Add User</Button>
<Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>Cancel</Button>
</ModalFooter>

</Modal>



         <Table>
           <thead>
             <tr>

               <th style={{color:"#000"}}>Name</th>
               <th style={{color:"#000"}}>Type</th>

               <th style={{color:"#000"}}>Action</th>
             </tr>
           </thead>
           <tbody>
             {Users}
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



export default User
