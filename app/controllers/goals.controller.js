const Customer = require("../models/goals.model.js");
const substrings = require("substrings");
var mysql = require('mysql');
var jsonxml = require('jsontoxml');
var convert = require('xml-js');
const axios = require('axios');
var fs = require('fs');
const { ECONNABORTED } = require("constants");
const dbConfig = require("../config/db.config.js");
const sql = require("../models/db.js");

exports.getmastergoaldata = (req, res) => {

  Customer.getmastergoaldata(req.body, (err, data) => {
    res.send(data);
    return;
  });

};

exports.getusergoaldata = (req, res) => {
  let ash_data1 = ''
  let errflag1 = 0
  if (req.body.email === undefined || req.body.email == '') {
    ash_data1 = " email: feild is required";
    errflag1 = 1;
    console.log(req.body.email);
  }
  if (errflag1 === 0) {
    Customer.getusergoaldata(req.body, (err, data) => {
      res.send(data);
      return;
    });
  } else {
    console.log(" vvvvvvvvvvvvvv v111111111111111111");
    res.json({ status: 200, message: ash_data1, data11: "Validation Error" });
    return;
  };
};

exports.savegoal = (req, res) => {
  // Validate request
  // console.log(req.body);
  // return;   

  let ash_data = {}
  let errflag = 0
  if (req.body.Email === undefined || req.body.Email == '') {

    ash_data.Email = " Email: feild is required";
    errflag = 1;
    // console.log(" branch: feild is required");

  } if (req.body.Goal_Id === undefined || req.body.Goal_Id == '') {
    ash_data.Goal_Id = " Goal_Id: feild is required";
    errflag = 1;

    //console.log(" ifsc: feild is required");

  } if (req.body.Tenure === undefined || req.body.Tenure == '') {
    ash_data.Tenure = " Tenure: feild is required";
    errflag = 1;

    //console.log(" ifsc: feild is required");
  } if (req.body.Purchase_Cost === undefined || req.body.Purchase_Cost == '') {
    ash_data.Purchase_Cost = " Purchase_Cost: feild is required";
    errflag = 1;
    // console.log(" email: feild is required");
  }


  if (errflag === 0) {
    Customer.saveusergoaldata(req.body, (err, data) => {
      //  console.log(req.body.name);
      res.send(data);
      return;
    });
  } else {
    console.log(" vvvvvvvvvvvvvv v111111111111111111");
    res.json({ status: 200, message: ash_data, data11: "Validation Error" });
    return;
    // res.send(data); 
  }


};

exports.deleteusergoal = (req, res) => {
  console.log("start")
  console.log(req.body.goal_userId)
  const postarray = {
    goal_userId: req.body.goal_userId
  }
  Customer.deleteusergoal(postarray.goal_userId, (err, data) => {

    res.send(data);
    return;

  });
};
