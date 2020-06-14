const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const config = require("./config/keys.js");
const dotenv = require("dotenv")

dotenv.config()
// Connect to Mongo
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology:true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));
// Express body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
// Cors
app.use(cors());
// Serve static assets if in production


// Entry point
app.get("/", (req, res) => res.send(`<h1>Welcome to Beat the Receipt app</h1>`));
// Use Routes


app.use("/api/receipts",require("./api/routes/receipt.router"));
app.use("/api/medicines",require("./api/routes/medicine.router"));
app.use("/api/auth",require("./api/routes/auth.router"));
app.use("/api/users",require("./api/routes/users.router"));

// Wrong path
app.use((req, res) =>
  res.status(404).send(`<h1>Can not find what you're looking for</h1>`)
);
// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));