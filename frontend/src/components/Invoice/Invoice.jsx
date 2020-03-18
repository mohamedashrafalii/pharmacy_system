import React, { Component } from 'react'
import styles from './Invoice.module.scss'
import axios from 'axios'
import LineItems from './LineItems'
import uuidv4 from 'uuid/v4'
import {Button} from 'reactstrap'
var QRCode = require('qrcode.react')

class Invoice extends Component {


  locale = 'en-US'
  currency = 'USD'

  state = {
    mailReady:false,
    medicineId:'',
    mail: '',
    flag: '',
    show: false,
    qr: '',
    qrCODE:null,
    id: '',
    discountRate: 0.0,
     medicine:
    {  id: '', // react-beautiful-dnd unique key
    barcodeNumber:'',
    name: '',
    description: '',
    price:'',
    quantity:""
    },
    barcodeNumber:'',
    lineItems: [
      {
        id: uuidv4(), // react-beautiful-dnd unique key
        name: '',
        description: '',
        quantity: '',
        price: ''
      }
    ]
  }

  handleInvoiceChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLineItemChange = elementIndex => event => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      return { ...item, [event.target.name]: event.target.value }
    })
    this.setState({ lineItems })
  }

  handleAddLineItem = event => {

    this.setState({
      // use optimistic uuid for drag drop; in a production app this could be a database id

      lineItems: this.state.lineItems.concat([
        {
          id: this.state.medicine.id,
          name: this.state.medicine.name,//this.setState.medicine.name,
          description:this.state.medicine.description, //this.medicine.description,
          quantity: 1,
          price:this.state.medicine.price//this.medicine.price
        }
      ])
    })
  }

  handleRemoveLineItem = elementIndex => event => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i
      })
    })
  }

  handleReorderLineItems = newLineItems => {
    this.setState({
      lineItems: newLineItems
    })
  }

  handleFocusSelect = event => {
    event.target.select()
  }

  getMedicineBYBarcode=async(barcodeNumber)=>
  {
    await axios
      .get(
        'https://pharma-system.herokuapp.com/api/medicines/readBarcode/'+barcodeNumber,{headers: { authToken : this.props.value }}
      )
      .then((res) => {
        let firstDate = new Date()
        let secondDate = new Date(res.data.data[0].date+"")
        const timeDifference = secondDate-firstDate;
        if(timeDifference<=0)
        return alert("Sorry this medicine is expired!")
        this.setState({medicine:{id:res.data.data[0]._id,name:res.data.data[0].name,price:res.data.data[0].price,description:res.data.data[0].description}})
        this.handleAddLineItem()
      })
      .catch(error => {
        alert("invalid barcode number")
      })

  }

  handleScan = async () =>{
      this.getMedicineBYBarcode(this.state.barcodeNumber);


  }


  handlePayButtonClick = async event => {

    await axios
      .post(
        'https://pharma-system.herokuapp.com/api/receipts/create',
        { receipt: this.state.lineItems },{headers: { authToken : this.props.value }}
      )
      .then(res => {
        this.setState({ id: res.data.id })
      })
      .catch(error => {
        alert(error.message)
      })

      //check quantities
      let quantitiesChecker=true
      let showInv=true;
      for(let i=0;i<this.state.lineItems.length;i++)
      {

      let oldMedicine=""

      let quantitytmp=this.state.lineItems[i].quantity;

      await axios.get("https://pharma-system.herokuapp.com/api/medicines/read/"+ this.state.lineItems[i].id,{headers: { authToken : this.props.value }})
      .then((res)=>{oldMedicine=res.data.data})

        if(quantitytmp>oldMedicine.quantity)
        {alert("no enough "+oldMedicine.name+" there is only "+oldMedicine.quantity+" "+oldMedicine.name)
        showInv=false
        quantitiesChecker=false
        break
        }

  }
  if(quantitiesChecker)
  {
    let showInv=true;
  for(let i=0;i<this.state.lineItems.length;i++)
  {

  let oldMedicine=""

  let quantitytmp=this.state.lineItems[i].quantity;

  await axios.get("https://pharma-system.herokuapp.com/api/medicines/read/"+ this.state.lineItems[i].id,{headers: { authToken : this.props.value }})
  .then((res)=>{oldMedicine=res.data.data})

      if(quantitytmp>oldMedicine.quantity)
    {alert("no enough "+oldMedicine.name)
    showInv=false
    break
    }
    else{
  const body={
    quantity:oldMedicine.quantity-quantitytmp>=0?oldMedicine.quantity-quantitytmp:0}
    await axios.put("https://pharma-system.herokuapp.com/api/medicines/update/"+ this.state.lineItems[i].id,body,{headers: { authToken : this.props.value }})
  }
}
  if(showInv){
      this.setState({
        flag:
          'https://pharmacystem.herokuapp.com/api/receipts/read/' +
          this.state.id +
          '/' +
          this.formatCurrency(this.calcGrandTotal()),
        show: true,
        mailReady:true
      })
    }
  }
}

  handleNewReceiptClick = event => {
    event.preventDefault()
    this.setState({ medicineId:'',
    mailReady:false,
    mail: '',
    flag: '',
    show: false,
    qr: '',
    qrCODE:null,
    id: '',
    discountRate: 0.0,
     medicine:
    {  id: '', // react-beautiful-dnd unique key
    barcodeNumber:'',
    name: '',
    description: '',
    price:''
    },
    barcodeNumber:'',
    lineItems: [

    ]})
    this.forceUpdate()
  }

  formatCurrency = amount => {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  calcDiscountAmount = c => {
    return c * (this.state.discountRate / 100)
  }

  calcLineItemsTotal = () => {
    return this.state.lineItems.reduce(
      (prev, cur) => prev + cur.quantity * cur.price,
      0
    )
  }

  calcDiscountTotal = () => {
    return this.calcLineItemsTotal() * (this.state.discountRate / 100)
  }

  calcGrandTotal = () => {
    return this.calcLineItemsTotal() - this.calcDiscountTotal()
  }

  goreceipt = () => {
    window.location.href =
      'https://pharmacystem.herokuapp.com/receipt/' +
      this.state.id +
      '/' +
      this.formatCurrency(this.calcGrandTotal())
  }

  SendMail = async () => {
    if(this.state.mail==="")
    alert("Enter a valid email adress!")
    else
    if(this.state.mailReady)
    {const res = await axios.get(
      'https://pharma-system.herokuapp.com/api/receipts/read/' +
        this.state.id,{headers: { authToken : this.props.value }}
    )

    let mailBody = ''
    for (let i = 1; i <= res.data.data.length; i++) {
      mailBody =
        mailBody +
        '\n' +
        'Item #' +
        i +
        ':-' +
        '\n' +
        ' Description: ' +
        res.data.data[i - 1].description +
        '\n' +
        ' Item Name: ' +
        res.data.data[i - 1].name +
        '\n' +
        ' Price: ' +
        this.formatCurrency(res.data.data[i - 1].price) +
        '\n' +
        ' Quantity: ' +
        res.data.data[i - 1].quantity +
        '\n' +
        '-----------------------------------------'
    }

    mailBody +=
      '\n' +
      '-----------------------------------------' +
      '\n' +
      'Discount: ' +
      this.formatCurrency(this.calcDiscountTotal()) +
      '\n' +
      'Total: ' +
      this.formatCurrency(this.calcGrandTotal()) +
      '\n'

    axios
      .post('https://pharma-system.herokuapp.com/api/receipts/sendMail', {
        mail: this.state.mail,
        mailBody: mailBody
      },{headers: { authToken : this.props.value }})
      .then((res)=>{

        alert(res.data)
      })
      .catch(error => {
        alert(error.message)
      })
    }
    else{alert("Pay first!")}
  }

  onChangeMail=async(e) => {

    await this.setState({
      mail: e.target.value
    })
  }
componentDidMount=()=>{this.setState({lineItems:[]})}
  render = () => {

    // let qrCODE
    if(this.props.value){
    if (this.state.show) {
      this.state.qrCODE = <QRCode value={this.state.flag} />
    } else this.state.qrCODE = null
    return (
<div>
      <div className={styles.invoice}>

        <div>

         <h1>Bar Code Number</h1>
          <input name="barCodeNumber" className={styles.barcodeNumber } value={this.state.barcodeNumber} onChange={(e) => {
   this.setState({ barcodeNumber : e.target.value })
 }} />
          <button id="scan"  className={styles.newreceipt} onClick={()=>this.handleScan()}>Scan</button>
        </div>
        <div className={styles.pay}>
          <button
            id="my-new-receipt"
            className={styles.newreceipt}
            onClick={this.handleNewReceiptClick}
          >
            New Receipt
          </button>
        </div>
        <h2>Receipt</h2>


        <LineItems
          items={this.state.lineItems}
          currencyFormatter={this.formatCurrency}
          addHandler={this.handleAddLineItem}
          changeHandler={this.handleLineItemChange}
          focusHandler={this.handleFocusSelect}
          deleteHandler={this.handleRemoveLineItem}
          reorderHandler={this.handleReorderLineItems}
        />

        <div className={styles.totalContainer}>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Discount Rate (%)</div>
                <div className={styles.value}>
                  <input
                    name="discountRate"
                    type="number"
                    step="0.01"
                    value={this.state.discountRate}
                    onChange={this.handleInvoiceChange}
                    onFocus={this.handleFocusSelect}
                  />
                </div>
              </div>
            </div>
          </form>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Subtotal</div>
                <div className={`${styles.value} ${styles.currency}`}>
                  {this.formatCurrency(this.calcLineItemsTotal())}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Discount ({this.state.discountRate}%)</div>
                <div className={`${styles.value} ${styles.currency}`}>
                  {this.formatCurrency(this.calcDiscountTotal())}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Total Due</div>
                <div className={`${styles.value} ${styles.currency}`}>
                  {this.formatCurrency(this.calcGrandTotal())}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className={styles.pay}>
          <button className={styles.payNow} onClick={()=>this.handlePayButtonClick()}>
            Pay Now
          </button>
        </div>

        <div className={styles.footer}>
          <div className={styles.comments}>
            <h4>QR Code</h4>
            {this.state.qrCODE}
          </div>
          <div className={styles.closing}>
            <div>Thank-you for your business</div>
          </div>
        </div>
       <br />
        <br />
        <div class="form-label-group">
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            onChange={this.onChangeMail}
            autofocus
          />
        </div>
        <button onClick={this.SendMail}>Send Mail</button>
        </div>      </div>
    )
  }
  else {return  (
    <h>Not Authorized</h>
  )
  }
}
}

export default Invoice
