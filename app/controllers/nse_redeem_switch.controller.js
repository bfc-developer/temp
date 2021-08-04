const Customer = require("../models/nse_redeem_switch.model.js");
const substrings = require("../../node_modules/substrings");
// const substr = require("../../node_modules/substr");
//  const parser = require('../../node_modules/xml2json');
//onst https = require('../../node_modules/https');
var mysql = require('../../node_modules/mysql');
//var jsonxml  = require('../../node_modules/xml2js');
var jsonxml = require('../../node_modules/jsontoxml');
var convert = require('../../node_modules/xml-js');

const axios = require('../../node_modules/axios');

var fs = require('fs');
const { ECONNABORTED } = require("constants");
const dbConfig = require("../config/db.config.js");
const sql = require("../models/db.js");



////////////////
exports.redeem = (req, res) => {
  console.log("redeemption API")
  const postarray = {
    email: req.body.email,

    trxn_acceptance: req.body.trxn_acceptance,
    amc: req.body.amc,
    product_code: req.body.product_code,
    amt_unit: req.body.amt_unit,
    input_ref_no: req.body.input_ref_no,

    remark: req.body.remark,
    folio: req.body.folio,
    amt_unit_type: req.body.amt_unit_type,
    all_units: req.body.all_units,
    input_ref_no: req.body.input_ref_no,

  }
  // return;
  Customer.redeem(postarray.email, (err, data) => {

    if (data != null) {
      if (!Array.isArray(data) || !data.length) {
        return res.json({
          success: 200,
          message: "Bank Data not Found in user table"
        });
      }
    }

    let urs = data[0]
    let resdatemy = String(urs.date_of_birrth);
    let resaccountNomy = urs.accountNo;
    //console.log("res line 844",urs.bank_code);
    //return
    let xb = resdatemy.split(" ");
    let mydob_xb = xb[2] + "-" + xb[1] + "-" + xb[3]
    let pep = (urs.exposedPolitically == '1') ? "N" : "Y";
    //console.log("res line 844",urs);
    //return
    //Customer.perchase_normal((err, data) => {

    let ash_arrk = {
      NMFIIService: {
        service_request: {
          appln_id: "MFS21399",
          password: "CO3062WOJ1RPXM19",
          broker_code: "ARN-21399",
          iin: urs.iin,//db
          poa: "N",
          poa_bank_trxn_type: "",
          trxn_acceptance: postarray.trxn_acceptance,//app
          dp_id: [],
          acc_no: resaccountNomy,//db
          bank_name: urs.bank_code,//db
          ifsc_code: urs.fscode,//db
          remarks: postarray.remark,//app
          iin_conf_flag: "N",
          trxn_initiator: "O",
          trans_count: "1",
          investor_auth_log: []
        },
        "childtrans": {
          amc: postarray.amc,//app
          folio: postarray.folio,//app
          product_code: postarray.product_code,//app   
          ft_acc_no: [],
          amt_unit_type: postarray.amt_unit_type,//app
          amt_unit: postarray.amt_unit,//app
          all_units: postarray.all_units,//app
          input_ref_no: postarray.input_ref_no//app

        }
      }//service_request
    } //NMFIIService
    //else

    //testing
    let ash_arrkk =
    {
      NMFIIService:
      {
        service_request:
        {
          appln_id: 'MFS21399',
          password: 'Account@2121',
          broker_code: 'ARN-21399',
          iin: '5011221080',
          poa: 'N',
          poa_bank_trxn_type: 'NDCPMS',
          trxn_acceptance: 'OL',
          dp_id: [],
          acc_no: '037010100256352',
          bank_name: 'AXIS',
          ifsc_code: 'UTIB0000037',
          remarks: 'test',
          iin_conf_flag: 'Y',
          trxn_initiator: 'I / O',
          trans_count: '1',
          investor_auth_log: []
        },
        childtrans:
        {
          amc: 'G',
          folio: '2089910703442',
          product_code: '169',
          ft_acc_no: [],
          amt_unit_type: 'Amount',
          amt_unit: "1000",
          all_units: 'N',
          input_ref_no: '52521'
        }
      }
    }


    console.log(ash_arrk);

    let ash_xml_agamji = jsonxml(ash_arrk);
    console.log(ash_xml_agamji);
    //return
    let msg = "";

    // console.log(ash_xml_agamji);
    axios.post('https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/REDEEMTRXN',
      //axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/PURCHASETRXN',
      ash_xml_agamji,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res22 => {
        //console.log("C- Output XML - Line 946", res22)  
        //return

        let result1 = convert.xml2js(res22.data, { compact: true, spaces: 4 });
        let fatcaresult = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
        let fatcaresult2 = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;
        //  console.log("C- Output XML - Line 950", result1)
        //  console.log("C- Output XML - Line 951", fatcaresult)
        //  console.log("C- Output XML - Line 956", fatcaresult2)
        //console.log("i am cool 880");
        //var gi=typeof fatcaresult2[0].return_msg;
        //console.log("c- 881- ", gi);

        let newdata0 = fatcaresult2[0];
        let newdata0_0 = fatcaresult2[1];
        let adddata1 = "";
        let adddata2 = "";

        if (typeof newdata0 !== "undefined" || typeof newdata0_0 !== "undefined") {
          let newdata1 = fatcaresult2[0].return_msg;
          let newdata2 = fatcaresult2[1].return_msg;

          let newdata3 = fatcaresult2[0].Status_Desc;
          let newdata4 = fatcaresult2[1].Status_Desc;
          if (typeof newdata1 !== "undefined" || typeof newdata2 !== "undefined") {
            adddata1 = fatcaresult2[0].return_msg._text
            adddata2 = fatcaresult2[1].return_msg._text

          } else if (typeof newdata3 !== "undefined" || typeof newdata4 !== "undefined") {
            adddata1 = fatcaresult2[0].Status_Desc._text
            adddata2 = fatcaresult2[1].Status_Desc._text
          } else {
            adddata1 = "";
            adddata2 = "";

          }
        }


        // return
        if (fatcaresult == 0) {
          console.log("C- Output XML - Unique_No:", fatcaresult2.Unique_No._text)
          console.log("C- Output XML - Trxn_No:", fatcaresult2.Trxn_No._text)
          console.log("C- Output XML - Application_No:", fatcaresult2.Application_No._text)
          console.log("C- Output XML - Fund:", fatcaresult2.Fund._text)
          console.log("C- Output XML - Scheme:", fatcaresult2.Scheme._text)
          console.log("C- Output XML - Scheme_Name:", fatcaresult2.Scheme_Name._text)
          console.log("C- Output XML - Amt:", fatcaresult2.Amt._text)
          console.log("C- Output XML - Amt:", fatcaresult2.Folio._text)
          console.log("C- Output XML - Link:", fatcaresult2.Amt_Unit_Type._text)


          ashdata1 = fatcaresult2.Unique_No._text;
          ashdata2 = fatcaresult2.Trxn_No._text;
          ashdata3 = fatcaresult2.Application_No._text;
          ashdata4 = fatcaresult2.Fund._text;
          ashdata5 = fatcaresult2.Scheme._text;
          ashdata6 = fatcaresult2.Scheme_Name._text;
          ashdata7 = fatcaresult2.Amt._text;
          ashdata8 = fatcaresult2.Status_Desc._text;
          ashdata9 = fatcaresult2.Status_code._text;
          ashdata10 = fatcaresult2.Input_ref_no._text;
          ashdata11 = fatcaresult2.Folio._text;
          ashdata12 = fatcaresult2.Amt_Unit_Type._text;
        }
        else {

          if (Array.isArray(fatcaresult2) && fatcaresult2.length) {
            fatcaresult2.forEach(element => {
              console.log(element.return_msg._text);
              msg = msg + element.return_msg._text + '||';
            });
            //console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
            //console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
          }
        }

        let agmess = '';

        if (fatcaresult == 0) {
          agmess = {
            status: 200,
            message: 'Successfull',
            data: {
              "Unique_No": ashdata1,
              "Trxn_No": ashdata2,
              "Application_No": ashdata3,
              "Fund": ashdata4,
              "Scheme": ashdata5,
              "Scheme_Name": ashdata6,
              "Amt": ashdata7,
              "Status_Desc": ashdata8,
              "Status_code": ashdata9,
              "Input_ref_no": ashdata10,
              "Folio": ashdata11,
              "Amt_Unit_Type": ashdata12,
            },


            //fatcaresult2.Paymentlink._text.substring(9,fatcaresult2.Paymentlink._text.length-4).InnerHtnl
            message_full: fatcaresult2,
          }
        } else {
          agmess = {
            status: 400,
            message: msg,
            message_full: fatcaresult2,
          }
        }
        return res.status(200).json(agmess)
      }).catch(err => { console.log(err) });
    console.log("res last line ");



  });
};


exports.switch = (req, res) => {
  console.log("purchase")
  const postarray = {
    email: req.body.email,

    trxn_acceptance: req.body.trxn_acceptance,
    amc: req.body.amc,
    product_code: req.body.product_code,
    amt_unit: req.body.amt_unit,
    input_ref_no: req.body.input_ref_no,

    remark: req.body.remark,
    folio: req.body.folio,
    amt_unit_type: req.body.amt_unit_type,
    all_units: req.body.all_units,
    input_ref_no: req.body.input_ref_no,

    trxn_execution: req.body.trxn_execution,
    target_product_code: req.body.target_product_code,
    target_ft_acc_no: req.body.target_ft_acc_no,
    reinvest: req.body.reinvest,

  }
  // return;
  Customer.switch(postarray.email, (err, data) => {

    if (data != null) {
      if (!Array.isArray(data) || !data.length) {
        return res.json({
          success: 200,
          message: "Bank Data not Found in user table"
        });
      }
    }

    let urs = data[0]
    let resdatemy = String(urs.date_of_birrth);
    let resaccountNomy = urs.accountNo;
    //console.log("res line 844",urs.bank_code);
    //return
    let xb = resdatemy.split(" ");
    let mydob_xb = xb[2] + "-" + xb[1] + "-" + xb[3]
    let pep = (urs.exposedPolitically == '1') ? "N" : "Y";
    //console.log("res line 844",urs);
    //return
    //Customer.perchase_normal((err, data) => {

    let ash_arrk = {
      NMFIIService: {
        service_request: {
          appln_id: "MFS21399",
          password: "CO3062WOJ1RPXM19",
          broker_code: "ARN-21399",
          iin: urs.iin,//db
          poa: "N",
          poa_bank_trxn_type: [],
          trxn_acceptance: postarray.trxn_acceptance,//app
          dp_id: [],

          sub_broker_arn_code: [],
          sub_broker_code: [],//s
          euin_opted: "Y",//s
          euin: "E073161",//s
          trxn_execution: postarray.trxn_execution,//app

          remarks: postarray.remark,//app
          iin_conf_flag: "Y",
          trxn_initiator: "0",
          trans_count: "1",
          investor_auth_log: []
        },
        "childtrans": {
          amc: postarray.amc,//app
          folio: postarray.folio,//app
          source_product_code: postarray.product_code,//app

          source_ft_acc_no: [],//s
          target_product_code: postarray.target_product_code,//app
          target_ft_acc_no: postarray.target_ft_acc_no,//app
          reinvest: postarray.reinvest,//app

          amt_unit_type: postarray.amt_unit_type,//app
          amt_unit: postarray.amt_unit,//app
          all_units: postarray.all_units,//app
          input_ref_no: postarray.input_ref_no//app

        }
      }//service_request
    } //NMFIIService


    console.log(ash_arrk);

    let ash_xml_agamji = jsonxml(ash_arrk);
    console.log(ash_xml_agamji);
    //return
    let msg = "";

    // console.log(ash_xml_agamji);
    axios.post('https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/SWITCHTRXN',
      //axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/PURCHASETRXN',
      ash_xml_agamji,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res22 => {
        //console.log("C- Output XML - Line 946", res22)
        //return

        let result1 = convert.xml2js(res22.data, { compact: true, spaces: 4 });
        let fatcaresult = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
        let fatcaresult2 = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;
        // console.log("C- Output XML - Line 950", result1)
        // console.log("C- Output XML - Line 951", fatcaresult)
        // console.log("C- Output XML - Line 956", fatcaresult2)
        //console.log("i am cool 880");
        //var gi=typeof fatcaresult2[0].return_msg;
        //console.log("c- 881- ", gi);

        let newdata0 = fatcaresult2[0];
        let newdata0_0 = fatcaresult2[1];
        let adddata1 = "";
        let adddata2 = "";

        if (typeof newdata0 !== "undefined" || typeof newdata0_0 !== "undefined") {
          let newdata1 = fatcaresult2[0].return_msg;
          let newdata2 = fatcaresult2[1].return_msg;

          let newdata3 = fatcaresult2[0].Status_Desc;
          let newdata4 = fatcaresult2[1].Status_Desc;
          if (typeof newdata1 !== "undefined" || typeof newdata2 !== "undefined") {
            adddata1 = fatcaresult2[0].return_msg._text
            adddata2 = fatcaresult2[1].return_msg._text

          } else if (typeof newdata3 !== "undefined" || typeof newdata4 !== "undefined") {
            adddata1 = fatcaresult2[0].Status_Desc._text
            adddata2 = fatcaresult2[1].Status_Desc._text
          } else {
            adddata1 = "";
            adddata2 = "";

          }
        }
        // return
        if (fatcaresult == 0) {
          console.log("C- Output XML - Unique_No:", fatcaresult2.Unique_No._text)
          console.log("C- Output XML - Trxn_No:", fatcaresult2.Trxn_No._text)
          console.log("C- Output XML - Application_No:", fatcaresult2.Application_No._text)
          console.log("C- Output XML - Fund:", fatcaresult2.Fund._text)
          console.log("C- Output XML - Amt:", fatcaresult2.Amt._text)


          ashdata1 = fatcaresult2.Unique_No._text;
          ashdata2 = fatcaresult2.Trxn_No._text;
          ashdata3 = fatcaresult2.Application_No._text;
          ashdata4 = fatcaresult2.Fund._text;
          ashdata7 = fatcaresult2.Amt._text;
          ashdata8 = fatcaresult2.Status_Desc._text;
          ashdata9 = fatcaresult2.Status_code._text;
          ashdata10 = fatcaresult2.Input_ref_no._text;
          ashdata11 = fatcaresult2.Folio._text;
          ashdata12 = fatcaresult2.Target_Scheme._text;
          ashdata13 = fatcaresult2.Source_Scheme_Name._text;
          ashdata14 = fatcaresult2.Target_Scheme_Name._text;
          ashdata15 = fatcaresult2.Amt_Unit_Type._text;
          trxn_acceptance = postarray.trxn_execution;
          amc = postarray.amc;
          product_code = postarray.product_code;
          reinvest = postarray.reinvest;
          input_ref_no = postarray.input_ref_no;

          console.log(fatcaresult2);

          // let sql_purchase = `INSERT INTO purchase (user_id, Unique_No, Trxn_No, Application_No, Fund, Scheme, Scheme_Name, Amount,Input_ref_no,Target_Scheme,Source_Scheme_Name,Target_Scheme_Name,Amt_Unit_Type, trxn_acceptance, amc, product_code, reinvest, input_ref_no, folio) VALUES ('${userdata1}', '${ashdata1}','${ashdata2}','${ashdata3}','${ashdata4}','${ashdata5}','${ashdata6}','${userdata18}','S','${userdata3}','${userdata4}','${userdata5}','${userdata6}','${userdata7}','${userdata8}','${userdata9}','${userdata10}','${userdata11}','${userdata12}','${userdata13}','${userdata14}','${userdata15}','${userdata16}','${userdata17}','${userdata19}','${ userdata20}','${userdata21}','${userdata22}','${userdata23}','${userdata24}','${userdata25}','${ userdata26}','${userdata27}','${userdata28}','${userdata29}')`;

          // sql.query(sql_purchase, function (err, resvv) {
          // console.log(sql_purchase,resvv);
          // console.log("Data Saved:",resvv);

          // result(null,{ status:200, message:"Data Saved:", data:resvv });

          //});
          // }

        }
        else {

          if (Array.isArray(fatcaresult2) && fatcaresult2.length) {
            fatcaresult2.forEach(element => {
              console.log(element.return_msg._text);
              msg = msg + element.return_msg._text + '||';
            });
            //console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
            //console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
          }
        }


        let agmess = '';

        if (fatcaresult == 0) {
          agmess = {
            status: 200,
            message: 'Successfull',
            data: {
              "Unique_No": ashdata1,
              "Trxn_No": ashdata2,
              "Application_No": ashdata3,
              "Fund": ashdata4,
              "Amt": ashdata7,
              "Status_Desc": ashdata8,
              "Status_code": ashdata9,
              "Input_ref_no": ashdata10,
              "Folio": ashdata11,
              "Target_Scheme": ashdata12,
              "Source_Scheme_Name": ashdata13,
              "Target_Scheme_Name": ashdata14,
              "Amt_Unit_Type": ashdata15,
            },

            message_full: fatcaresult2,
          }
        } else {
          agmess = {
            status: 400,
            message: msg,
            message_full: fatcaresult2,
          }
        }
        return res.status(200).json(agmess)
      }).catch(err => { console.log(err) });
    console.log("res last line 829");



  });
};