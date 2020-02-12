import React, { Component } from 'react'
import './App.module.scss'
import Invoice from './Invoice/Invoice.jsx'
import { BrowserRouter, Route } from "react-router-dom";
import Receipt from "../components/Receipt.jsx";

class App extends Component {
  render() {
    return (
      <>

   <BrowserRouter>
   <Route exact path="/" component={Invoice} />
   <Route exact path="/receipt/:id/:price" component={Receipt} />

   </BrowserRouter>
     </>
    )
  }
}

export default App
