const User = require("../models/user.model.js");
const Coin = require("../models/coins.model.js");

exports.signUp = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.signUp(req.body, function (err, result) {
    if(result.length==0) return res.json({status:false});
    else return res.json({status:true});
  });
}

exports.logIn = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.logIn(req.body, function (err, result) {
    if(result.length==0) return res.json({status:false});
    else return res.json({status:true, result:result[0]});
  });
}

exports.createToken = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Coin.createToken(req.body, req.files, function(err, result) {
    if(result.length==0) return res.json({status:false});
    else return res.json({status:true, result:result});
  });
}

exports.list = async (req, res) => {
  Coin.list(req.body, function(err, result) {
    if(result.length==0) return res.json({status:false});
    else return res.json({status:true, result:result});
  });
}


exports.downloadFile = async (req, res) => {
  Coin.downloadFile(req.params.id, function(err, result) {
    res.download(`server/uploads/${result[0].attached_file}`);
  });
}
