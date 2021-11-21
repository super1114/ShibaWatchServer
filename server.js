const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
const Coin = require("./server/models/coins.model");

const app = express();

app.use(fileUpload({
  createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.post('/api/create_coin', async (req, res) => {
  console.log(req.body);
  let filename = "";
  if(req.files) {
    let myfile = req.files.file;
    filename = Date.now()+myfile.name.substring(myfile.name.indexOf("."), myfile.name.length);
    myfile.mv('./server/uploads/' + filename);
  }
  Coin.createCoin(req.body, filename, function(err, result) {
    if(err) return res.send({status:false, message: "Failed"});
    else res.send({ status: true, message: "Successfully Created", coinId: result.insertId });
  });
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});



require("./server/routes/customer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
