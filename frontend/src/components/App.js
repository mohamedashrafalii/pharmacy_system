import React, { Component } from 'react'
import './App.module.scss'
import Invoice from './Invoice/Invoice.jsx'
import { BrowserRouter, Route } from "react-router-dom";
import Receipt from "../components/Receipt.jsx";
import Medicine from"../components/medicine/medicine.jsx";
import Navbar from '../components/navbar/navbar.jsx'
class App extends Component {
  render() {
    return (
      <>

   <BrowserRouter>
   <Route exact path="/" component={Navbar} />
   <Route exact path="/receipt/:id/:price" component={Receipt} />
   <Route exact path="/medicines/" component={Medicine} />

   </BrowserRouter>
     </>
    )
  }
}

export default App
