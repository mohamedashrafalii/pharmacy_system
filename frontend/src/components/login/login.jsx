import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'
import Navbar from '../navbar/navbar'
import Medicine from '../medicine/medicine'
import { Input } from '@material-ui/core'
import { getWeekYearWithOptions } from 'date-fns/fp'
class Login extends Component {

  state={
    token:'',
    userName:'',
    password:'',
    flag:false
  }
  login=async()=>
  {
    const body= {"userName":this.state.userName,"password":this.state.password}
    await axios
    .post("https://pharma-system.herokuapp.com/api/auth/login",body)
    .then(res=>{this.setState({token:res.data})
            this.setState({flag:true})

  }

    )
    .catch(error=> {
      alert(error.message)
    })
  }
  render=()=>
  {
    if(!this.state.flag)
    return(
    <div>
      <p>Username</p>
    <Input key="2" value={this.state.userName} onChange={(e) => {
   let { userName } = this.state;

   userName= e.target.value;

   this.setState({ userName });
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
    else
    return(<Navbar key="1" value={this.state.token} />)
}}

export default Login
