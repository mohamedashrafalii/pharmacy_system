import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'
import Navbar from '../navbar/navbar'
import Medicine from '../medicine/medicine'
import { Input } from '@material-ui/core'
import { getWeekYearWithOptions } from 'date-fns/fp'

import { BrowserRouter, Route } from "react-router-dom";
class Login extends Component {

  state={
    token:'',
    username:'',
    password:'',
    type:''

  }

  login=async()=>
  {
    const body= {"username":this.state.username,"password":this.state.password}
    await axios
    .post("https://pharma-system.herokuapp.com/api/auth/login",body)
    .then(res=>{this.setState({token:res.data})
if(res.data==="Wrong username or password!")
alert("Wrong username or password!")
else

{
  await axios.get( "https://pharma-system.herokuapp.com/api/users/"+username,{headers: { authToken :this.state.token }}
  ).then((response) => {
    const x=response.data.data[0].type

    this.setState({type:x})


     this.forceUpdate()
  })
  //alert(this.state.username)
   this.sendData()
window.location.href='https://pharmacystem.herokuapp.com/main/'+this.state.type

}


  }

    )
    .catch(error=> {
      alert(error.message)
    })
  }

  sendData = () => {
    this.props.value({token:this.state.token,username:this.state.username});
}
  render=()=>
  {
    return(

    <div>

      <p>Username</p>
    <Input key="2" value={this.state.username} onChange={(e) => {
   let { username } = this.state;

   username= e.target.value;

   this.setState({ username });
 }}/>
    <p>Password</p>
    <Input key="3" type="password" value={this.state.password} onChange={(e) => {
   let { password } = this.state;

   password= e.target.value;

   this.setState({ password });
 }}/>
    <p></p>
    <Button  onClick={()=>this.login()}>login</Button>
    </div>
    )

}}

export default Login
