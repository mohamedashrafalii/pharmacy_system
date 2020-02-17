import React, { Component } from 'react'
import styles from './Invoice.module.scss'
import axios from 'axios'
import LineItems from './LineItems'
import uuidv4 from 'uuid/v4'

var QRCode = require('qrcode.react')

class Invoice extends Component {


  locale = 'en-US'
  currency = 'USD'

  state = {
    medicineId:'',
    mail: '',
    flag: '',
    show: false,
    qr: '',
    qrCODE:null,
    id: '',
    discountRate: 0.0,
    medicine:{  id: '', // react-beautiful-dnd unique key
    name: '',
    description: '',
    price:''
    },
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
          id: uuidv4(),
          name: '',//this.setState.medicine.name,
          description:'', //this.medicine.description,
          quantity: 1,
          price: ''//this.medicine.price
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

  // handleScan = async () =>{
  //   await axios
  //   .get("http://localhost:5000/api/medicines/read/"+this.setState.medicineId)
  //   .then(res=>{this.setState.medicine.name=res.data.name
  //     this.setState.medicine.description=res.data.description
  //    this.setState.medicine.price=res.data.price
  //    this.setState.handleAddLineItem()
  //   })
  // }

  handlePayButtonClick = async event => {

    await axios
      .post(
        'http://localhost:5000/api/receipts/create',
        { receipt: this.state.lineItems }
      )
      .then(res => {
        this.setState({ id: res.data.id })
      })
      .catch(error => {
        alert(error.message)
      })

      this.setState({
        flag:
          'http://localhost:3000/api/receipts/read/' +
          this.state.id +
          '/' +
          this.formatCurrency(this.calcGrandTotal()),
        show: true
      })
  }

  handleNewReceiptClick = event => {
    event.preventDefault()
    window.location.reload()
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
      'http://localhost:3000/receipt/' +
      this.state.id +
      '/' +
      this.formatCurrency(this.calcGrandTotal())
  }

  SendMail = async () => {
    const res = await axios.get(
      'http://localhost:5000/api/receipts/read/' +
        this.state.id
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
      .post('http://localhost:5000/api/receipts/sendMail', {
        mail: this.state.mail,
        mailBody: mailBody
      })
      .then( alert('Sent'))
      .catch(error => {
        alert(error.message)
      })

  }

  onChangeMail=async(e) => {
    await this.setState({
      mail: e.target.value
    })
  }

  render = () => {
    // let qrCODE
    if (this.state.show) {
      this.state.qrCODE = <QRCode value={this.state.flag} />
    } else this.state.qrCODE = null
    return (
      <div className={styles.invoice}>
        {/* <div>
          <h1>Bar Code Number</h1>
          <input name="barCodeNumber" className={styles.barcodeNumber} ></input>
          <button id="scan"  className={styles.newreceipt} onClick={this.handleScan}>Scan</button>
        </div> */}
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
                    value={this.state.discountxRate}
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
          <button className={styles.payNow} onClick={this.handlePayButtonClick}>
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
        <button onClick={this.goreceipt}>Receipt</button>
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
      </div>
    )
  }
}

export default Invoice
