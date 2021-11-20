const User = require("../models/user.model.js");
const Question = require("../models/questions.model.js");

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

exports.Request = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Question.Request(req.body, req.files, function(err, result) {
    if(result.length==0) return res.json({status:false});
    else return res.json({status:true, result:result});
  });
}

exports.fetchResponse = async (req, res) => {
  var results = [];
  var data = await Question.fetchResponse();
  for(var i=0;i<data.length;i++) {
    let item = await Question.getReplies(data[i].id);
    let itemObj = {
      question:data[i],
      replies: item
    };
    results.push(itemObj);
  }
  res.json({status:true, result:results})
}

exports.downloadFile = async (req, res) => {
  Question.downloadFile(req.params.id, function(err, result) {
    res.download(`server/uploads/${result[0].attached_file}`);
  });
}

exports.submitResponse = async (req, res) => {
  Question.submitResponse(req.body, function(err, result) {
    if(err) return res.json({status:false});
    else return res.json({ status:true, result:result });
  });
}
exports.getUser = async (req, res) => {
  User.getUser(req.params, function(err, result) {
    if(err) return res.json({status:false});
    else return res.json({ status:true, result:result });
  });
}