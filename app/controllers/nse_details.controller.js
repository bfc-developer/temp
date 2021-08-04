const Customer = require("../models/nse_details.model.js");
const substrings = require("../../node_modules/substrings");
var mysql = require('../../node_modules/mysql');
var jsonxml = require('../../node_modules/jsontoxml');
var convert = require('../../node_modules/xml-js');
const axios = require('../../node_modules/axios');
var fs = require('fs');
const { ECONNABORTED } = require("constants");
const dbConfig = require("../config/db.config.js");
const sql = require("../models/db.js");



exports.mandate = (req, res) => {
  console.log("mandate")
  const postarray = {
    email: req.body.email,
    acc_type: req.body.acc_type,
    ach_amt: req.body.ach_amount,
    ach_fromdate: req.body.ach_fromdate,
    ach_todate: req.body.ach_todate,
    process_mode: req.body.process_mode,
    client_callback_url: req.body.client_callback_url,
    channel_type: req.body.channel_type,
  }
  // return;
  Customer.mandate_normal(postarray.email, (err, data) => {

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
    console.log("res line 844", urs.bank_code);
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

          appln_id: 'MFS21399',
          password: 'CO3062WOJ1RPXM19',
          broker_code: 'ARN-21399',
          iin: urs.iin,
          ifsc_code: urs.fscode,//db
          bank_name: urs.bank_code,
          acc_no: resaccountNomy,//db
          acc_type: urs.acount_type,
          branch_name: urs.branch,
          micr_no: [],
          uc: 'Y',
          ach_fromdate: postarray.ach_fromdate,//db
          ach_todate: postarray.ach_todate,//db
          ach_amount: postarray.ach_amt,//db
          Bank_holder_name: urs.name,//db
          Bank_holder_name1: [],
          Bank_holder_name2: [],
          process_mode: postarray.process_mode,
          channel_type: postarray.channel_type,
          return_flag: 'Y',
          Existing_Bank: 'Y',
          client_callback_url: postarray.client_callback_url,
        }//service_request
      } //NMFIIService
    } //else




    console.log(ash_arrk);
    let ash_xml_agamji = jsonxml(ash_arrk);
    // console.log(ash_xml_agamji);


    //console.log(ash_xml_agamji);
    axios.post('https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/ACHMANDATEREGISTRATIONS',
      ash_xml_agamji,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res22 => {
        console.log("C- Output XML - Line 946", res22)


        let result1 = convert.xml2js(res22.data, { compact: true, spaces: 4 });
        let fatcaresult = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
        let fatcaresult2 = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;
        //  console.log("C- Output XML - Line 950", result1)
        //   console.log("C- Output XML - Line 951", fatcaresult)
        //  console.log("C- Output XML - Line 956", fatcaresult2)
        //console.log("i am cool 880");
        //var gi=typeof fatcaresult2[0].return_msg;
        //console.log("c- 881- ", gi);

        let newdata0 = fatcaresult2[0];
        let newdata0_0 = fatcaresult2[1];
        let adddata1 = "";
        let adddata2 = "";
        let msg = "";

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

        if (fatcaresult == 0) {
          //console.log("ashC- Output XML - Link:789");          
          console.log("C- Output XML - Unique_No:", fatcaresult2.Unique_No._text)
          console.log("C- Output XML - Status_Desc:", fatcaresult2.Status_Desc._text)
          console.log("C- Output XML - eMandatelink:", fatcaresult2.eMandatelink._text)

          //   link_var='';
          //   if (typeof fatcaresult2.Paymentlink !== 'undefined' && fatcaresult2.Paymentlink._text !== null){
          //   console.log("C- Output XML - Link:", fatcaresult2.Paymentlink._text)
          //   link_var=fatcaresult2.Paymentlink._text;
          //  }
          //	console.log("C- Output XML - Line 960", fatcaresult2[6].return_msg._text)
          //console.log("C- Output XML - Line 960", fatcaresult2[7].return_msg._text)
          userdata = urs.uid;

          userdata1 = postarray.process_mode;
          userdata2 = postarray.ach_amt;
          userdata3 = postarray.ach_fromdate;
          userdata4 = postarray.client_callback_url;
          userdata5 = postarray.ach_todate;
          ifsc_code = urs.fscode;
          acc_no = resaccountNomy;
          channel_type = postarray.channel_type;

          ashdata1 = fatcaresult2.Unique_No._text;
          ashdata2 = fatcaresult2.Status_Desc._text;
          ashdata3 = fatcaresult2.eMandatelink._text;




          // let sql_purchase = `INSERT INTO mandate (user_id, Unique_No,Status_Desc,eMandatelink, ifsc_code, acc_no, channel_type, ach_amt, process_mode, Client_callback_url, ach_fromdate, ach_todate) VALUES  ('${userdata}', '${ashdata1}','${ashdata2}','${ashdata3}','${ifsc_code}','${acc_no}','${channel_type}','${userdata2}','${userdata1}','${userdata4}','${userdata3}','${userdata5}')`;

          // sql.query(sql_purchase, function (err, resvv) {
          //   console.log(sql_purchase, resvv);
          //   console.log("Data Saved:", resvv);
          //   //result(null,{ status:200, message:"Data Saved:",  data:resvv });

          // });


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
          else {
            console.log("ashC- Output XML - Link:827");
            if (typeof fatcaresult2.return_msg !== "undefined" && fatcaresult2.return_msg._text !== null) {
              console.log(fatcaresult2.return_msg._text);
              msg = fatcaresult2.return_msg._text;
            }
            //console.log(fatcaresult2.Status_Desc._text); 
            // msg=fatcaresult2.Status_Desc._text;
            if (typeof fatcaresult2.Status_Desc !== "undefined" && fatcaresult2.Status_Desc._text !== null) {
              console.log(fatcaresult2.Status_Desc._text);
              msg = fatcaresult2.Status_Desc._text;

            }
          }
          //console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
          //console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
        }


        let agmess = '';

        if (fatcaresult == 0) {
          agmess = {
            status: 200,
            message: 'Successfull',
            data: { "Unique_No": ashdata1, "Status_Desc": ashdata2, "eMandatelink": ashdata3, },
            message_full: fatcaresult2,
          }
        } else {
          agmess = {
            status: 400,
            message: msg,
            // message_1: fatcaresult2,               
            //data:  msg,
            //"1": ashdata2 ,"2": ashdata3, "3": ashdata4,"4": ashdata5, "5": ashdata6, "6": ashdata7},              
            //message_third_api:'FAILED',
            message_full: fatcaresult2,
          }
        }
        return res.status(200).json(agmess)
      }).catch(err => { console.log(err) });
    console.log("res last line 829");



  });
};

exports.cronjobproductinsertion = (req, res) => {

  axios.get('https://uat.nsenmf.com/NMFIIService/NMFService/product?BrokerCode=ARN-21399&Appln_Id=MFS21399&Password=Account@2121',
    {
      headers:
        { 'Content-Type': 'text/xml' }
    }).then(res22 => {
      //console.log("C- Output XML - Line 946", res22)  


      let result1 = convert.xml2js(res22.data, { compact: true, spaces: 4 });
      var productarray = result1.DataSet['diffgr:diffgram'].NewDataSet.product_master;

      // //      var mysql = require('mysql');
      // //  var con = mysql.createConnection({
      // //  host: "localhost",
      // //  user: "root",
      // //  password: "",
      // //  database: "test"
      // // // host: "5.181.218.103",
      // // //user: "u457285024_root",
      // // //password: "FGzrQ$2n",
      // // //database: "u457285024_test"

      // // //HOST: "162.215.252.35",
      // //  // USER: "trishffe_prodigy",
      // //   //PASSWORD: "C@ZpF^MB_D2M",
      // //  // DATABASE: "trishffe_prodigy_db"
      // // });
      // //      con.connect(function(err) {
      // //       if (err) throw err;
      // //       console.log("Connected!");
      // //     });
      // //    // return
      // //      con.query("delete from product_new", function (err, result) {
      // //     if (err) throw err;
      // //          });

      // sql.query("delete from product_new", function (err, resvd) {
      //   console.log("Data Deleted:", resvd);
      // });

      var inc = 0;

      productarray.forEach(function (item) {

        var temp1 = item._attributes["diffgr:id"];
        var temp2 = item._attributes["msdata:rowOrder"];
        //console.log(temp1);  
        var temp3 = item.AMC_CODE._text;
        var temp4 = item.PRODUCT_CODE._text;
        var temp5 = item.PRODUCT_LONG_NAME._text;
        var temp6 = item.SYSTEMATIC_FREQUENCIES._text;
        var temp7 = item.SIP_DATES._text;
        var temp8 = item.STP_DATES._text;
        var temp8a = item.SWP_DATES._text;
        var temp9 = item.PURCHASE_ALLOWED._text;
        var temp10 = item.SWITCH_ALLOWED._text;
        var temp11 = item.REDEMPTION_ALLOWED._text;
        var temp12 = item.SIP_ALLOWED._text;
        var temp13 = item.STP_ALLOWED._text;
        var temp14 = item.SWP_ALLOWED._text;
        var temp15 = item.REINVEST_TAG._text;
        var temp16 = item.PRODUCT_CATEGORY._text;
        var temp17 = item.ISIN._text;
        var temp18 = item.LAST_MODIFIED_DATE._text;
        var temp19 = item.ACTIVE_FLAG._text;
        var temp20 = item.ASSET_CLASS._text;
        var temp21 = item.SUB_FUND_CODE._text;
        var temp22 = item.PLAN_TYPE._text;
        var temp23 = item.INSURANCE_ENABLED._text;
        var temp24 = item.RTACODE._text;
        var temp25 = item.NFO_ENABLED._text;
        var temp26 = item.NFO_CLOSE_DATE._text;
        var temp27 = item.NFO_SIP_EFFECTIVE_DATE._text;
        var temp28 = item.ALLOW_FREEDOM_SIP._text;
        var temp29 = item.ALLOW_FREEDOM_SWP._text;
        var temp30 = item.ALLOW_DONOR._text;
        var temp31 = item.ALLOW_PAUSE_SIP._text;
        var temp32 = item.ALLOW_PAUSE_SIP_FREQ._text;
        var temp33 = item.PAUSE_SIP_MIN_MONTH._text;
        var temp34 = item.PAUSE_SIP_MAX_MONTH._text;
        var temp35 = item.PAUSE_SIP_GAP_PERIOD._text;
        //return
        // var sql = "INSERT INTO cust_books (c_name) VALUES (?)"; 
        var sql_purchase = "INSERT INTO products (`product_master_diffgr_id`, `msdata_rowOrder`, `AMC_CODE`, `PRODUCT_CODE`, `PRODUCT_LONG_NAME`, `SYSTEMATIC_FREQUENCIES`, `SIP_DATES`, `STP_DATES`, `SWP_DATES`, `PURCHASE_ALLOWED`, `SWITCH_ALLOWED`, `REDEMPTION_ALLOWED`, `SIP_ALLOWED`, `STP_ALLOWED`, `SWP_ALLOWED`, `REINVEST_TAG`, `PRODUCT_CATEGORY`, `ISIN`, `LAST_MODIFIED_DATE`, `ACTIVE_FLAG`, `ASSET_CLASS`, `SUB_FUND_CODE`, `PLAN_TYPE`, `INSURANCE_ENABLED`, `RTACODE`, `NFO_ENABLED`, `NFO_CLOSE_DATE`, `NFO_SIP_EFFECTIVE_DATE`, `ALLOW_FREEDOM_SIP`, `ALLOW_FREEDOM_SWP`, `ALLOW_DONOR`, `ALLOW_PAUSE_SIP`, `ALLOW_PAUSE_SIP_FREQ`, `PAUSE_SIP_MIN_MONTH`, `PAUSE_SIP_MAX_MONTH`, `PAUSE_SIP_GAP_PERIOD`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let values = [temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8, temp8a, temp9, temp10, temp11, temp12, temp13, temp14, temp15, temp16, temp17, temp18, temp19, temp20, temp21, temp22, temp23, temp24, temp25, temp26, temp27, temp28, temp29, temp30, temp31, temp32, temp33, temp34, temp35];
        console.log(values);
        return
        // //  con.query(sql,values, function (err, result) {
        // // if (err) throw err;
        // // //console.log("Employee Id:- " + result.insertId);    

        // //   });


        sql.query(sql_purchase, values, function (err, resvv) {
          // console.log(sql_purchase,resvv);
          //   console.log("Data Saved:",resvv);

          // result(null,{ status:200, message:"Data Saved:",  data:resvv });

        });




        inc = inc++

      });



      console.log("res last line 354");
    }).catch(err => { console.log(err) });

}

//getMandateList API
exports.getmandatelist = (req, res) => {
  console.log("mandate")
  const postarray = {
    email: req.body.email,

  }
  // return;
  Customer.getmandatelist(postarray.email, (err, data) => {

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
    console.log("res line 844", urs.bank_code);
    //return
    let xb = resdatemy.split(" ");
    let mydob_xb = xb[2] + "-" + xb[1] + "-" + xb[3]
    let pep = (urs.exposedPolitically == '1') ? "N" : "Y";
 
    let ash_arrk = {
      NMFIIService: {
        service_request: {
          appln_id: 'MFS21399',
          password: 'CO3062WOJ1RPXM19',
          broker_code: 'ARN-21399',
          cust_id: urs.iin,
          ach_fromdate: [],
          ach_todate: []
        }
      } 
    } 


    console.log(ash_arrk);
    let ash_xml_agamji = jsonxml(ash_arrk);
    console.log(ash_xml_agamji);

    axios.post('https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/ACHMANDATEREPORT',
      ash_xml_agamji,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res22 => {
       
        let result1 = convert.xml2js(res22.data, { compact: true, spaces: 4 });
        let fatcaresult = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
        let fatcaresult2 = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;


        let newdata0 = fatcaresult2[0];
        let newdata0_0 = fatcaresult2[1];
        let adddata1 = "";
        let adddata2 = "";
        let msg = "";

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

        if (fatcaresult == 0) {

          userdata = urs.uid;
          console.log(userdata);

          var j = []; var msgash = ""; i = 1;

          var productarray = fatcaresult2;
          productarray.forEach(function (item) {
            var temp = item.ACH_MANDATE_STATUS._text;
            console.log(temp);
            if (temp == 'ACCEPTED') {
              var temp1 = item._attributes["diffgr:id"];
              var temp2 = item._attributes["msdata:rowOrder"];
              console.log(temp1);


              ashdata1 = item.INVESTOR_NAME._text;
              if (typeof item.MANDATE_ID._text !== "undefined") {
                ashdata2 = item.MANDATE_ID._text;
                console.log(item.MANDATE_ID._text);
              }
              else {
                ashdata2 = "";
              }

              ashdata3 = item.BANK_CODE._text;
              ashdata4 = item.BANK_NAME._text;
              ashdata5 = item.BRANCH._text;
              ashdata6 = item.MICR_NO._text;
              ashdata7 = item.ACCOUNT_NO._text;
              ashdata8 = item.AC_TYPE._text;
              ashdata9 = item.UMRN_NO._text;
              ashdata10 = item.UNIQUE_REF_NO._text;
              ashdata11 = item.FROM_DATE._text;
              ashdata12 = item.TO_DATE._text;
              ashdata13 = item.DEBIT_AMOUNT_TYPE._text;
              ashdata14 = item.FREQUENCY._text;
              ashdata15 = item.AMOUNT._text;

              let sql_purchase = `INSERT INTO mandate (user_id, INVESTOR_NAME,MANDATE_ID,BANK_CODE, BANK_NAME, BRANCH, MICR_NO,ACCOUNT_NO,AC_TYPE, UMRN_NO, UNIQUE_REF_NO, FROM_DATE, TO_DATE, DEBIT_AMOUNT_TYPE, FREQUENCY, AMOUNT) VALUES ('${userdata}', '${ashdata1}','${ashdata2}','${ashdata3}','${ashdata4}','${ashdata5}','${ashdata6}','${ashdata7}','${ashdata8}','${ashdata9}','${ashdata10}','${ashdata11}','${ashdata12}','${ashdata13}','${ashdata14}','${ashdata15}')`;
              console.log(sql_purchase);
              sql.query(sql_purchase, function (err, resvv) {

              });

              ashmsg = { "INVESTOR_NAME": ashdata1, "MANDATE_ID": ashdata2, "BANK_CODE": ashdata3, "BANK_NAME": ashdata4, "BRANCH": ashdata5, "MICR_NO": ashdata6, "ACCOUNT_NO": ashdata7, "AC_TYPE": ashdata8, "UMRN_NO": ashdata9, "UNIQUE_REF_NO": ashdata10, "FROM_DATE": ashdata11, "TO_DATE": ashdata12, "DEBIT_AMOUNT_TYPE": ashdata13, "FREQUENCY": ashdata14, "AMOUNT": ashdata15, }

              j.push(ashmsg);

              i++;

            }

          });
        
        }
        else {

          if (Array.isArray(fatcaresult2) && fatcaresult2.length) {
            fatcaresult2.forEach(element => {
              console.log(element.return_msg._text);
              msg = msg + element.return_msg._text + '||';
            });

          }
          else {
            console.log("ashC- Output XML - Link:827");
            if (typeof fatcaresult2.return_msg !== "undefined" && fatcaresult2.return_msg._text !== null) {
              console.log(fatcaresult2.return_msg._text);
              msg = fatcaresult2.return_msg._text;
            }
            
            if (typeof fatcaresult2.Status_Desc !== "undefined" && fatcaresult2.Status_Desc._text !== null) {
              console.log(fatcaresult2.Status_Desc._text);
              msg = fatcaresult2.Status_Desc._text;

            }
          }
        
        }

        let agmess = '';

        if (fatcaresult == 0) {
          agmess = {
            status: 200,
            message: 'Successfull',
            data: j,
           
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