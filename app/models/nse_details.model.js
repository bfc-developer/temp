const sql = require("./db.js");
const Nse_details = function (nse_details) {

};


Nse_details.mandate_normal = (email, result) => {
  //let sqlquery="SELECT * FROM users INNER JOIN user_bank ON users.id=user_bank.user_id where user_bank.isprimary_bank=1 and users.email='"+`${email}`+"'";
  let sqlquery = "SELECT * FROM users INNER JOIN user_bank ON users.id=user_bank.user_id INNER JOIN bank_accout_type ON user_bank.acoount_type=bank_accout_type.id where user_bank.isprimary_bank=1 and users.email='" + `${email}` + "'";
  sql.query(sqlquery, (err, res) => {
    //sql.query("SELECT * FROM users where email='"+`${email}`+"'", (err, res) => {    
    console.log("m- line 351 ")
    if (Array.isArray(res) && res.length) {
      if (res[0].hasOwnProperty('email')) {
        let u_id = res[0].id;
        //console.log("m- line 355 ",sqlquery)
        result(null, res);
      }
    }
    else {
      console.log("m- line 355 ", sqlquery)
      //console.log("m- line 358 ")
      result(null, res);
    }
  });
  //return
};

//used in getMandateList API
Nse_details.getmandatelist = (email, result) => {
  let sqlquery = "SELECT *, users.id as uid FROM users INNER JOIN user_bank ON users.id=user_bank.user_id where user_bank.isprimary_bank=1 and users.email='" + `${email}` + "'";
  console.log(sqlquery)

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



module.exports = Nse_details;
