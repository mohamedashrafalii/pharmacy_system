import React, { Component } from "react";
import axios from "axios"
import {Table} from 'reactstrap'

class Receipt extends Component {


    state = {
      rec: [],

    };

  getRecipt = async ()=>{
    const res = await  axios.get(
      "http://localhost:5000/api/receipts/read/"+ this.props.match.params.id
    )
    this.setState({rec:res.data.data});

  }

    render() {
      this.getRecipt()

       let price = this.props.match.params.price
    let sum=0;
      const  recs = this.state.rec?this.state.rec.map((rec) => {
        sum=sum+rec.price

        return (


              <tr key={rec.id}>
                <td style={{color:"#000"}}>{rec.name}</td>

                <td style={{color:"#000"}}>{rec.description}</td>
                <td style={{color:"#000"}}>{rec.quantity}</td>
                <td style={{color:"#000"}}>{rec.price}$</td>
                <td style={{color:"#000"}}>{rec.price*rec.quantity}$</td>
                <td >
             </td>



              </tr>
            )
          }):""

        return <Table striped bordered hover>
        <thead>
          <tr>

            <th style={{color:"#000"}}>NAME</th>

            <th style={{color:"#000"}}>description</th>
            <th style={{color:"#000"}}>quantity</th>
            <th style={{color:"#000"}}>price</th>
            <th style={{color:"#000"}}>total</th>


          </tr>
        </thead>

        <tbody>
          {recs}
          <h3>Total Price</h3>
          <>{price}</>
        </tbody>
      </Table>;

  }
}

export default Receipt;





