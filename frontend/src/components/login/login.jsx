import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'
import Navbar from '../navbar/navbar'
import Medicine from '../medicine/medicine'
import { Input, FormControl, InputLabel } from '@material-ui/core'
import { getWeekYearWithOptions } from 'date-fns/fp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { BrowserRouter, Route } from "react-router-dom";
class Login extends Component {

  state={
    token:'',
    username:'',
    password:'',
    type:''

  }
  getUserType=async(username)=>
  {
     await axios.get( "https://pharma-system.herokuapp.com/api/users/"+username,{headers: { authToken :this.state.token }}
    ).then((response) => {
      const x=response.data.data[0].type

      this.setState({type:x})
      console.log(x)
      console.log(this.state.type)
      localStorage.setItem("type",x)
      window.location.href='https://pharmacystem.herokuapp.com/main/'+x

       this.forceUpdate()
    })}
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
  //alert(this.state.username)
   this.sendData()
   this.getUserType(this.state.username)
//window.location.href='http://localhost:3000/main/'+this.state.type

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

    <fieldset style={{border:"solid black 3px"  , width:"18%" , marginLeft:"35%",marginTop:"10%" }}>
      <legend style={{ marginLeft:"7%",fontSize:"100"}}>login</legend>
     <AccountCircleIcon style={{ marginLeft:"7%",fontSize:"100"}} />
      <InputLabel style={{ marginLeft:"7%",fontFamily:"ariel" }} >Username</InputLabel>
    <Input style={{ marginLeft:"7%"}} key="2" value={this.state.username} onChange={(e) => {
   let { username } = this.state;

   username= e.target.value;

   this.setState({ username });
 }}/>
    <InputLabel style={{ marginLeft:"7%" , fontFamily:"ariel"}}>Password</InputLabel>
    <Input style={{ marginLeft:"7%"}} key="3" type="password" value={this.state.password} onChange={(e) => {
   let { password } = this.state;

   password= e.target.value;

   this.setState({ password });
 }}/>
<p></p>
    <Button style={{ marginLeft:"7%"}} onClick={()=>this.login()}>login</Button>
  <p></p>
  </fieldset>
    )

}}

export default Login
