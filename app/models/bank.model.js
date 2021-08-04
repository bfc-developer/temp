const sql = require("./db.js");
const Bank = function (bank) {

};


Bank.getUserDetails = (mydata, result) => {
  let email = mydata.email;
  let msg = "";
  sql.query(`SELECT * FROM users where users.email='${email}'`, (err, ress) => {
    console.log("User Data: ", ress);

    if (ress.length) {
      console.log("User details found");
      //result(null,{ status:200, message:"Bank details found successfully ",  data:res });
      msg = ress;
      //return;
    }
    else {
      console.log("User details not found");
      //result(null,{ status:200, message:"User details not found ",  data:res });

    }
  });

  sql.query(`SELECT user_bank.* FROM user_bank INNER JOIN users on users.id=user_bank.user_id where users.email='${email}'`, (err, res) => {
    console.log("Bank Details: ", res);

    if (res.length) {
      console.log("Bank details found");

      //result(null,{ status:200, message:"User details found successfully ",  data:res });
      //msg=msg+res;
      //res.json({ status:200, message:msg,data11:"Validation Error" });
      result(null, { status: 200, message: "Bank Details and User details found successfully ", data: { "User": msg, "Bank": res } });
    }
    else {
      console.log("Bank details not found");
      result(null, { status: 200, message: "Bank details not found " });
    }
  });
};


//////////////////////////////////////////
Bank.change_bank = (email, bank_id, result) => {
  let sqlquery = "SELECT *,user_bank.id as bid FROM users INNER JOIN user_bank ON users.id=user_bank.user_id where users.email='" + `${email}` + "'";

  sql.query(sqlquery, (err, res) => {
    if (Array.isArray(res) && res.length) {

      let my_user_id = res[0].user_id;
      let my_bank_id = bank_id;
      console.log("Email found");
      let sql_userbank = "update user_bank set isprimary_bank=0 where user_id=" + `${my_user_id}`;

      sql.query(sql_userbank, function (err, resvv) {

        console.log("Bank Details updated to 0: ", my_user_id);

        sql_userbank = "update user_bank set isprimary_bank=1 where user_id=" + `${my_user_id}` + " and id=" + `${my_bank_id}`;

        sql.query(sql_userbank, function (err, resvv) {
          console.log("sql: ", sql_userbank);
          if (resvv.affectedRows > 0) {
            console.log("Bank Details updated: ", resvv);
            result(null, { status: 200, message: "Bank Details updated " });
            return
          }
          else {
            console.log("Bank Details not updated, bankid not found : ", resvv);
            result(null, { status: 400, message: "Bank Details not updated, bankid not found." });
          }
        });
      });

    }
    else {
      console.log("Email not found");
      console.log(sqlquery)
      result(null, { status: 400, message: "Email not found " });
    }
  });

};

//////////////////////////////////////////
Bank.delete_bank = (email, bank_id, result) => {
  let sqlquery = "SELECT *,user_bank.id as bid FROM users INNER JOIN user_bank ON users.id=user_bank.user_id where users.email='" + `${email}` + "'";

  sql.query(sqlquery, (err, res) => {
    if (Array.isArray(res) && res.length) {

      let my_user_id = res[0].user_id;
      let my_bank_id = bank_id;
      console.log("Email found");

      sql_userbank = "delete from user_bank where user_id=" + `${my_user_id}` + " and id=" + `${my_bank_id}`;

      sql.query(sql_userbank, function (err, resvv) {
        console.log("sql: ", sql_userbank);
        if (resvv.affectedRows > 0) {
          console.log("Bank Details deleted: ", resvv);
          //console.log("created customer: ",resvv);
          //result(null,{ status:200, message:"Bank Details added ",  data:resvv });
          result(null, { status: 200, message: "Bank Details deleted " });
          return
        }
        else {
          console.log("Bank Details not deleted, bankid not found : ", resvv);
          result(null, { status: 400, message: "Bank Details not deleted, bankid not found." });
        }
      });


    }
    else {
      console.log("Email not found");
      console.log(sqlquery)
      result(null, { status: 400, message: "Email not found" });
    }
  });

};


Bank.findByemailide = (mydata, result) => {
  let email = mydata.email;
  sql.query(`SELECT user_bank.* FROM user_bank INNER JOIN users on users.id=user_bank.user_id where users.email='${email}'`, (err, res) => {
    console.log("banks: ", res);

    if (res.length) {
      console.log("Bank details found");
      result(null, { status: 200, message: "Bank details found successfully ", data: res });
      return;
    }
    else {
      console.log("Bank details not found");
      result(null, { status: 200, message: "Bank details not found ", data: res });
    }
  });
};




Bank.m_addBankDetail = (inputData, result) => {

  console.log("m-line29", inputData);

  sql.query(`SELECT * FROM users WHERE email = '${inputData.email}'`, (err, res) => {
    if (res.length) {
      let my_user_id = res[0].id;
      inputData.user_id = my_user_id;
      console.log("Email found");
      let sql_userbank = `INSERT INTO user_bank (user_id,bank_name,acoount_type,branch,accountNo,fscode,isprimary_bank,bank_code) VALUES ('${inputData.user_id}', '${inputData.name}','${inputData.account_type}','${inputData.branch}','${inputData.accountno}','${inputData.ifsc}',0,'${inputData.bank_code}')`;

      sql.query(sql_userbank, function (err, resvv) {

        console.log("created bank: ", resvv);
        result(null, { status: 200, message: "Bank Details added ", data: resvv });

      });
      return;
    }
    else {
      console.log("Email not found");
      result(null, { status: 200, message: "Email not found in users table ." });
    }
  })
};

/////////////////////////////////////////


Bank.getAllProducts = (Req_array, result) => {
  // console.log("mm-line-374",Req_array)
  let AMC_CODE = Req_array.AMC_CODE;
  let ASSET_CLASS = Req_array.ASSET_CLASS;

  let REINVEST_TAG = Req_array.REINVEST_TAG;
  let DIV_GW = Req_array.DIV_GW;



  console.log("m-- data is ", REINVEST_TAG);


  if (typeof ASSET_CLASS !== "undefined") {
    ASSET_CLASS = Req_array.ASSET_CLASS.toLowerCase();
    if (ASSET_CLASS === 'equity') {
      ASSET_CLASS_text = 'EQ';
    } else if (ASSET_CLASS === 'debt' || ASSET_CLASS === 'income' || ASSET_CLASS === 'cash') {
      ASSET_CLASS_text = 'DEBT';
    } else {

      ASSET_CLASS = undefined
    }

  }


  //SELECT * FROM `products` WHERE `PRODUCT_LONG_NAME` LIKE '%Div.%' or PRODUCT_LONG_NAME LIKE '%Dividend%' ORDER BY `PRODUCT_LONG_NAME` ASC

  let QS2 = '';
  if (typeof DIV_GW !== "undefined") {
    DIV_GW = Req_array.DIV_GW.toUpperCase();

    if (DIV_GW === "DIVIDEND") {

      QS2 = " and ( PRODUCT_LONG_NAME Like '%Div.%' or  PRODUCT_LONG_NAME Like '%Dividend%' ) "
    } else if (DIV_GW === "GROWTH") {
      QS2 = " and ( PRODUCT_LONG_NAME Like '%GW.%' or  PRODUCT_LONG_NAME Like '%Growth%' or  PRODUCT_LONG_NAME Like '%GW%' ) "
    } else {
      QS2 = "and 1=1"
    }
  }










  let QS1 = '';
  if (typeof REINVEST_TAG !== "undefined") {

    if (REINVEST_TAG === "Y") {
      QS1 = " and REINVEST_TAG='Y'"
    } else if (REINVEST_TAG === "Z" || REINVEST_TAG === "X" || REINVEST_TAG === "N") {
      QS1 = " and REINVEST_TAG!='Y' "
    } else {
      QS1 = "and 1=1"
    }
  }









  // var x=ASSET_CLASS;
  let QS = '';
  if (typeof ASSET_CLASS === "undefined") {
    QS = "and 1=1"
  } else {
    QS = " and ASSET_CLASS Like '%" + `${ASSET_CLASS_text}` + "%' "
  }





  let cQS = `SELECT * FROM products where 1=1 and AMC_CODE='${AMC_CODE}' ${QS}  ${QS1} ${QS2}`

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

//////////////////////////////
Bank.getAllnsebank = result => {
  sql.query("SELECT * FROM banks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("NSEBanksList: ", res);
    result(null, res);
  });
};

/////////////////////////


Bank.findByIdusers = (customerId, result) => {
  //console.log("sdfsdfsdf1111111 ", sql);
  var hdh = "SELECT * FROM users WHERE email ='" + `${customerId}` + "'";
  console.log(hdh);
  sql.query(hdh, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};



module.exports = Bank;
