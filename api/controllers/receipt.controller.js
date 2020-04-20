const Receipt = require("../../models/receipt.model");
const nodemailer = require("nodemailer");

//Create 
const Create = (req, res) => {

  
    Receipt.create({ receipt: req.body.receipt })
    .then(createdReceipt => {
        res.json({
            msg:"Created successfully",
            id:createdReceipt._id
          });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};

//Read by id
const Read = (req, res) => {
    Receipt.findById(req.params.id)
    .then(foundReceipt => {
      res.json({
        msg: "This Receipt information",
        data: foundReceipt.receipt
      });
    })
    .catch(error => {
      res.json({
        err: error.message
      });
    });
};

// read all receipts
const ReadAll = (req, res) => {
  Receipt.findOne()
  .then(foundReceipt => {
    res.json({
      msg: "This Receipt information",
      data: foundReceipt.receipt
    });
  })
  .catch(error => {
    res.json({
      err: error.message
    });
  });
};

const SendMail =async (req,res)=> {


  //let img = await QRCode.toDataURL('youtube.com');
  
 var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
   
     user: "receiptreceipt2020@gmail.com",
     pass: "receipt2020A"
   }
 });
 
 var mailOptions = {
   from: '"RECEIPT FREE 🧾" <yourreceipt7@gmail.com>',
   to:req.body.mail,
   subject: 'Your Receipt',
   text: req.body.mailBody
 };
 
 transporter.sendMail(mailOptions, function(error, info){
   if (error) {
    return res.status(400).send(error)
   } else {
    return res.send('Email sent: ' + info.response);
   }
 });
};

module.exports = {
  Create,
  Read,
  SendMail,
  ReadAll
};
