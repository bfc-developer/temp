const sql = require("./db.js");

const axios = require('axios');
var chk = "";
const Goals = function (goals) {

};

Goals.getmastergoaldata = (mydata, result) => {
  let email = mydata.email;
  let msg = "";
  sql.query(`SELECT * FROM goal_master`, (err, res) => {
    console.log("User Goal details found: ", res);

    if (res.length) {
      console.log(" Goals details found");


      result(null, { status: 200, message: "Goals details found successfully ", data: res });
    }
    else {
      console.log("Goals details not found");
      result(null, { status: 200, message: "Goals details not found " });
    }
  });
};

Goals.getusergoaldata = (mydata, result) => {
  let email = mydata.email;
  let msg = "";
  sql.query(`SELECT * , goal_user.id as goaluserid FROM goal_master,goal_user where goal_user.emailid='${email}' and goal_user.goalid=goal_master.id`, (err, res) => {
    console.log("User Goal details found: ", res);

    if (res.length) {
      console.log("User Goal details found");


      result(null, { status: 200, message: "User Goal details found successfully ", data: res });
    }
    else {
      console.log("User Goal details not found");
      result(null, { status: 200, message: "User Goal details not found " });
    }
  });
};

Goals.saveusergoaldata = (inputData, result) => {

  let sql_user = `INSERT INTO goal_user (emailid, goalid,tenure, purchase_cost) VALUES('${inputData.Email}','${inputData.Goal_Id}','${inputData.Tenure}','${inputData.Purchase_Cost}')`;

  sql.query(sql_user, function (err, resvv) {

    console.log("Goal Details added: ", resvv);
    result(null, { status: 200, message: "Goal Details added " });

  });
  return;
}

Goals.deleteusergoal = (goal_userid, result) => {
  let sqlquery = "SELECT * from goal_user where id  ='" + `${goal_userid}` + "'";

  sql.query(sqlquery, (err, res) => {
    if (Array.isArray(res) && res.length) {

      console.log("Goal found");

      sql_userbank = "delete from goal_user where id=" + `${goal_userid}`;

      sql.query(sql_userbank, function (err, resvv) {
        console.log("sql: ", sql_userbank);
        if (resvv.affectedRows > 0) {
          console.log("User Goal deleted: ", resvv);
          //console.log("created customer: ",resvv);
          //result(null,{ status:200, message:"Bank Details added ",  data:resvv });
          result(null, { status: 200, message: "User Goal deleted " });
          return
        }
        else {
          console.log("User Goel Details not deleted, Userid not found : ", resvv);
          result(null, { status: 400, message: "User Goel Details not deleted, Userid not found." });
        }
      });


    }
    else {
      console.log("Goal_userId not found");
      console.log(sqlquery)
      result(null, { status: 400, message: "Goal_userId not found" });
    }
  });

};

module.exports = Goals;
