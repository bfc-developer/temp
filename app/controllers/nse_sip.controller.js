const Customer = require("../models/nse_sip.model.js");
const substrings = require("../../node_modules/substrings");
var mysql = require('../../node_modules/mysql');
var jsonxml = require('../../node_modules/jsontoxml');
var convert = require('../../node_modules/xml-js');
const axios = require('../../node_modules/axios');
var fs = require('fs');
const { ECONNABORTED } = require("constants");
const dbConfig = require("../config/db.config.js");
const sql = require("../models/db.js");

exports.test = (req, res) => {
  //console.log(linkvar)

  linkvar = "<a href='https://uat.nsenmf.com/Transactions/MFDMakePayment.aspx?joJOfnmoxoVHW7E39JcLLHpmZFMO5i%2bA0w0%2fh8LHIohbsy6tTTu8ttvENchBlJ9jtmSwjA9Hgexmi5A0bsaT%2fmZ0fd7IaOGH6bmWeG5bZXmBB36tUFp472snObCfL7vCDmOYL9GUXhQz8SVw35kWN0PVx1%2ftScEUgJu4nFNEssOKfolcYxdcrADhh1A09y%2fjxs4tGRckwHt9wnM4UOHPYxZPfNCDKsu1D%2fEJdpedgRgM%2fURp42gZ08j779OXFSFY7nNF1PKd5cPKHi04IAg1eUaDYGuAwnPlf1uA6aCpotYIOlLDvOAYMQQxvC7uUD6ai8yW1qGEzz6M35j73Tdt9GxFV8CToGeUSNZ3kBXnMWQ%3d'>https://uat.nsenmf.com/Transactions/MFDMakePayment.aspx?joJOfnmoxoVHW7E39JcLLHpmZFMO5i%2bA0w0%2fh8LHIohbsy6tTTu8ttvENchBlJ9jtmSwjA9Hgexmi5A0bsaT%2fmZ0fd7IaOGH6bmWeG5bZXmBB36tUFp472snObCfL7vCDmOYL9GUXhQz8SVw35kWN0PVx1%2ftScEUgJu4nFNEssOKfolcYxdcrADhh1A09y%2fjxs4tGRckwHt9wnM4UOHPYxZPfNCDKsu1D%2fEJdpedgRgM%2fURp42gZ08j779OXFSFY7nNF1PKd5cPKHi04IAg1eUaDYGuAwnPlf1uA6aCpotYIOlLDvOAYMQQxvC7uUD6ai8yW1qGEzz6M35j73Tdt9GxFV8CToGeUSNZ3kBXnMWQ%3d</a>";

  linkvar = linkvar.substring(9, (linkvar.length + 3) * .5);
  console.log(linkvar)
};

///////////////////////////////////////////////////////////////  
exports.SIP = (req, res) => {
  console.log("sip")
  const postarray = {

    email: req.body.email,
    trxn_type: req.body.trxn_type,//
    trxn_acceptance: req.body.trxn_acceptance,//
    debit_amt_type: req.body.debit_amt_type,//
    sip_paymech: req.body.sip_paymech,//
    ach_amt: req.body.ach_amt,//
    ach_fromdate: req.body.ach_fromdate,//
    ach_enddate: req.body.ach_enddate,//
    until_cancelled: req.body.until_cancelled,//
    ach_exist: req.body.ach_exist,//
    amc: req.body.amc,//
    folio: req.body.folio,//
    product_code: req.body.product_code,//
    reinvest: req.body.reinvest,//
    amt_unit_type: req.body.amt_unit_type,//
    amt_unit: req.body.amt_unit,//
    input_ref_no: req.body.input_ref_no,//
    perpetual_flag: req.body.perpetual_flag,//
    frequency: req.body.frequency,//
    periodicity: req.body.periodicity,
    period_day: req.body.period_day,
    FREEDOM_TARGET_SCHEME: req.body.FREEDOM_TARGET_SCHEME,
    FREEDOM_TENURE: req.body.FREEDOM_TENURE,
    FREEDOM_SWP_AMOUNT: req.body.FREEDOM_SWP_AMOUNT,
    all_unit: req.body.all_unit,//a
    from_date: req.body.from_date,//
    to_date: req.body.to_date,// 
    target_product: req.body.target_product
  }
  // return;
  Customer.SIP_normal(postarray.email, (err, data) => {

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
    console.log("res line 78", urs.bank_code);
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
          iin: urs.iin,
          trxn_type: postarray.trxn_type,
          dp_id: [],
          euin_opted: 'Y',
          trxn_acceptance: postarray.trxn_acceptance,
          sub_brok_arn: [],
          euin: 'E073161',
          sip_paymech: postarray.sip_paymech,
          bank: urs.bank_code,
          acc_no: resaccountNomy,
          acc_type: urs.acount_type,
          branch: urs.branch,
          micr_no: [],
          ifsc_code: urs.fscode,
          debit_amt_type: postarray.debit_amt_type,
          umrn: [],
          ach_amt: postarray.ach_amt,
          ach_fromdate: postarray.ach_fromdate,
          ach_enddate: postarray.ach_enddate,
          until_cancelled: postarray.until_cancelled,
          Bank_holder_name: urs.name,
          Bank_holder_name1: [],
          Bank_holder_name2: [],
          trxn_initiator: 'O',
          trans_count: '1',
          ach_exist: postarray.ach_exist,
          poa: 'N',
          frequency: postarray.frequency
        },
        childtrans: {
          amc: postarray.amc,
          folio: postarray.folio,
          product_code: postarray.product_code,
          source_ft_acc_no: [],
          target_product: postarray.target_product,
          target_ft_acc_no: [],
          reinvest: postarray.reinvest,
          amt_unit_type: postarray.amt_unit_type,
          amt_unit: postarray.amt_unit,
          all_unit: postarray.all_unit,
          from_date: postarray.from_date,
          to_date: postarray.to_date,
          periodicity: postarray.periodicity,
          period_day: postarray.period_day,
          input_ref_no: postarray.input_ref_no,
          perpetual_flag: postarray.perpetual_flag,
          insurance_enabled: 'N',
          GOAL_BASED_SIP: [],
          GOAL_TYPE: [],
          GOAL_AMOUNT: [],
          FREEDOM_SIP: [],
          FREEDOM_TARGET_SCHEME: postarray.FREEDOM_TARGET_SCHEME,
          FREEDOM_TENURE: postarray.FREEDOM_TENURE,
          FREEDOM_SWP_AMOUNT: postarray.FREEDOM_SWP_AMOUNT

        }
      }//service_request
    } //NMFIIService
    //else    

    console.log(ash_arrk);
    // return
    let ash_xml_agamji = jsonxml(ash_arrk);
    console.log("-->"+ash_xml_agamji);


    //console.log(ash_xml_agamji);
    axios.post('https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/SYSTRXNREG',
      ash_xml_agamji,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res22 => {
        console.log("C- Output XML - Line 946", res22)


        let result1 = convert.xml2js(res22.data, { compact: true, spaces: 4 });
        let fatcaresult = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
        let fatcaresult2 = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;

        let newdata0 = fatcaresult2[0];
        let newdata0_0 = fatcaresult2[1];
        let adddata1 = "", ashdata14 = "", ashdata15 = "", ashdata11 = "", ashdata12 = "", ashdata13 = "", ashdata5 = "", ashdata6 = "";
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
          console.log("ashC- Output XML - Link:789");
          //return       
          console.log("C- Output XML - Unique_No:", fatcaresult2.Unique_No._text)
          console.log("C- Output XML - Trxn_No:", fatcaresult2.Trxn_No._text)
          console.log("C- Output XML - Application_No:", fatcaresult2.Application_No._text)
          console.log("C- Output XML - Fund:", fatcaresult2.Fund._text)
          console.log("C- Output XML - Amt:", fatcaresult2.Amt._text)
          link_var = '';
          if (typeof fatcaresult2.Paymentlink !== 'undefined' && fatcaresult2.Paymentlink._text !== null) {
            console.log("C- Output XML - Link:", fatcaresult2.Paymentlink._text)
            link_var = fatcaresult2.Paymentlink._text;
          }
          //new
          if (typeof fatcaresult2.Folio !== 'undefined' && fatcaresult2.Folio._text !== null) {
            ashdata11 = fatcaresult2.Folio._text;

          }

          if (typeof fatcaresult2.Source_Scheme !== 'undefined' && fatcaresult2.Source_Scheme._text !== null) {
            ashdata12 = fatcaresult2.Source_Scheme._text;
          }

          if (typeof fatcaresult2.Target_Scheme !== 'undefined' && fatcaresult2.Target_Scheme._text !== null) {
            ashdata13 = fatcaresult2.Target_Scheme._text;
          }

          if (typeof fatcaresult2.Source_Scheme_Name !== 'undefined' && fatcaresult2.Source_Scheme_Name._text !== null) {
            ashdata14 = fatcaresult2.Source_Scheme_Name._text;
          }

          if (typeof fatcaresult2.Target_Scheme_Name !== 'undefined' && fatcaresult2.Target_Scheme_Name._text !== null) {
            ashdata15 = fatcaresult2.Target_Scheme_Name._text;
          }

          if (typeof fatcaresult2.Scheme !== 'undefined' && fatcaresult2.Scheme._text !== null) {
            ashdata5 = fatcaresult2.Scheme._text;
          }
          if (typeof fatcaresult2.Scheme_Name !== 'undefined' && fatcaresult2.Scheme_Name._text !== null) {
            ashdata6 = fatcaresult2.Scheme_Name._text;
          }


          userdata1 = urs.user_id;

          userdata1 = postarray.process_mode;
          userdata2 = postarray.ach_amt;
          userdata3 = postarray.ach_fromdate;
          userdata4 = postarray.client_callback_url;
          userdata5 = postarray.ach_todate;

          ashdata1 = fatcaresult2.Unique_No._text;
          ashdata2 = fatcaresult2.Trxn_No._text;
          ashdata3 = fatcaresult2.Application_No._text;
          ashdata4 = fatcaresult2.Fund._text;
          //ashdata5 = fatcaresult2.Scheme._text;
          //ashdata6 = fatcaresult2.Scheme_Name._text;
          ashdata7 = fatcaresult2.Amt._text;
          ashdata8 = fatcaresult2.Status_Desc._text;
          ashdata9 = fatcaresult2.Status_code._text;
          ashdata10 = fatcaresult2.Input_ref_no._text;


          let sql_purchase = `INSERT INTO sipregular (user_id, Unique_No, Trxn_No, Application_No, Fund, Scheme, Scheme_Name, ach_amt, process_mode, Client_callback_url, ach_fromdate, ach_todate) VALUES  ('${userdata1}', '${ashdata1}','${ashdata2}','${ashdata3}','${ashdata4}','${ashdata5}','${ashdata6}','${userdata2}','${userdata1}','${userdata4}','${userdata3}','${userdata5}')`;

          sql.query(sql_purchase, function (err, resvv) {
            console.log(sql_purchase, resvv);
            console.log("Data Saved:", resvv);
            // result(null,{ status:200, message:"Data Saved:",  data:resvv });

          });


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
              "Paymentlink": link_var.substring(9, (link_var.length + 3) * .5),
              "Folio": ashdata11,
              "Source_Scheme_Name": ashdata14,
              "Target_Scheme_Name": ashdata15,
            },
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


//multi regular SIP
exports.multi_SIP = (req, res) => {
  console.log("sipregmulti")
  const postarray = {

    email: req.body.email,
    trxn_type: req.body.trxn_type,//
    trxn_acceptance: req.body.trxn_acceptance,//
    debit_amt_type: req.body.debit_amt_type,//

    sip_paymech: req.body.sip_paymech,//
    ach_amt: req.body.ach_amt,//
    ach_fromdate: req.body.ach_fromdate,//
    ach_enddate: req.body.ach_enddate,//
    until_cancelled: req.body.until_cancelled,//

    ach_exist: req.body.ach_exist,//
    amc: req.body.amc,//
    folio: req.body.folio,//
    product_code: req.body.product_code,//
    reinvest: req.body.reinvest,//
    amt_unit_type: req.body.amt_unit_type,//
    amt_unit: req.body.amt_unit,//
    input_ref_no: req.body.input_ref_no,//
    perpetual_flag: req.body.perpetual_flag,//
    frequency: req.body.frequency,//
    periodicity: req.body.periodicity,
    period_day: req.body.period_day,
    FREEDOM_TARGET_SCHEME: req.body.FREEDOM_TARGET_SCHEME,
    FREEDOM_TENURE: req.body.FREEDOM_TENURE,
    FREEDOM_SWP_AMOUNT: req.body.FREEDOM_SWP_AMOUNT,
    all_unit: req.body.all_unit,//
    from_date: req.body.from_date,//
    to_date: req.body.to_date,//
    target_product: req.body.target_product
  }
  // return;
  Customer.SIP_normal(postarray.email, (err, data) => {

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

    var i = 0; const ash_arrch = {};
    const NMFIIService = [];
    var amc = [];
    var folio = [];
    var product_code = [];
    var reinvest = [];
    var input_ref_no = [];
    var perpetual_flag = [];
    var target_product = [];
    var amt_unit = [];
    var amt_unit_type = [];
    var all_unit = [];
    var from_date = [];
    var to_date = [];
    var periodicity = [];
    var period_day = [];

    ash_arrch.NMFIIService = NMFIIService;
    let ash_arrk = {
      service_request: {
        appln_id: 'MFS21399',
        password: 'CO3062WOJ1RPXM19',
        broker_code: 'ARN-21399',
        iin: urs.iin,
        trxn_type: postarray.trxn_type,
        dp_id: [],
        euin_opted: 'Y',
        trxn_acceptance: postarray.trxn_acceptance,
        sub_brok_arn: [],
        euin: 'E073161',
        sip_paymech: postarray.sip_paymech,
        bank: urs.bank_code,
        acc_no: resaccountNomy,
        acc_type: 'M',//urs.acount_type,
        branch: urs.branch,
        micr_no: [],
        ifsc_code: urs.fscode,
        debit_amt_type: postarray.debit_amt_type,
        umrn: [],
        ach_amt: postarray.ach_amt,
        ach_fromdate: postarray.ach_fromdate,
        ach_enddate: postarray.ach_enddate,
        until_cancelled: postarray.until_cancelled,
        Bank_holder_name: urs.name,
        Bank_holder_name1: [],
        Bank_holder_name2: [],
        trxn_initiator: 'O',
        trans_count: req.body.childArr.length,
        ach_exist: postarray.ach_exist,
        poa: 'N',
        frequency:postarray.frequency
      },
    }

    ash_arrch.NMFIIService.push(ash_arrk);
    console.log("-->"+ash_arrk);
    console.log(req.body.childArr.length)

    childtrans = [];
    if (req.body.childArr.length > 1) {
      req.body.childArr.forEach(element => {
        //console.log(element.return_msg._text);

        amc[i] = element.amc,
          folio[i] = element.folio,
          product_code[i] = element.product_code,
          reinvest[i] = element.reinvest,
          input_ref_no[i] = element.input_ref_no,
          perpetual_flag[i] = element.perpetual_flag,

          target_product[i] = element.target_product,
          amt_unit[i] = element.amt_unit,
          amt_unit_type[i] = element.amt_unit_type,
          all_unit[i] = element.all_unit,
          from_date[i] = element.from_date,
          to_date[i] = element.to_date,
          periodicity[i] = element.periodicity,
          period_day[i] = element.period_day


        let childtrans1 = {
          childtrans: {
            amc: amc[i],
            folio: folio[i],
            product_code: product_code[i],
            source_ft_acc_no: [],
            reinvest: reinvest[i],
            input_ref_no: input_ref_no[i],
            perpetual_flag: perpetual_flag[i],
            insurance_enabled: 'N',
            target_product: target_product[i],
            amt_unit: amt_unit[i],
            amt_unit_type: amt_unit_type[i],
            all_unit: all_unit[i],
            from_date: from_date[i],
            to_date: to_date[i],
            periodicity: periodicity[i],
            period_day: period_day[i],
            GOAL_BASED_SIP: 'N'
          }
        }
        ash_arrch.NMFIIService.push(childtrans1);
        i++;
        childtrans1 = "";
        //console.log(ash_arrch.childtrans);

      });

    } else {
      //console.log(req.body.childArr[0].amc);
      // return
      let ash_arrchf = {
        childtrans: {
          amc: req.body.childArr[0].amc,
          folio: req.body.childArr[0].folio,
          product_code: req.body.childArr[0].product_code,
          reinvest: req.body.childArr[0].reinvest,
          input_ref_no: req.body.childArr[0].input_ref_no,
          perpetual_flag: req.body.childArr[0].perpetual_flag,
          insurance_enabled: 'N',

          target_product: req.body.childArr[0].target_product,
          amt_unit: req.body.childArr[0].amt_unit,
          amt_unit_type: req.body.childArr[0].amt_unit_type,
          all_unit: req.body.childArr[0].all_unit,
          from_date: req.body.childArr[0].from_date,
          to_date: req.body.childArr[0].to_date,
          periodicity: req.body.childArr[0].periodicity,
          period_day: req.body.childArr[0].period_day,
          GOAL_BASED_SIP: 'N'

        }
      }

      ash_arrch.NMFIIService.push(ash_arrchf);
    }
    //return;
    console.log(ash_arrch);
    let ash_xml_agamji = jsonxml(ash_arrch);
    console.log("-->"+ash_xml_agamji);
    axios.post('https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/SYSTRXNREG',
      ash_xml_agamji,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res22 => {
        console.log("C- Output XML - Line 946", res22)

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

        let ashdata1 = "", ashdata2 = "", ashdata3 = "", ashdata4 = "", ashdata5 = "", ashdata6 = "", ashdata7 = "", ashdata8 = "",
          ashdata9 = "", ashdata10 = "", ashdata11 = "", ashdata12 = "", ashdata13 = "", ashdata14 = "", ashdata15 = "", ashdata16 = "";
        resarr = [];

        if (fatcaresult == 0) {
          console.log("C- Output XML - Unique_No:");
          if (Array.isArray(fatcaresult2) && fatcaresult2.length) {

            fatcaresult2.forEach(element => {
              console.log("C- Output XML - Unique_No:", element.Unique_No._text);

              if (typeof element.Unique_No !== 'undefined' && element.Unique_No._text !== null) {
                ashdata1 = element.Unique_No._text;
                console.log("C- OutputUnique_No:", element.Unique_No._text)
              }
              if (typeof element.Trxn_No !== 'undefined' && element.Trxn_No._text !== null) {
                ashdata2 = element.Trxn_No._text;
                console.log("C- Output XML - Trxn_No:", element.Trxn_No._text)
              }
              if (typeof element.Application_No !== 'undefined' && element.Application_No._text !== null) {
                ashdata3 = element.Application_No._text;
                console.log("C- Output XML - Application_No:", element.Application_No._text)
              }
              if (typeof element.Fund !== 'undefined' && element.Fund._text !== null) {
                ashdata4 = element.Fund._text;
                console.log("C- Output XML - Fund:", element.Fund._text)
              }
              if (typeof element.Source_Scheme !== 'undefined' && element.Source_Scheme._text !== null) {
                ashdata5 = element.Source_Scheme._text;
                console.log("C- Output XML - Scheme:", element.Source_Scheme._text)
              }

              if (typeof element.Scheme_Name !== 'undefined' && element.Scheme_Name._text !== null) {
                ashdata6 = element.Scheme_Name._text;
                console.log("C- Output XML - Scheme_Name:", element.Scheme_Name._text)
              }
              if (typeof element.Amt !== 'undefined' && element.Amt._text !== null) {
                ashdata7 = element.Amt._text;
                console.log("C- Output XML - Amt:", element.Amt._text)
              }

              if (typeof element.Status_Desc !== 'undefined' && element.Status_Desc._text !== null) {
                ashdata8 = element.Status_Desc._text;
                console.log("C- Output XML - Status_Desc:", element.Status_Desc._text)
              }
              if (typeof element.Status_code !== 'undefined' && element.Status_code._text !== null) {
                ashdata9 = element.Status_code._text;
                console.log("C- Output XML - Status_code:", element.Status_code._text)
              }
              if (typeof element.Input_ref_no !== 'undefined' && element.Input_ref_no._text !== null) {
                ashdata10 = element.Input_ref_no._text;
                console.log("C- Output XML - Input_ref_no:", element.Input_ref_no._text)
              }
              if (typeof element.Folio !== 'undefined' && element.Folio._text !== null) {
                ashdata12 = element.Folio._text;
                console.log("C- Output XML - Folio:", element.Folio._text)
              }
              if (typeof element.Target_Scheme !== 'undefined' && element.Target_Scheme._text !== null) {
                ashdata13 = element.Target_Scheme._text;
                console.log("C- Output XML - Target_Scheme:", element.Target_Scheme._text)
              }
              if (typeof element.Target_Scheme_Name !== 'undefined' && element.Target_Scheme_Name._text !== null) {
                ashdata14 = element.Target_Scheme_Name._text;
                console.log("C- Output XML - Folio:", element.Target_Scheme_Name._text)
              }
              if (typeof element.Frequency !== 'undefined' && element.Frequency._text !== null) {
                ashdata15 = element.Frequency._text;
                console.log("C- Output XML - Frequency:", element.Frequency._text)
              }
              if (typeof element.No_instalments !== 'undefined' && element.No_instalments._text !== null) {
                ashdata16 = element.No_instalments._text;
                console.log("C- Output XML - No_instalments:", element.No_instalments._text)
              }

              userdata1 = urs.user_id;
              userdata2 = postarray.sub_trxn_type;
              userdata3 = postarray.trxn_acceptance;
              userdata4 = postarray.payment_mode;
              userdata5 = postarray.instrm_amount;
              userdata6 = postarray.debit_amount_type;
              userdata7 = postarray.Return_paymnt_flag;
              userdata8 = postarray.Client_callback_url;
              userdata9 = postarray.ach_exist;
              userdata10 = postarray.amc;
              userdata11 = postarray.product_code;
              userdata12 = postarray.reinvest;
              userdata13 = postarray.input_ref_no;
              userdata14 = postarray.perpetual_flag;
              userdata15 = postarray.instrm_date;
              userdata16 = postarray.rtgs_code;
              userdata17 = postarray.umrn;
              userdata18 = postarray.amount;

              let rearr = {
                Unique_No: ashdata1,
                Trxn_No: ashdata2,
                Application_No: ashdata3,
                Fund: ashdata4,
                Scheme: ashdata5,
                Scheme_Name: ashdata6,
                Amt: ashdata7,
                Status_Desc: ashdata8,
                Status_code: ashdata9,
                Input_ref_no: ashdata10,
                //Paymentlink: ashdata11,
                Target_Scheme: ashdata13,
                Target_Scheme_Name: ashdata14,
                Frequency: ashdata15,
                No_instalments: ashdata16,
                Folio: ashdata12,

              }
              resarr.push(rearr);

              let sql_purchase = `INSERT INTO sipregular (user_id, Unique_No, Trxn_No, Application_No, Fund, Scheme, Scheme_Name, ach_amt, process_mode, Client_callback_url, ach_fromdate, ach_todate) VALUES ('${userdata1}', '${ashdata1}','${ashdata2}','${ashdata3}','${ashdata4}','${ashdata5}','${ashdata6}','${userdata2}','${userdata1}','${userdata4}','${userdata3}','${userdata5}')`;

              sql.query(sql_purchase, function (err, resvv) {
                //console.log(sql_purchase,resvv);
                console.log("Data Saved:", resvv);
                //result(null, { status: 200, message: "Data Saved:", data: resvv });
              });
            });

          }
          else {
            if (typeof fatcaresult2.Unique_No !== 'undefined' && fatcaresult2.Unique_No._text !== null) {
              ashdata1 = fatcaresult2.Unique_No._text;
              console.log("C- Output XML - Unique_No:", fatcaresult2.Unique_No._text)
            }
            if (typeof fatcaresult2.Trxn_No !== 'undefined' && fatcaresult2.Trxn_No._text !== null) {
              ashdata2 = fatcaresult2.Trxn_No._text;
              console.log("C- Output XML - Trxn_No:", fatcaresult2.Trxn_No._text)
            }
            if (typeof fatcaresult2.Application_No !== 'undefined' && fatcaresult2.Application_No._text !== null) {
              ashdata3 = fatcaresult2.Application_No._text;
              console.log("C- Output XML - Application_No:", fatcaresult2.Application_No._text)
            }
            if (typeof fatcaresult2.Fund !== 'undefined' && fatcaresult2.Fund._text !== null) {
              ashdata4 = fatcaresult2.Fund._text;
              console.log("C- Output XML - Fund:", fatcaresult2.Fund._text)
            }
            if (typeof fatcaresult2.Scheme !== 'undefined' && fatcaresult2.Scheme._text !== null) {
              ashdata5 = fatcaresult2.Scheme._text;
              console.log("C- Output XML - Scheme:", fatcaresult2.Scheme._text)
            }

            if (typeof fatcaresult2.Scheme_Name !== 'undefined' && fatcaresult2.Scheme_Name._text !== null) {
              ashdata6 = fatcaresult2.Scheme_Name._text;
              console.log("C- Output XML - Scheme_Name:", fatcaresult2.Scheme_Name._text)
            }
            if (typeof fatcaresult2.Amt !== 'undefined' && fatcaresult2.Amt._text !== null) {
              ashdata7 = fatcaresult2.Amt._text;
              console.log("C- Output XML - Amt:", fatcaresult2.Amt._text)
            }

            if (typeof fatcaresult2.Status_Desc !== 'undefined' && fatcaresult2.Status_Desc._text !== null) {
              ashdata8 = fatcaresult2.Status_Desc._text;
              console.log("C- Output XML - Status_Desc:", fatcaresult2.Status_Desc._text)
            }
            if (typeof fatcaresult2.Status_code !== 'undefined' && fatcaresult2.Status_code._text !== null) {
              ashdata9 = fatcaresult2.Status_code._text;
              console.log("C- Output XML - Status_code:", fatcaresult2.Status_code._text)
            }
            if (typeof fatcaresult2.Input_ref_no !== 'undefined' && fatcaresult2.Input_ref_no._text !== null) {
              ashdata10 = fatcaresult2.Input_ref_no._text;
              console.log("C- Output XML - Input_ref_no:", fatcaresult2.Input_ref_no._text)
            }
            if (typeof fatcaresult2.Folio !== 'undefined' && fatcaresult2.Folio._text !== null) {
              ashdata12 = fatcaresult2.Folio._text;
              console.log("C- Output XML - Folio:", fatcaresult2.Folio._text)
            }

            userdata1 = urs.user_id;
            userdata2 = postarray.sub_trxn_type;
            userdata3 = postarray.trxn_acceptance;
            userdata4 = postarray.payment_mode;
            userdata5 = postarray.instrm_amount;
            userdata6 = postarray.debit_amount_type;
            userdata7 = postarray.Return_paymnt_flag;
            userdata8 = postarray.Client_callback_url;
            userdata9 = postarray.ach_exist;
            userdata10 = postarray.amc;
            userdata11 = postarray.product_code;
            userdata12 = postarray.reinvest;
            userdata13 = postarray.input_ref_no;
            userdata14 = postarray.perpetual_flag;
            userdata15 = postarray.instrm_date;
            userdata16 = postarray.rtgs_code;
            userdata17 = postarray.umrn;
            userdata18 = postarray.amount;

            let rearr = {
              Unique_No: ashdata1,
              Trxn_No: ashdata2,
              Application_No: ashdata3,
              Fund: ashdata4,
              Scheme: ashdata5,
              Scheme_Name: ashdata6,
              Amt: ashdata7,
              Status_Desc: ashdata8,
              Status_code: ashdata9,
              Input_ref_no: ashdata10,
              //Paymentlink: ashdata11,
              Folio: ashdata12,
              Target_Scheme: ashdata13,
              Target_Scheme_Name: ashdata14,
              Frequency: ashdata15,
              No_instalments: ashdata16,
            }
            resarr.push(rearr);

            let sql_purchase = `INSERT INTO sipregular (user_id, Unique_No, Trxn_No, Application_No, Fund, Scheme, Scheme_Name, ach_amt, process_mode, Client_callback_url, ach_fromdate, ach_todate) VALUES ('${userdata1}', '${ashdata1}','${ashdata2}','${ashdata3}','${ashdata4}','${ashdata5}','${ashdata6}','${userdata2}','${userdata1}','${userdata4}','${userdata3}','${userdata5}')`;

            sql.query(sql_purchase, function (err, resvv) {
              //console.log(sql_purchase, resvv);
              console.log("Data Saved:", resvv);
              //result(null, { status: 200, message: "Data Saved:", data: resvv });
            });

          }
        }
        else {

          if (Array.isArray(fatcaresult2) && fatcaresult2.length) {
            fatcaresult2.forEach(element => {
              // console.log(element.return_msg._text);
              if (typeof element.return_msg !== 'undefined' && element.return_msg._text !== null) {
                msg = msg + element.return_msg._text + '||';
              }
            });
            //console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
            //console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
          }
          else {
            //console.log("ashC- Output XML - Link:827");
            console.log(fatcaresult2.return_msg._text);
            msg = fatcaresult2.return_msg._text;
          }
          //console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
          //console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
        }


        let agmess = '';

        if (fatcaresult == 0) {
          agmess = {
            status: 200,
            message: "Successfull",
            data: resarr,
            //data: { "Unique_No": ashdata1, "Trxn_No": ashdata2, "Application_No": ashdata3, "Fund": ashdata4, "Scheme": ashdata5, "Scheme_Name": ashdata6, "Amt": ashdata7, "Status_Desc": ashdata8, "Status_code": ashdata9, "Input_ref_no": ashdata10, "Paymentlink": link_var.substring(9, (link_var.length + 3) * .5), },
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

