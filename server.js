const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

const dotenv = require("dotenv")

dotenv.config()
// Connect to Mongo
mongoose
  .connect(process.env.DB_CONNECTION, {
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


 app.use("/api/fe2at-ornek",require("./api/routes/category.router"));
 app.use("/api/departments",require("./api/routes/departments.router"));
 app.use("/api/departmentsEmployees",require("./api/routes/departmentsEmployees.router"));
 app.use("/api/invType",require("./api/routes/invType.router"));
 app.use("/api/mainService",require("./api/routes/mainService.router"));
 app.use("/api/patient",require("./api/routes/patient.router"));
 app.use("/api/rates",require("./api/routes/rates.router"));
 app.use("/api/receipt",require("./api/routes/receipt.router"));
 app.use("/api/rotba",require("./api/routes/rotba.router"));
 app.use("/api/service",require("./api/routes/service.router"));
 app.use("/api/ticket",require("./api/routes/ticket.router"));
 app.use("/api/years",require("./api/routes/years.router"));
// app.use("/api/auth",require("./api/routes/auth.router"));
// app.use("/api/users",require("./api/routes/users.router"));

// Wrong path
app.use((req, res) =>
  res.status(404).send(`<h1>Can not find what you're looking for</h1>`)
);
// Port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));