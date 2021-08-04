module.exports = app => {
  const nse_purchase = require("../controllers/nse_purchase.controller.js");
  const nse_details = require("../controllers/nse_details.controller.js");
  const bank = require("../controllers/bank.controller.js");
  const nse_sip = require("../controllers/nse_sip.controller.js");
  const nse_redeem_switch = require("../controllers/nse_redeem_switch.controller.js");
  const goals = require("../controllers/goals.controller.js");
  const extras = require("../controllers/extras.controller.js");

  app.post("/purchase_sip", nse_purchase.purchase_sip);
  app.post("/create_mandate", nse_details.mandate);
  app.get("/getUserDetails", bank.getUserDetails);
  app.post("/regularSIP", nse_sip.SIP);
  app.get("/test", nse_sip.test);
  app.post("/changePbank", bank.changePbank);
  app.post("/deletebank", bank.deletebank);
  app.post("/redeem", nse_redeem_switch.redeem);
  app.post("/switch", nse_redeem_switch.switch);
  app.post("/addBankDetail", bank.addBankDetail);
  app.post("/bankDetails", bank.showDetails);
  app.post("/productApi", bank.findAllProducts);
  app.post("/bankverify", bank.bankverify);
  app.post("/bankverify2", bank.bankverify2);
  app.get("/users/:emailId", bank.findOne1users);
  app.get("/getNSEBank", bank.getnsebank);
  app.post("/readFatca1", nse_purchase.readFatca1_nov);
  app.post("/purchase", nse_purchase.purchase);
  app.get("/cronjobproductinsertion", nse_details.cronjobproductinsertion);
  app.post("/getmandatelist", nse_details.getmandatelist);//GetMandateList API
  app.post("/multi_purchase", nse_purchase.multi_purchase);//multiple order
  app.post("/getusergoaldata", goals.getusergoaldata);//get user goals data
  app.post("/saveusergoaldata", goals.savegoal);//save user goal data
  app.post("/getmastergoaldata", goals.getmastergoaldata);//get goal master data
  app.post("/deleteusergoal", goals.deleteusergoal);//get goal master data
  app.post("/multi_purchase_sip", nse_purchase.multi_purchase_sip);//multiple order
  app.post("/multi_regularSIP", nse_sip.multi_SIP);//multiple order test
  app.post("/getIINStatus", extras.getIINStatus);//
  app.post("/getBasketList", extras.getBasketList);//basket API
  app.post("/getProductViaISIN", extras.getisin);
  app.post("/GETIINDETAILS", extras.GETIINDETAILS);

  app.post("/validateKyc", extras.validateKyc);//cron job KYC status API
  
  app.post("/GETIINDETAILSWMS", extras.GETIINDETAILSWMS);//used in wms userprofile
  //app.post("/GETIINDETAILS", extras.GETIINDETAILS);
  

};
