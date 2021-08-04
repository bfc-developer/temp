const sql = require("./db.js");
const axios = require('../../node_modules/axios');
const jsonxml = require('../../node_modules/jsontoxml');
const CircularJSON = require('../../node_modules/circular-json');
var convert = require('../../node_modules/xml-js');
const Extras = function (extras) {
};

///////////////////////
Extras.getIINStatus = (mydata, result) => {
  var varf = "N";
  let ash_json = {
    NMFIIService: {
      service_request: {
        appln_id: 'MFS21399',
        password: 'CO3062WOJ1RPXM19',
        broker_code: 'ARN-21399',
      }
    }
  } //else
  console.log("start");
  let xml_ash = jsonxml(ash_json);
  axios.post('https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/ALLIINDETAILS',
    xml_ash,
    {
      headers:
        { 'Content-Type': 'text/xml' }
    }).then(res22 => {

      // let res1 = convert.xml2js(res.data, {compact: true, spaces: 4});
      //  let fatcaresult=res1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
      // let fatcaresult2=res1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code;
      let result1 = convert.xml2js(res22.data, { compact: true, spaces: 4 });
      let fatcaresult2 = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;

      var productarray = result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;

      var inc = 0;

      productarray.forEach(function (item) {

        //  console.log("C- Output XML - Line 950", result1)
        //   console.log("C- Output XML - Line 951", fatcaresult)
        //  console.log("C- Output XML - Line 956", fatcaresult2)
        //console.log("i am cool 880");
        //var gi=typeof fatcaresult2[0].return_msg;
        //console.log("c- 881- ", gi);

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

        // return
        //if(fatcaresult==0){    
        //console.log(fatcaresult2); 
        //if (Array.isArray(fatcaresult2) && fatcaresult2.length) {
        //fatcaresult22= CircularJSON.stringify(fatcaresult)
        //fatcaresult2.forEach(element => {
        // var temp = item;
        //  console.log(res22.data.ValidatePANResult.IsEKYCVerified);
        //  if (res22.data.ValidatePANResult.IsEKYCVerified == "Y") {

        //console.log(fatcaresult22);           

        //}
        // })
        // }
        //  }
        // console.log("NSEBanksList: ", res);
        //result(null, res22);

        var temp3 = item.ACTIVATION_STATUS._text;
        if (temp3 == "YES") {
          var temp4 = item.FH_PAN_NO._text;
          // console.log(temp4)
          if (temp4 == mydata.Pan_No) {
            console.log("Pan No. Found")
            varf = "Y";
            let rearr = {
              CUSTOMER_ID: item.CUSTOMER_ID._text,
              INVESTOR_NAME: item.INVESTOR_NAME._text,
              FH_PAN_NO: item.FH_PAN_NO._text,
              TAX_STATUS_CODE: item.TAX_STATUS_CODE._text,
              TAX_STATUS_DESC: item.TAX_STATUS_DESC._text,
              HOLD_N_CODE: item.HOLD_N_CODE._text,
              HOLD_NATURE_DESC: item.HOLD_NATURE_DESC._text,
              CREATED_DATE: item.CREATED_DATE._text,
            }
            result(null, { status: 200, message: "Pan No. found", data: rearr });
            return
          }
        }
        inc = inc++

      });
      if (varf == "N") {
        console.log("Pan No. not found");
        result(null, { status: 200, message: "Pan No. not found" });
      }
    });
};

/////////////////////////
Extras.getBasketList = (Req_array, result) => {
  // console.log("mm-line-374",Req_array)
  let Tr_Type = Req_array.Tr_Type;
  let anchoring = Req_array.anchoring;

  let constellation = Req_array.constellation;

  console.log("m-- data is ", Tr_Type);

  let QS2 = '';
  if (typeof anchoring !== "undefined") {

    QS2 = " and anchoring Like '%" + `${anchoring}` + "%' "
  }


  let QS = '';
  if (typeof constellation !== "undefined") {

    QS = " and constellation Like '%" + `${constellation}` + "%' "
  }


  let cQS = `SELECT * FROM advisory_scheme where transaction_type='${Tr_Type}' ${QS} ${QS2}`

  sql.query(cQS, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    let datacnt = res.length;


    console.log("the product data are: ", res);
    mking = {
      data_count: datacnt,
      data_result: res,
      data_query: cQS

    }

    result(null, mking);
  });
};

/////////////////////////
Extras.getisin = (Req_array, result) => {

  console.log("mm-line-374", Req_array)
  let isin = Req_array.isin;
  let anchoring = Req_array.anchoring;

  let constellation = Req_array.constellation;

  console.log("m-- data is ", isin);

  let QS2 = '';
  if (typeof anchoring !== "undefined") {

    QS2 = " and anchoring Like '%" + `${anchoring}` + "%' "
  }


  let QS = '';
  if (typeof constellation !== "undefined") {

    QS = " and constellation Like '%" + `${constellation}` + "%' "
  }


  let cQS = `SELECT * FROM products where isin='${isin}' ${QS} ${QS2}`

  sql.query(cQS, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    let datacnt = res.length;


    console.log("the product data are: ", res);
    mking = {
      data_count: datacnt,
      data_result: res,
      data_query: cQS

    }

    result(null, mking);
  });
};

//GETIINDETAILS
Extras.getUserData = (email,result) => {
  let sqlquery = "SELECT * FROM users where users.email='" + `${email}` + "'";
  // console.log(sqlquery)
  sql.query(sqlquery, (err, res) => {
    if (Array.isArray(res) && res.length) {
      if (res[0].hasOwnProperty('email')) {
        let u_id = res[0].id;
        result(null, res);
      }
    }
    else {
      result(null, res);
    }
  });

};

Extras.validateKyc = result => {
  console.log("Starting");
  var hdh = "SELECT * FROM users WHERE kyc_sts ='0'";
  //  console.log(hdh);
  sql.query(hdh, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      // console.log("found users: ", res[0]);
      var kycarray = res;
      kycarray.forEach(function (item) {
        var temp = item.phone;
        var tmp_pan = item.pan_card;
        var temp2 = item.email;
        var temp3 = item.name;
        console.log(temp2);
        let ash_xml_agamji = {
          "channelId": "60242ce0d9ae7120b4e37e61",
          "limitLength": 100,
          "skipLength": 0,
          "status": "all"
        } //else
        console.log("start chk");
        axios.post('https://multi-channel.signzy.tech/api/onboardings/pullonboardings',
          ash_xml_agamji,
          {
            headers:
            {
              'Authorization': 'j6lkepXXhGPCYqgWkw2EMZEjJpX82jkvnVYnWF3DkmTt3TXL55Uv8hIy0HL62Oj2'
            }
          }).then(res22 => {
            //  console.log("asas");
            var kycarray22 = res22.data.result;
            kycarray22.forEach(function (item) {

              console.log(item.verificationData.formData.panNumber);
              // return
              if (item.verificationData.formData.panNumber == tmp_pan) {
                if (item.status == "accepted") {

                  // http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=bfccapital&Password=obmh6034OB&SenderID=BFCCAP&Phno=9598848185&Msg=Your a/c no. XXXXXXX2719 is credited by Rs.1.02 on -SIGNZY TECHNOLOGIES
                  smsurl = "http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=bfccapital&Password=obmh6034OB&SenderID=BFCCAP&Phno=" + temp + "&Msg=Dear " + temp3 + ", \nYour KYC [" + tmp_pan + "] has been completed successfully.Please proceed with IIN and Mandate registration. \n\n App Link: https://play.google.com/store/apps/details?id=tvs.com.bfc \nWebsite Link: https://bfccapital.com/";
                  //smsurl = "https://prodigylive.herokuapp.com/getNSEBank";// for testing purpose
                  axios.get(smsurl).then(
                    (response) => {
                      var result = response.data;
                      console.log('Sending SMS');

                      var nodemailer = require('nodemailer');

                      console.log("bef ggggdsds");
                      var transporter = nodemailer.createTransport({
                        host: 'mail.bfccapital.com',
                        port: 465,
                        secure: true,

                        auth: {
                        user: "customersupport@bfccapital.com",
                        pass: "customersupport@123"
                        }
                      
                    });

                      transporter.verify(function (error, success) {
                        if (error) {
                          console.log("Error");
                        } else {
                          console.log("Server is ready to take our messages!");
                        }
                      });

                      let mailOptions = {
                        from: "customersupport@bfccapital.com",
                        to: temp2,
                        //cc: "ashishguptabfcinfotech@gmail.com",
                        subject: "KYC INFO",
                        html: "Dear " + temp3 + ",<br><br>Your KYC (" + tmp_pan + ") has been completed. Please proceed with IIN & Mandate registration.<br><br>App Link:<br> https://play.google.com/store/apps/details?id=tvs.com.bfc&hl=en_IN&gl=US<br><br>Website Link:<br> https://bfccapital.com"
                      }
                      transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                    },
                    (error) => {
                      console.log(error);
                    }
                  ); //axi

                }

              }//if

            })

          });//end axi

      });//end for
    }

    // console.log("NSEBanksList: ", res);
    result(null, res);
  });
};

module.exports = Extras;
