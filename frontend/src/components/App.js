import React, { Component } from 'react'
import './App.module.scss'
import Invoice from './Invoice/Invoice.jsx'
import { Switch ,BrowserRouter, Route } from "react-router-dom";
import Receipt from "../components/Receipt.jsx";
import Medicine from"../components/medicine/medicine.jsx";
import Navbar from '../components/navbar/navbar.jsx'
import Login from '../components/login/login.jsx'
import axios from 'axios'

class App extends Component {
  state={
    token:"",
    type:"",
    username:""
  }

  callbackFunction= (childData)=> {

    this.setState({token: childData.token,username:childData.username})
    localStorage.setItem('token',childData.token)

    this.getUserType(this.state.username)
console.log(this.state.type)

}
getUserType=async(username)=>
{
   await axios.get( "https://pharma-system.herokuapp.com/api/users/"+username,{headers: { authToken :this.state.token }}
  ).then((response) => {
    const x=response.data.data[0].type

    this.setState({type:x})
    localStorage.setItem('type',x)

     this.forceUpdate()
  })}
  UNSAFE_componentWillUpdate(nextProps,nextState)
{
  localStorage.setItem('token',nextState.token)
  localStorage.setItem('type',nextState.type)
}
UNSAFE_componentWillMount()
{
  localStorage.getItem('token')&&this.setState({token:localStorage.getItem('token')})
  localStorage.getItem('type')&&this.setState({type:localStorage.getItem('type')})
}
  render() {

    return (



<div>

   <BrowserRouter>
   <Switch>
   <Route exact path="/"  component={()=><Login key="2" value={this.callbackFunction} />} />

   <Route exact path="/main/:type"  component={()=><Navbar key="1" value={localStorage.getItem('token')}/>} />

   <Route exact path="/receipt/:id/:price"  component={Receipt}  />
   <Route exact path="/main/receipt"  component={()=><Invoice key="1" value={this.state.token} />}  />

   <Route component={()=><h1 style={{color:"red"}}>Can't find what you are looking for!</h1>}/>
   </Switch>
   </BrowserRouter>
</div>
    )

    }
}

export default App
