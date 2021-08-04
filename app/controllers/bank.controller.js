const Customer = require("../models/bank.model.js");
const substrings = require("../../node_modules/substrings");
// const substr = require("../../node_modules/substr");
//  const parser = require('../../node_modules/xml2json');
//onst https = require('../../node_modules/https');
var mysql = require('../../node_modules/mysql');
//var jsonxml  = require('../../node_modules/xml2js');
var jsonxml = require('../../node_modules/jsontoxml');
var convert = require('../../node_modules/xml-js');
//
const axios = require('../../node_modules/axios');

var fs = require('fs');
const { ECONNABORTED } = require("constants");
const dbConfig = require("../config/db.config.js");
const sql = require("../models/db.js");



exports.getUserDetails = (req, res) => {
  //console.log(req.body)
  // return;
  let ash_data1 = ''
  let errflag1 = 0
  if (req.body.email === undefined || req.body.email == '') {
    ash_data1 = " email: feild is required";
    errflag1 = 1;
    console.log(req.body.email);
  }
  if (errflag1 === 0) {
    Customer.getUserDetails(req.body, (err, data) => {
      res.send(data);
      return;
    });
  } else {
    console.log(" vvvvvvvvvvvvvv v111111111111111111");
    res.json({ status: 200, message: ash_data1, data11: "Validation Error" });
    return;
  };
};


exports.changePbank = (req, res) => {
  //console.log(linkvar)
  console.log("")
  const postarray = {
    email: req.body.email,
    bank_id: req.body.bank_id
  }
  Customer.change_bank(postarray.email, postarray.bank_id, (err, data) => {



    res.send(data);
    return;

  });
};
//////////////////////////////////////////////////////////////////////////
exports.deletebank = (req, res) => {
  //console.log(linkvar)
  console.log("")
  const postarray = {
    email: req.body.email,
    bank_id: req.body.bank_id
  }
  Customer.delete_bank(postarray.email, postarray.bank_id, (err, data) => {

    res.send(data);
    return;

  });
};


exports.showDetails = (req, res) => {
  //console.log(req.body)
  // return;
  let ash_data1 = ''
  let errflag1 = 0
  if (req.body.email === undefined || req.body.email == '') {
    ash_data1 = " email: feild is required";
    errflag1 = 1;
    // console.log(" email: feild is required");
  }
  if (errflag1 === 0) {
    Customer.findByemailide(req.body, (err, data) => {
      res.send(data);
      return;
    });
  } else {
    console.log(" vvvvvvvvvvvvvv v111111111111111111");
    res.json({ status: 200, message: ash_data1, data11: "Validation Error" });
    return;
  };
};


exports.addBankDetail = (req, res) => {
  // Validate request
  // console.log(req.body);
  // return;   

  let ash_data = {}
  let errflag = 0
  if (req.body.name === undefined || req.body.name == '') {

    ash_data.name = " name: feild is required";
    errflag = 1;

    // console.log(" name: feild is required");        
  } if (req.body.accountno === undefined || req.body.accountno == '') {

    ash_data.accountno = " accountno: feild is required";
    errflag = 1;

    // console.log(" accountno: feild is required");
  } if (req.body.account_type === undefined || req.body.account_type == '') {

    ash_data.account_type = " account_type: feild is required";
    errflag = 1;

    // console.log(" accountno: feild is required");
  } if (req.body.branch === undefined || req.body.branch == '') {

    ash_data.branch = " branch: feild is required";
    errflag = 1;
    // console.log(" branch: feild is required");

  } if (req.body.ifsc === undefined || req.body.ifsc == '') {
    ash_data.ifsc = " ifsc: feild is required";
    errflag = 1;

    //console.log(" ifsc: feild is required");

  } if (req.body.bank_code === undefined || req.body.bank_code == '') {
    ash_data.bank_code = " bank_code: feild is required";
    errflag = 1;

    //console.log(" ifsc: feild is required");
  } if (req.body.email === undefined || req.body.email == '') {
    ash_data.email = " email: feild is required";
    errflag = 1;
    // console.log(" email: feild is required");
  }


  if (errflag === 0) {
    Customer.m_addBankDetail(req.body, (err, data) => {
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

////////////////////////////////

exports.findAllProducts = (req, res) => {
  console.log("all products will be listed here")

  const postarray = {

    AMC_CODE: req.body.AMC_CODE,
    ASSET_CLASS: req.body.ASSET_CLASS,
    REINVEST_TAG: req.body.REINVEST_TAG,
    DIV_GW: req.body.DIV_GW
  }

  Customer.getAllProducts(postarray, (err, data) => {



    //  Customer.getAllProducts(req.params.ProductId,(err, data)=>{
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while"
      })

    else {
      // console.log(data)
      cking = {
        status: "200",
        message: "Successfully",
        data_count: data.data_count,
        data: data.data_result,
        data_query: data.data_query


      }


      res.send(cking)

    }

    //   console.log("Last - Line 1080",req.body.ProductId)
    // console.log("Last - Line 1080",req)
  })
}

////////////////////////////////////////////////////////////

exports.bankverify = (req, res) => {
  console.log("hi agam dear! kaise hosss?")

  //  console.log("the form data is", req.body.beneficiaryName)
  const postarray = {
    merchant_id: req.body.merchantId,
    auth_token: req.body.Authorization,
  }
  let data = req.body;
  //  console.log("the form data is", data.beneficiaryAccount)


  if (data.beneficiaryAccount != "" && data.beneficiaryIFSC != "" && data.beneficiaryName != "" && data.beneficiaryMobile != "") {

    let json_data1 = {
      "merchantId": postarray.merchant_id,//"5f819ad1ad96f68826a46c56",
      "inputData": {
        "service": "nonRoc",
        "type": "bankaccountverifications",
        "task": "bankTransfer",
        "data": {
          "images": '',
          "toVerifyData": '',
          "searchParam": {
            "beneficiaryAccount": data.beneficiaryAccount,
            "beneficiaryIFSC": data.beneficiaryIFSC,
            "beneficiaryName": data.beneficiaryName,
            "beneficiaryMobile": data.beneficiaryMobile
          }
        }
      }
    }

    console.log("SharukhKhan", json_data1.inputData.data.searchParam)

    let json_data2 = {
      "email": "testing21@gmail.com"
    }


    // console.log(json_data.inputData.data);
    let jik1 = 'https://multi-channel.signzy.tech/api/onboardings/execute';
    let jik2 = 'https://prodigy-agam.herokuapp.com/readFatca1';

    axios.post(jik1,
      json_data1,
      {
        headers:
        {
          'Authorization': postarray.auth_token,
          'Content-Type': 'application/json'
        }
      }).then(res2 => {

        var data1 = res2.data.object
        console.log("782 agam the o/p is newagam", data1)

        const textc = {
          'status': '200',
          'message': 'Successfully',
          'message_1': data1
        };
        res.send(textc)
        return


        /*  agammess= {
            status:200,
            message_0:'Success',            
            message: "hi agam"  
          }
          return res.status(200).json(agammess)  */


        // return res.json({
        //   success: 0,
        //   message: "Record  Found"
        // })


      });
  }

  else {

    let nodata = {
      'status': '200',
      'message': 'pls enter the required details',
    };
    res.send(nodata)
    return

  }




}


////////////////////////////////////////////////////////////

exports.bankverify2 = (req, res) => {
  console.log("bank verify  controller 2")

  let data = req.body;
  console.log("the form data is", data.signzyId)
  const postarray = {
    merchant_id: req.body.merchantId,
    auth_token: req.body.Authorization,
  }

  if (data.signzyId != "" && data.amount != "") {


    let json_data1 = {
      "merchantId": postarray.merchant_id,//"5f819ad1ad96f68826a46c56",
      "inputData": {
        "service": "nonRoc",
        "type": "bankaccountverifications",
        "task": "verifyAmount",
        "data": {
          "images": '',
          "toVerifyData": '',
          "searchParam": {
            "amount": data.amount,
            "signzyId": data.signzyId
          }
        }
      }
    }

    console.log("AmirKhan", json_data1.inputData.data.searchParam)

    let json_data2 = {
      "email": "testing21@gmail.com"
    }


    // console.log(json_data.inputData.data);
    let jik1 = 'https://multi-channel.signzy.tech/api/onboardings/execute';
    let jik2 = 'https://prodigy-agam.herokuapp.com/readFatca1';

    axios.post(jik1,
      json_data1,
      {
        headers:
        {
          'Authorization': postarray.auth_token,
          'Content-Type': 'application/json'
        }
      }).then(res3 => {

        var data1 = res3.data.object
        console.log("782 agam the o/p  bank 2 is new-agam", data1)

        const textc = {
          'status': '200',
          'message': 'Successfully',
          'message_1': data1
        };
        res.send(textc)
        return




        //   console.log("agam the o/p  bank 2 is ");
      }).catch(err => { console.log("the agam error bank 2 is ") });


  } else {

    let nodata2 = {
      'status': '200',
      'message': 'pls enter the signzyId or amount',
    };
    res.send(nodata2)
    return

  }

}//


/////////////////////////////

exports.findOne1users = (req, res) => {
  Customer.findByIdusers(req.params.emailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.emailId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.emailId
        });
      }
    } else {

      //      {"id":1,"name":"ajay","user_id":"","email":"akmaurya31@gmail.com","pin":0,"phone":"9616118873","email_verified_at":null,"password":"$2y$10$PRNuNEtQfJoCnJ.yoM9y/uYHft5YfIUGKalyF3UqBUGBcpb6JvZDy","role":2,"profile_pic":null,"address":"Lucknow","locallity":"bfc","pincode":226010,"country":101,"state":"Utter paradesh","city":"Lucknow","date_of_birrth":"1995-03-03T00:00:00.000Z","father_name":"MrLalji Mauray","mother_name":"N","gender":"2","material_status":1,"birth_palce":"lucknow","occupation":3,"income_range":1,"resident_status":"1","othertaxpayer":null,"exposedPolitically":null,"taxIdentificationNo":"12346097653","taxcountry":null,"identificationType":"commercial","signature":"public/uploads/signature/159860911077579.jpg","remember_token":"rnAc63UZGO","created_at":"2020-07-30T06:28:32.000Z","updated_at":"2020-09-17T20:48:46.000Z","otp":0,"status":1,"pan_card":"dtyrrt","social_id":"","address_proof":null,"iin":"","ID_NUMBER":""}


      var dated = data.date_of_birrth;

      var dd = String(dated.getDate()).padStart(2, '0');
      var mmm = String(dated.getMonth() + 1).padStart(2, '0');
      var yyyy = dated.getFullYear();

      var nefodate = dd + "-" + mmm + "-" + yyyy;
      var frmt_dob1 = { "date_of_birth": nefodate };

      const assign_dob_in_data = Object.assign(data, frmt_dob1);
      const textc = { 'message': 'Successfully', 'status': '200', 'data': data };
      res.send(textc);
    }
  });
};

//////////////////////////

// Retrieve all Customers from the database.
exports.getnsebank = (req, res) => {
  Customer.getAllnsebank((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred w1111hile retrieving customers."
      });
    else {

      const textc = { 'message': 'Successfully', 'status': '200', 'data': data };
      res.send(textc);

      // res.send(data); 

    }
  });
};



