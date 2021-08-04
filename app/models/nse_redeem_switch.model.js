const sql = require("./db.js");
const Nse_redeem_switch = function (nse_redeem_switch) {

};

Nse_redeem_switch.redeem = (email, result) => {
  let sqlquery = "SELECT * FROM users INNER JOIN user_bank ON users.id=user_bank.user_id where user_bank.isprimary_bank=1 and users.email='" + `${email}` + "'";

  sql.query(sqlquery, (err, res) => {
    //sql.query("SELECT * FROM users where email='"+`${email}`+"'", (err, res) => {    
    //console.log("m- line 351 ")
    if (Array.isArray(res) && res.length) {
      if (res[0].hasOwnProperty('email')) {
        let u_id = res[0].id;
        //console.log(sqlquery,u_id)
        result(null, res);
      }
    }
    else {
      //console.log(sqlquery)
      result(null, res);
    }
  });

};


Nse_redeem_switch.switch = (email, result) => {
  let sqlquery = "SELECT * FROM users INNER JOIN user_bank ON users.id=user_bank.user_id where user_bank.isprimary_bank=1 and users.email='" + `${email}` + "'";

  sql.query(sqlquery, (err, res) => {
    //sql.query("SELECT * FROM users where email='"+`${email}`+"'", (err, res) => {    
    //console.log("m- line 351 ")
    if (Array.isArray(res) && res.length) {
      if (res[0].hasOwnProperty('email')) {
        let u_id = res[0].id;
        //console.log(sqlquery,u_id)
        result(null, res);
      }
    }
    else {
      //console.log(sqlquery)
      result(null, res);
    }
  });

};



module.exports = Nse_redeem_switch;
