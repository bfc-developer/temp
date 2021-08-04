const Customer = require("../models/extras.model.js");
const substrings = require("../../node_modules/substrings");
var mysql = require('../../node_modules/mysql');
var jsonxml = require('../../node_modules/jsontoxml');
var convert = require('../../node_modules/xml-js');
const axios = require('../../node_modules/axios');
var fs = require('fs');
const { ECONNABORTED } = require("constants");
const dbConfig = require("../config/db.config.js");
const sql = require("../models/db.js");

exports.getIINStatus = (req, res) => {
  if (req.body.Pan_No === undefined || req.body.Pan_No == '') {

    var ash_data = " Pan No.: feild is required";
    res.json({ status: 200, message: ash_data, data11: "Validation Error" });
    return;

    // console.log(" name: feild is required");        
  }
  if (req.body.Pan_No.length != 10) {

    var ash_data = " Pan No. length should be 10";
    res.json({ status: 200, message: ash_data });
    return;

    // console.log(" name: feild is required");        
  }
  Customer.getIINStatus(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred w1111hile retrieving customers."
      });
    else {

      res.send(data);
      return;


    }
  });
};

exports.getBasketList = (req, res) => {
  console.log("Basket will be listed here")
  if (req.body.transaction_type === undefined || req.body.transaction_type == '') {
    console.log(" transaction_type: feild is required");
    ash_data = " transaction_type: feild is required";
    res.json({ status: 400, message: ash_data, data11: "Validation Error" });
    return;


  }
  //console.log(" name: dsdfeild is required");
  const postarray = {

    Tr_Type: req.body.transaction_type,
    anchoring: req.body.anchoring,
    constellation: req.body.constellation,

  }

  Customer.getBasketList(postarray, (err, data) => {

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

exports.getisin = (req, res) => {
  console.log("Basket will be listed here")
  if (req.body.isin === undefined || req.body.isin == '') {
    console.log(" isin: feild is required");
    ash_data = " isin: feild is required";
    res.json({ status: 400, message: ash_data, data11: "Validation Error" });
    return;

  }
  //console.log(" name: dsdfeild is required");
  const postarray = {

    isin: req.body.isin,

  }

  Customer.getisin(postarray, (err, data) => {

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

//old code
// exports.GETIINDETAILS = (req, res) => {
//   console.log("GETIINSTATUS")
//   const postarray = {
//     iin: req.body.iin,
//     emaillocal: req.body.email,
//   }


//   let ash_arrk = {
//     NMFIIService: {
//       service_request: {
//         appln_id: 'MFS21399',
//         password: 'CO3062WOJ1RPXM19',
//         broker_code: 'ARN-21399',
//         iin: postarray.iin,
//         ach_fromdate: [],
//         ach_todate: []
//       }//service_request
//     } //NMFIIService
//   } //else

//   console.log(ash_arrk);
//   let ash_xml_agamji = jsonxml(ash_arrk);
//   console.log(ash_xml_agamji);

//   axios.post('https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/IINDETAILS',
//     ash_xml_agamji,
//     {
//       headers:
//         { 'Content-Type': 'text/xml' }
//     }).then(res22 => {
//       console.log("C- Output XML - Line 946", res22)

//       let result1 = convert.xml2js(res22.data, { compact: true, spaces: 4 });
//       let fatcaresult = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
//       let fatcaresult2 = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;

//       let newdata0 = fatcaresult2[0];
//       let newdata0_0 = fatcaresult2[1];
//       let adddata1 = "";
//       let adddata2 = "";
//       let msg = "";
//       let email = "";

//       if (typeof newdata0 !== "undefined" || typeof newdata0_0 !== "undefined") {
//         let newdata1 = fatcaresult2[0].return_msg;
//         let newdata2 = fatcaresult2[1].return_msg;

//         let newdata3 = fatcaresult2[0].Status_Desc;
//         let newdata4 = fatcaresult2[1].Status_Desc;
//         if (typeof newdata1 !== "undefined" || typeof newdata2 !== "undefined") {
//           adddata1 = fatcaresult2[0].return_msg._text
//           adddata2 = fatcaresult2[1].return_msg._text

//         } else if (typeof newdata3 !== "undefined" || typeof newdata4 !== "undefined") {
//           adddata1 = fatcaresult2[0].Status_Desc._text
//           adddata2 = fatcaresult2[1].Status_Desc._text
//         } else {
//           adddata1 = "";
//           adddata2 = "";

//         }
//       }

//       if (fatcaresult == 0) {
//         console.log(fatcaresult2);
//         // console.log("C- Output XML - BANK_NAME:", fatcaresult2.BANK_NAME._text)
//         // console.log("C- Output XML - FH_PAN_NO:", fatcaresult2.FH_PAN_NO._text)
//         // console.log("C- Output XML - CUSTOMER_ID:", fatcaresult2.CUSTOMER_ID._text)
//         // console.log("C- Output XML - AC_NO:", fatcaresult2.AC_NO._text)
//         // console.log("C- Output XML - IFSC_CODE:", fatcaresult2.IFSC_CODE._text)
//         // console.log("C- Output XML - OCCUPATION_CODE:", fatcaresult2.OCCUPATION_CODE._text)
//         // console.log("C- Output XML - ADDRESS1:", fatcaresult2.ADDRESS1._text)
//         // console.log("C- Output XML - CITY:", fatcaresult2.CITY._text)
//         // console.log("C- Output XML - STATE_NAME:", fatcaresult2.STATE_NAME._text)
//         // console.log("C- Output XML - PINCODE:", fatcaresult2.PINCODE._text)
//         // console.log("C- Output XML - COUNTRY_NAME:", fatcaresult2.COUNTRY_NAME._text)
//         // console.log("C- Output XML - BRANCH_NAME:", fatcaresult2.BRANCH_NAME._text)
//         // console.log("C- Output XML - AC_TYPE:", fatcaresult2.AC_TYPE._text)

//         if (typeof fatcaresult2.BANK_NAME !== "undefined" && fatcaresult2.BANK_NAME._text !== null) {
//           ashdata1 = fatcaresult2.BANK_NAME._text;//b
//         }
//         if (typeof fatcaresult2.FH_PAN_NO !== "undefined" && fatcaresult2.FH_PAN_NO._text !== null) {
//           ashdata2 = fatcaresult2.FH_PAN_NO._text;
//         }
//         if (typeof fatcaresult2.CUSTOMER_ID !== "undefined" && fatcaresult2.CUSTOMER_ID._text !== null) {
//           ashdata3 = fatcaresult2.CUSTOMER_ID._text;
//         }
//         if (typeof fatcaresult2.AC_NO !== "undefined" && fatcaresult2.AC_NO._text !== null) {
//           ashdata4 = fatcaresult2.AC_NO._text;//b
//         }
//         if (typeof fatcaresult2.IFSC_CODE !== "undefined" && fatcaresult2.IFSC_CODE._text !== null) {
//           ashdata5 = fatcaresult2.IFSC_CODE._text;//b
//         }
//         if (typeof fatcaresult2.OCCUPATION_CODE !== "undefined" && fatcaresult2.OCCUPATION_CODE._text !== null) {
//           ashdata6 = fatcaresult2.OCCUPATION_CODE._text;
//         }
//         if (typeof fatcaresult2.ADDRESS1 !== "undefined" && fatcaresult2.ADDRESS1._text !== null) {
//           ashdata7 = fatcaresult2.ADDRESS1._text;
//         }
//         if (typeof fatcaresult2.CITY !== "undefined" && fatcaresult2.CITY._text !== null) {
//           ashdata8 = fatcaresult2.CITY._text;
//         }
//         if (typeof fatcaresult2.STATE_NAME !== "undefined" && fatcaresult2.STATE_NAME._text !== null) {
//           ashdata9 = fatcaresult2.STATE_NAME._text;
//         }
//         if (typeof fatcaresult2.PINCODE !== "undefined" && fatcaresult2.PINCODE._text !== null) {
//           ashdata10 = fatcaresult2.PINCODE._text;
//         }
//         if (typeof fatcaresult2.COUNTRY_NAME !== "undefined" && fatcaresult2.COUNTRY_NAME._text !== null) {
//           ashdata11 = fatcaresult2.COUNTRY_NAME._text;
//         }
//         if (typeof fatcaresult2.BRANCH_NAME !== "undefined" && fatcaresult2.BRANCH_NAME._text !== null) {
//           ashdata12 = fatcaresult2.BRANCH_NAME._text;//b
//         }
//         if (typeof fatcaresult2.AC_TYPE !== "undefined" && fatcaresult2.AC_TYPE._text !== null) {
//           ashdata13 = fatcaresult2.AC_TYPE._text;//b
//         }
//         // if (typeof fatcaresult2.EMAIL !== "undefined" && fatcaresult2.EMAIL._text !== null) {
//         //   email = fatcaresult2.EMAIL._text;// from nse server
//         // }

//         email = postarray.emaillocal;

//         console.log("Local email: 271", email);

//         let sql_users = "update users set pan_card='" + `${ashdata2}` + "' ,iin='" + `${ashdata3}` + "',occupation='" + `${ashdata6}` + "',address='" + `${ashdata7}` + "',city='" + `${ashdata8}` + "',state='" + `${ashdata9}` + "',pincode='" + `${ashdata10}` + "' where email='" + `${email}` + "'";

//         sql.query(sql_users, function (err, resvv) {
//           console.log(sql_users, resvv);
//           console.log("Data Saved:", resvv);

//         });
//         let sql_ = "SELECT user_bank.* FROM user_bank INNER JOIN users on users.id=user_bank.user_id where users.email='" + `${email}` + "'";
//         console.log(sql_);
//         sql.query(sql_, function (err, resvv1) {

//           if (resvv1.length) {
//             console.log("Bank details found");

//             let sql_bank = "update user_bank INNER JOIN users on users.id=user_bank.user_id set bank_name='" + `${ashdata1}` + "',accountNo='" + `${ashdata4}` + "',fscode='" + `${ashdata5}` + "',branch='" + `${ashdata12}` + "',acoount_type='" + `${ashdata13}` + "',bank_code='" + `${ashdata1}` + "' where email='" + `${email}` + "'";

//             sql.query(sql_bank, function (err, resvv) {
//               console.log(sql_bank, resvv);
//               console.log("Data Saved:", resvv);

//             });

//           }
//           else {

//             let sql_ = "SELECT id FROM users where users.email='" + `${email}` + "'";
//             console.log(sql_);
//             sql.query(sql_, function (err, resvv1) {
//               let id = resvv1[0].id;

//               let sql_bank = `INSERT INTO user_bank (user_id,bank_name,bank_code, accountNo, fscode, branch, acoount_type, isprimary_bank) VALUES ('${id}','${ashdata1}','${ashdata1}', '${ashdata4}','${ashdata5}','${ashdata12}','${ashdata13}',1)`;

//               sql.query(sql_bank, function (err, resvv) {
//                 console.log(sql_bank, resvv);
//                 console.log("Data Saved:", resvv);


//               });
//             });

//           }
//         });

//       }
//       else {


//         console.log("ashC- Output XML - Link:827");
//         if (typeof fatcaresult2.return_msg !== "undefined" && fatcaresult2.return_msg._text !== null) {
//           console.log(fatcaresult2.return_msg._text);
//           msg = fatcaresult2.return_msg._text;
//         }

//         if (typeof fatcaresult2.Status_Desc !== "undefined" && fatcaresult2.Status_Desc._text !== null) {
//           console.log(fatcaresult2.Status_Desc._text);
//           msg = fatcaresult2.Status_Desc._text;


//         }

//       }

//       let agmess = '';

//       if (fatcaresult == 0) {
//         agmess = {
//           status: 200,
//           message: 'Successfull',

//         }
//       } else {
//         agmess = {
//           status: 400,
//           message: msg,
//           //message_full: fatcaresult2,
//         }
//       }
//       return res.status(200).json(agmess)
//     }).catch(err => { console.log(err) });
//   console.log("res last line 829");
// };

exports.GETIINDETAILS = (req, res) => {

  try {
    //code
    // console.log("GETIINSTATUS")
    const postarray = {
      iin: req.body.iin,
      emaillocal: req.body.email,
    }

    Customer.getUserData(postarray.emaillocal, (err, data) => {
      if (data != null) {
        if (!Array.isArray(data) || !data.length) {
          return res.json({
            success: 200,
            message: "User Does not Exist!"
          });
        }
      }
      // console.log(data);
      // return false;
      let urs = data[0];
      user_id = urs.id;
      //console.log(user_id); return
    let ash_arrk = {
      NMFIIService: {
        service_request: {
          appln_id: 'MFS21399',
          password: 'CO3062WOJ1RPXM19',
          broker_code: 'ARN-21399',
          iin: postarray.iin,
          ach_fromdate: [],
          ach_todate: []
        }//service_request
      } //NMFIIService
    } //else
    //console.log(ash_arrk);
    let ash_xml_agamji = jsonxml(ash_arrk);
    //console.log(ash_xml_agamji);

    axios.post('https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/IINDETAILS',
      ash_xml_agamji,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res22 => {
        //console.log("C- Output XML - Line 946", res22.data)

        let result1 = convert.xml2js(res22.data, { compact: true, spaces: 4 });
        let fatcaresult = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
        let fatcaresult2 = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;
        let newdata0 = fatcaresult2[0];
        let newdata0_0 = fatcaresult2[1];
        let adddata1 = "";
        let adddata2 = "", ashdata14 = "", ashdata15 = "";
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
          //console.log(fatcaresult2); return
          status = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_msg._text;

          if (typeof fatcaresult2.BANK_NAME !== "undefined" && fatcaresult2.BANK_NAME._text !== null) {
            ashdata1 = fatcaresult2.BANK_NAME._text;//b
          }
          if (typeof fatcaresult2.FH_PAN_NO !== "undefined" && fatcaresult2.FH_PAN_NO._text !== null) {
            ashdata2 = fatcaresult2.FH_PAN_NO._text;
          }
          if (typeof fatcaresult2.CUSTOMER_ID !== "undefined" && fatcaresult2.CUSTOMER_ID._text !== null) {
            ashdata3 = fatcaresult2.CUSTOMER_ID._text;
          }
          if (typeof fatcaresult2.AC_NO !== "undefined" && fatcaresult2.AC_NO._text !== null) {
            ashdata4 = fatcaresult2.AC_NO._text;//b
          }
          if (typeof fatcaresult2.IFSC_CODE !== "undefined" && fatcaresult2.IFSC_CODE._text !== null) {
            ashdata5 = fatcaresult2.IFSC_CODE._text;//b
          }
          if (typeof fatcaresult2.OCCUPATION_CODE !== "undefined" && fatcaresult2.OCCUPATION_CODE._text !== null) {
            ashdata6 = fatcaresult2.OCCUPATION_CODE._text;
          }
          if (typeof fatcaresult2.ADDRESS1 !== "undefined" && fatcaresult2.ADDRESS1._text !== null) {
            ashdata7 = fatcaresult2.ADDRESS1._text;
          }
          if (typeof fatcaresult2.CITY !== "undefined" && fatcaresult2.CITY._text !== null) {
            ashdata8 = fatcaresult2.CITY._text;
          }
          if (typeof fatcaresult2.STATE_NAME !== "undefined" && fatcaresult2.STATE_NAME._text !== null) {
            ashdata9 = fatcaresult2.STATE_NAME._text;
          }
          if (typeof fatcaresult2.PINCODE !== "undefined" && fatcaresult2.PINCODE._text !== null) {
            ashdata10 = fatcaresult2.PINCODE._text;
          }
          if (typeof fatcaresult2.COUNTRY_NAME !== "undefined" && fatcaresult2.COUNTRY_NAME._text !== null) {
            ashdata11 = fatcaresult2.COUNTRY_NAME._text;
          }
          if (typeof fatcaresult2.BRANCH_NAME !== "undefined" && fatcaresult2.BRANCH_NAME._text !== null) {
            ashdata12 = fatcaresult2.BRANCH_NAME._text;//b
          }
          if (typeof fatcaresult2.AC_TYPE !== "undefined" && fatcaresult2.AC_TYPE._text !== null) {
            ashdata13 = fatcaresult2.AC_TYPE._text;//b
          }
          if (typeof fatcaresult2.EMAIL !== "undefined" && fatcaresult2.EMAIL._text !== null) {
            ashdataemail = fatcaresult2.EMAIL._text;
          }
          if (typeof fatcaresult2.HOLD_N_CODE !== "undefined" && fatcaresult2.HOLD_N_CODE._text !== null) {
            ashdata14 = fatcaresult2.HOLD_N_CODE._text;
          }
          if (typeof fatcaresult2.HOLD_NATURE_DESC !== "undefined" && fatcaresult2.HOLD_NATURE_DESC._text !== null) {
            ashdata15 = fatcaresult2.HOLD_NATURE_DESC._text;
          }

          if (typeof fatcaresult2.TAX_STATUS_CODE !== "undefined" && fatcaresult2.TAX_STATUS_CODE._text !== null) {
            ashdata16 = fatcaresult2.TAX_STATUS_CODE._text;
          }
          if (typeof fatcaresult2.TAX_STATUS_DESC !== "undefined" && fatcaresult2.TAX_STATUS_DESC._text !== null) {
            ashdata17 = fatcaresult2.TAX_STATUS_DESC._text;
          }
          if (typeof fatcaresult2.CREATED_DATE !== "undefined" && fatcaresult2.CREATED_DATE._text !== null) {
            ashdata18 = fatcaresult2.CREATED_DATE._text;
          }
          if (typeof fatcaresult2.INVESTOR_NAME !== "undefined" && fatcaresult2.INVESTOR_NAME._text !== null) {
            ashdata19 = fatcaresult2.INVESTOR_NAME._text;
          }

          email = postarray.emaillocal;

          let sql_users = "update users set pan_card='" + `${ashdata2}` + "' ,iin='" + `${ashdata3}` + "',occupation='" + `${ashdata6}` + "',address='" + `${ashdata7}` + "',city='" + `${ashdata8}` + "',state='" + `${ashdata9}` + "',pincode='" + `${ashdata10}` + "' where email='" + `${email}` + "'";

          sql.query(sql_users, function (err, resvv) {
            //console.log(sql_users, resvv);
            //console.log("Data Saved:", resvv);

          });

          let sql_ = "SELECT user_bank.* FROM user_bank INNER JOIN users on users.id=user_bank.user_id where users.email='" + `${email}` + "'";
          //console.log(sql_);
          sql.query(sql_, function (err, resvv1) {

            if (resvv1.length) {
              //console.log("Bank details found");

              let sql_ = "SELECT id FROM bank_accout_type where acount_type='" + `${ashdata13}` + "'";
              //console.log(sql_);
              sql.query(sql_, function (err, resvv1) {
                let idb = resvv1[0].id;

                //let sql_bank = "update user_bank INNER JOIN users on users.id=user_bank.user_id set bank_name='" + `${ashdata1}` + "',accountNo='" + `${ashdata4}` + "',bank_code='" + `${ashdata1}` + "',hold_n_code='" + `${ashdata14}` + "',hold_nature_desc='" + `${ashdata15}` + "',fscode='" + `${ashdata5}` + "',branch='" + `${ashdata12}` + "',acoount_type=" + `${idb}` + " where email='" + `${email}` + "'";
                let sql_bank = "update user_bank INNER JOIN users on users.id=user_bank.user_id set bank_name='" + `${ashdata1}` + "',accountNo='" + `${ashdata4}` + "',bank_code='" + `${ashdata1}` + "',hold_n_code='" + `${ashdata14}` + "',hold_nature_desc='" + `${ashdata15}` + "',fscode='" + `${ashdata5}` + "',branch='" + `${ashdata12}` + "',acoount_type=" + `${idb}` + " where users.email='" + `${email}` + "' AND user_bank.accountNo = '" + ashdata4 + "'";

                sql.query(sql_bank, function (err, resvv) {
                  //console.log(sql_bank, resvv);
                  //console.log("Data Saved:", resvv);

                });
              });
              let sql_user = "update users set kyc_sts='1' where email='" + `${email}` + "'";

              sql.query(sql_user, function (err, resvv) {
                //console.log(sql_user, resvv);
                //console.log("Data Saved:", resvv);

              });

            }
            else {

              let sql_ = "SELECT id FROM users where users.email='" + `${email}` + "'";
              //console.log(sql_);
              sql.query(sql_, function (err, resvv1) {
                   
                 let id = resvv1[0].id;

                let sql_ = "SELECT id FROM bank_accout_type where acount_type='" + `${ashdata13}` + "'";
                //console.log(sql_);
                sql.query(sql_, function (err, resvv1) {
                  let idb = resvv1[0].id;//<------

                  let sql_bank = `INSERT INTO user_bank (user_id,bank_name,bank_code, accountNo, fscode, branch, acoount_type, isprimary_bank) VALUES ('${id}','${ashdata1}','${ashdata1}', '${ashdata4}','${ashdata5}','${ashdata12}','${idb}',1)`;

                  sql.query(sql_bank, function (err, resvv) {
                    //console.log(sql_bank, resvv);
                    //console.log("Data Saved:", resvv);

                  });

                  //new code
                  let sql_users = "update users set hold_n_code='" + `${ashdata14}` + "',hold_nature_desc='" + `${ashdata15}` + "' where email='" + `${email}` + "'";

                  sql.query(sql_users, function (err, resvv1) {
                    //console.log(sql_users, resvv1);
                    //console.log("update holding nature data :", resvv1);

                  });
                });

                let sql_user = "update users set kyc_sts='1' where email='" + `${email}` + "'";

                sql.query(sql_user, function (err, resvv) {
                  //console.log(sql_user, resvv);
                  //console.log("Data Saved:", resvv);

                });
              });

            }
          });

          // vivek code
          if (typeof fatcaresult2.JH1_PAN_NO !== "undefined" && fatcaresult2.JH1_PAN_NO._text !== null) {
            jh1_name = fatcaresult2.JH1_NAME._text;
            jh1_pan_no = fatcaresult2.JH1_PAN_NO._text;
            jh1_communication_email = fatcaresult2.JH1_COMMUNICATION_EMAIL._text;
            jh1_communication_mobile = fatcaresult2.JH1_COMMUNICATION_MOBILE._text;
          }else{
            jh1_name = '';
            jh1_pan_no = '';
            jh1_communication_email = '';
            jh1_communication_mobile = '';
          }

          if (typeof fatcaresult2.JH2_PAN_NO !== "undefined" && fatcaresult2.JH2_PAN_NO._text !== null) {
            jh2_name = fatcaresult2.JH2_NAME._text;
            jh2_pan_no = fatcaresult2.JH2_PAN_NO._text;
            jh2_communication_email = fatcaresult2.JH2_COMMUNICATION_EMAIL._text;
            jh2_communication_mobile = fatcaresult2.JH2_COMMUNICATION_MOBILE._text;
          }else{
            jh2_name = '';
            jh2_pan_no = '';
            jh2_communication_email = '';
            jh2_communication_mobile = '';
          }

          //let sqlquery = "SELECT * FROM user_profile where customer_id='" + `${ashdata3}` + "' and fh_pan_no='" + `${ashdata2}` + "'";
          let sqlquery = "SELECT * FROM user_profile where user_id='" + `${user_id}` + "' and  customer_id='" + `${ashdata3}` + "' and fh_pan_no='" + `${ashdata2}` + "'";
          
          sql.query(sqlquery, (err, res) => {
            // console.log(res.RowDataPacket);
            // res = JSON.stringify(res)
            // res = JSON.parse(res);
            
            if (res!= "") {
              let sql_users_pro = "update user_profile set jh1_name='" + `${jh1_name}` + "',jh1_pan_no='" + `${jh1_pan_no}` + "',jh1_communication_email='" + `${jh1_communication_email}` +"',jh1_communication_mobile='" + `${jh1_communication_mobile}` +"',jh2_name='" + `${jh2_name}` +"',jh2_pan_no='" + `${jh2_pan_no}` +"',jh2_communication_email='" + `${jh2_communication_email}` +"',jh2_communication_mobile='" + `${jh2_communication_mobile}` + "' where customer_id='" + `${ashdata3}` + "' and fh_pan_no='" + `${ashdata2}` + "'";
              sql.query(sql_users_pro, function (err, resvv) {
                console.log("Data Updated");
              });

            }else{

              let sql_users_pro = `INSERT INTO user_profile (user_id,customer_id,investor_name, fh_pan_no, tax_status_code, tax_status_desc, hold_n_code, hold_nature_desc, jh1_name, jh1_pan_no, jh1_communication_email, jh1_communication_mobile, jh2_name, jh2_pan_no, jh2_communication_email, jh2_communication_mobile, created_date) VALUES ('${user_id}','${ashdata3}','${ashdata19}', '${ashdata2}','${ashdata16}','${ashdata17}','${ashdata14}','${ashdata15}','${jh1_name}','${jh1_pan_no}','${jh1_communication_email}','${jh1_communication_mobile}','${jh2_name}','${jh2_pan_no}','${jh2_communication_email}','${jh2_communication_mobile}','${ashdata18}')`;

              sql.query(sql_users_pro, function (err, resvv) {
                console.log("Data Inserted");
              });
              //console.log('vivek out');

            }
          });

        }
        else {


          //console.log("ashC- Output XML - Link:827");
          if (typeof fatcaresult2.return_msg !== "undefined" && fatcaresult2.return_msg._text !== null) {
            //console.log(fatcaresult2.return_msg._text);
            msg = fatcaresult2.return_msg._text;
          }

          if (typeof fatcaresult2.Status_Desc !== "undefined" && fatcaresult2.Status_Desc._text !== null) {
            //console.log(fatcaresult2.Status_Desc._text);
            msg = fatcaresult2.Status_Desc._text;

          }
        }

        let agmess = '';

        if (fatcaresult == 0) {
          agmess = {
            status: 200,
            message: status,
            data: {
              "EMAIL": ashdataemail,
              "CUSTOMER_ID": ashdata3,
              "INVESTOR_NAME": ashdata19,
              "FH_PAN_NO": ashdata2,
              "TAX_STATUS_CODE": ashdata16,
              "TAX_STATUS_DESC": ashdata17,
              "HOLD_N_CODE": ashdata14,
              "HOLD_NATURE_DESC": ashdata15,
              "CREATED_DATE": ashdata18,
              "JH1_NAME": jh1_name,
              "JH1_PAN_NO": jh1_pan_no,
              "JH1_COMMUNICATION_EMAIL": jh1_communication_email,
              "JH1_COMMUNICATION_MOBILE": jh1_communication_mobile,
              "JH2_NAME": jh2_name,
              "JH2_PAN_NO": jh2_pan_no,
              "JH2_COMMUNICATION_EMAIL": jh2_communication_email,
              "JH2_COMMUNICATION_MOBILE": jh2_communication_mobile
            },

          }
        } else {
          agmess = {
            status: 400,
            message: msg,
            //message_full: fatcaresult2,
          }
        }
        return res.status(200).json(agmess)
      }).catch(err => { console.log(err) });
    //console.log("res last line 489");
    });
  } catch (err) {
    console.log(err);
  }
};

//KYC CRON STATUS API
exports.validateKyc = (req, res) => {
  Customer.validateKyc((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred w1111hile retrieving customers."
      });
    else {
      const textc = { 'message': 'Successfully', 'status': '200', 'data': data };
      res.send(textc);
    }
  });
};



exports.GETIINDETAILSWMS = (req, res) => {

  try {
    //code
    console.log("GETIINDETAILSWMS")
    const postarray = {
      iin: req.body.iin,
      emaillocal: req.body.email,
    }

    Customer.getUserData(postarray.emaillocal, (err, data) => {
      if (data != null) {
        if (!Array.isArray(data) || !data.length) {
          return res.json({
            success: 200,
            message: "User Does not Exist!"
          });
        }
      }
      let urs = data[0];
      user_id = urs.id;
      //console.log(user_id); return
    let ash_arrk = {
      NMFIIService: {
        service_request: {
          appln_id: 'MFS21399',
          password: 'CO3062WOJ1RPXM19',
          broker_code: 'ARN-21399',
          iin: postarray.iin,
          ach_fromdate: [],
          ach_todate: []
        }//service_request
      } //NMFIIService
    } //else
    //console.log(ash_arrk);
    let ash_xml_agamji = jsonxml(ash_arrk);
    //console.log(ash_xml_agamji);

    axios.post('https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/IINDETAILS',
      ash_xml_agamji,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res22 => {
        //console.log("C- Output XML - Line 946", res22.data)

        let result1 = convert.xml2js(res22.data, { compact: true, spaces: 4 });
        let fatcaresult = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
        let fatcaresult2 = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;
        let newdata0 = fatcaresult2[0];
        let newdata0_0 = fatcaresult2[1];
        let adddata1 = "";
        let adddata2 = "", ashdata14 = "", ashdata15 = "";
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
          //console.log(fatcaresult2); return
          status = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_msg._text;

          if (typeof fatcaresult2.BANK_NAME !== "undefined" && fatcaresult2.BANK_NAME._text !== null) {
            ashdata1 = fatcaresult2.BANK_NAME._text;//b
          }
          if (typeof fatcaresult2.FH_PAN_NO !== "undefined" && fatcaresult2.FH_PAN_NO._text !== null) {
            ashdata2 = fatcaresult2.FH_PAN_NO._text;
          }
          if (typeof fatcaresult2.CUSTOMER_ID !== "undefined" && fatcaresult2.CUSTOMER_ID._text !== null) {
            ashdata3 = fatcaresult2.CUSTOMER_ID._text;
          }
          if (typeof fatcaresult2.AC_NO !== "undefined" && fatcaresult2.AC_NO._text !== null) {
            ashdata4 = fatcaresult2.AC_NO._text;//b
          }
          if (typeof fatcaresult2.IFSC_CODE !== "undefined" && fatcaresult2.IFSC_CODE._text !== null) {
            ashdata5 = fatcaresult2.IFSC_CODE._text;//b
          }
          if (typeof fatcaresult2.OCCUPATION_CODE !== "undefined" && fatcaresult2.OCCUPATION_CODE._text !== null) {
            ashdata6 = fatcaresult2.OCCUPATION_CODE._text;
          }
          if (typeof fatcaresult2.ADDRESS1 !== "undefined" && fatcaresult2.ADDRESS1._text !== null) {
            ashdata7 = fatcaresult2.ADDRESS1._text;
          }
          if (typeof fatcaresult2.CITY !== "undefined" && fatcaresult2.CITY._text !== null) {
            ashdata8 = fatcaresult2.CITY._text;
          }
          if (typeof fatcaresult2.STATE_NAME !== "undefined" && fatcaresult2.STATE_NAME._text !== null) {
            ashdata9 = fatcaresult2.STATE_NAME._text;
          }
          if (typeof fatcaresult2.PINCODE !== "undefined" && fatcaresult2.PINCODE._text !== null) {
            ashdata10 = fatcaresult2.PINCODE._text;
          }
          if (typeof fatcaresult2.COUNTRY_NAME !== "undefined" && fatcaresult2.COUNTRY_NAME._text !== null) {
            ashdata11 = fatcaresult2.COUNTRY_NAME._text;
          }
          if (typeof fatcaresult2.BRANCH_NAME !== "undefined" && fatcaresult2.BRANCH_NAME._text !== null) {
            ashdata12 = fatcaresult2.BRANCH_NAME._text;//b
          }
          if (typeof fatcaresult2.AC_TYPE !== "undefined" && fatcaresult2.AC_TYPE._text !== null) {
            ashdata13 = fatcaresult2.AC_TYPE._text;//b
          }
          if (typeof fatcaresult2.EMAIL !== "undefined" && fatcaresult2.EMAIL._text !== null) {
            ashdataemail = fatcaresult2.EMAIL._text;
          }
          if (typeof fatcaresult2.HOLD_N_CODE !== "undefined" && fatcaresult2.HOLD_N_CODE._text !== null) {
            ashdata14 = fatcaresult2.HOLD_N_CODE._text;
          }
          if (typeof fatcaresult2.HOLD_NATURE_DESC !== "undefined" && fatcaresult2.HOLD_NATURE_DESC._text !== null) {
            ashdata15 = fatcaresult2.HOLD_NATURE_DESC._text;
          }

          if (typeof fatcaresult2.TAX_STATUS_CODE !== "undefined" && fatcaresult2.TAX_STATUS_CODE._text !== null) {
            ashdata16 = fatcaresult2.TAX_STATUS_CODE._text;
          }
          if (typeof fatcaresult2.TAX_STATUS_DESC !== "undefined" && fatcaresult2.TAX_STATUS_DESC._text !== null) {
            ashdata17 = fatcaresult2.TAX_STATUS_DESC._text;
          }
          if (typeof fatcaresult2.CREATED_DATE !== "undefined" && fatcaresult2.CREATED_DATE._text !== null) {
            ashdata18 = fatcaresult2.CREATED_DATE._text;
          }
          if (typeof fatcaresult2.INVESTOR_NAME !== "undefined" && fatcaresult2.INVESTOR_NAME._text !== null) {
            ashdata19 = fatcaresult2.INVESTOR_NAME._text;
          }

          email = postarray.emaillocal;

          // vivek code
          if (typeof fatcaresult2.JH1_PAN_NO !== "undefined" && fatcaresult2.JH1_PAN_NO._text !== null) {
            jh1_name = fatcaresult2.JH1_NAME._text;
            jh1_pan_no = fatcaresult2.JH1_PAN_NO._text;
            jh1_communication_email = fatcaresult2.JH1_COMMUNICATION_EMAIL._text;
            jh1_communication_mobile = fatcaresult2.JH1_COMMUNICATION_MOBILE._text;
          }else{
            jh1_name = '';
            jh1_pan_no = '';
            jh1_communication_email = '';
            jh1_communication_mobile = '';
          }

          if (typeof fatcaresult2.JH2_PAN_NO !== "undefined" && fatcaresult2.JH2_PAN_NO._text !== null) {
            jh2_name = fatcaresult2.JH2_NAME._text;
            jh2_pan_no = fatcaresult2.JH2_PAN_NO._text;
            jh2_communication_email = fatcaresult2.JH2_COMMUNICATION_EMAIL._text;
            jh2_communication_mobile = fatcaresult2.JH2_COMMUNICATION_MOBILE._text;
          }else{
            jh2_name = '';
            jh2_pan_no = '';
            jh2_communication_email = '';
            jh2_communication_mobile = '';
          }
          console.log("USERID|IIN|PAN", user_id+'|'+ashdata3+'|'+ashdata2);//REQUEST DATA FOR QUERY
          let sqlquery = "SELECT * FROM user_profile where user_id='" + `${user_id}` + "' and  customer_id='" + `${ashdata3}` + "' and fh_pan_no='" + `${ashdata2}` + "'";
          
          sql.query(sqlquery, (err, res) => {
            if (res!= "") {
              let sql_users_pro = "update user_profile set jh1_name='" + `${jh1_name}` + "',jh1_pan_no='" + `${jh1_pan_no}` + "',jh1_communication_email='" + `${jh1_communication_email}` +"',jh1_communication_mobile='" + `${jh1_communication_mobile}` +"',jh2_name='" + `${jh2_name}` +"',jh2_pan_no='" + `${jh2_pan_no}` +"',jh2_communication_email='" + `${jh2_communication_email}` +"',jh2_communication_mobile='" + `${jh2_communication_mobile}` + "' where customer_id='" + `${ashdata3}` + "' and fh_pan_no='" + `${ashdata2}` + "'";
              sql.query(sql_users_pro, function (err, resvv) {
                console.log("Data Updated");
              });

            }else{

              let sql_users_pro = `INSERT INTO user_profile (user_id,customer_id,investor_name, fh_pan_no, tax_status_code, tax_status_desc, hold_n_code, hold_nature_desc, jh1_name, jh1_pan_no, jh1_communication_email, jh1_communication_mobile, jh2_name, jh2_pan_no, jh2_communication_email, jh2_communication_mobile, created_date) VALUES ('${user_id}','${ashdata3}','${ashdata19}', '${ashdata2}','${ashdata16}','${ashdata17}','${ashdata14}','${ashdata15}','${jh1_name}','${jh1_pan_no}','${jh1_communication_email}','${jh1_communication_mobile}','${jh2_name}','${jh2_pan_no}','${jh2_communication_email}','${jh2_communication_mobile}','${ashdata18}')`;

              sql.query(sql_users_pro, function (err, resvv) {
                console.log("Data Inserted");
              });
              //console.log('vivek out');

            }
          });

        }
        else {


          //console.log("ashC- Output XML - Link:827");
          if (typeof fatcaresult2.return_msg !== "undefined" && fatcaresult2.return_msg._text !== null) {
            //console.log(fatcaresult2.return_msg._text);
            msg = fatcaresult2.return_msg._text;
          }

          if (typeof fatcaresult2.Status_Desc !== "undefined" && fatcaresult2.Status_Desc._text !== null) {
            //console.log(fatcaresult2.Status_Desc._text);
            msg = fatcaresult2.Status_Desc._text;

          }
        }

        let agmess = '';

        if (fatcaresult == 0) {
          agmess = {
            status: 200,
            message: status,
            data: {
              "EMAIL": ashdataemail,
              "CUSTOMER_ID": ashdata3,
              "INVESTOR_NAME": ashdata19,
              "FH_PAN_NO": ashdata2,
              "TAX_STATUS_CODE": ashdata16,
              "TAX_STATUS_DESC": ashdata17,
              "HOLD_N_CODE": ashdata14,
              "HOLD_NATURE_DESC": ashdata15,
              "CREATED_DATE": ashdata18,
              "JH1_NAME": jh1_name,
              "JH1_PAN_NO": jh1_pan_no,
              "JH1_COMMUNICATION_EMAIL": jh1_communication_email,
              "JH1_COMMUNICATION_MOBILE": jh1_communication_mobile,
              "JH2_NAME": jh2_name,
              "JH2_PAN_NO": jh2_pan_no,
              "JH2_COMMUNICATION_EMAIL": jh2_communication_email,
              "JH2_COMMUNICATION_MOBILE": jh2_communication_mobile
            },

          }
        } else {
          agmess = {
            status: 400,
            message: msg,
            //message_full: fatcaresult2,
          }
        }
        return res.status(200).json(agmess)
      }).catch(err => { console.log(err) });
    //console.log("res last line 489");
    });
  } catch (err) {
    console.log(err);
  }
};