// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
const lib_ias = require('./LIB/iven_library_ias')
const lib_mail = require('./LIB/iven_library_email')

module.exports = cds.service.impl(function () {
  this.on('PostOrderData', async (req) => {
    try {
      // local variables
      const { headerSet, itemSet } = req.data;
      var sResponse = null;

      // get connection
      var client = await dbClass.createConnectionFromEnv();
      let dbConn = new dbClass(client);
      // load procedure
      const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'POST_ORDER')
      sResponse = await dbConn.callProcedurePromisified(loadProc, [headerSet, itemSet]);
      req.reply(sResponse)
    } catch (error) {

      req.error({ code: "500", message: error.message });
    }
  }),
    this.on('GET', 'IASet', async (req) => {
//       ** Update vendor email id */
//        let response = await lib_ias.UpdateVendorEmailIdIAS("500000111","test@gmailtest.com");
//        throw response;
//       *** to get IAS user and srore in db */
      let response = await lib_ias.getIASUser();
//       ** Create vendor and assign roles(vendor group) */
//       var sSAPVendoCode = "500000111";
//       var sName1 = "CAP Test vendor";
//       var sName2 = "CapM";
//       var sEmaiID = "captestmail@testcap.com"
//       let response = await lib_ias.CreateVendorIdIAS(sSAPVendoCode, sName1, sName2, sEmaiID);
//       // response.message = response.body;
//       throw response;
// darshan
//       **email test  */
      
    //   var ToEmails = "darshan.l@intellectbizware.com,darsh2269@gmail.com";
    //   var CCEmails = "supritha.m@intellectbizware.com";
    //   var type = 'html' ; //html or text
    //   var subject = "CAPM iVen Mail test";
    //   // var body = "CAPM iVen Mail test";

    //   var body =    '<!DOCTYPE html>'+
    //  '<html><head>    <title>Email Example</title></head><body>'+
    // '<p>Dear [Recipients Name],</p>    <p>This is a sample email to demonstrate the HTML format for email bodies.</p>'+
    //     '<h2>[Email Subject]</h2>   <p>'+
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '+
    //     'Nulla eget libero nec massa tincidunt varius ac eu justo.'+
    //     '</p>  <p>'+
    //     'Phasellus bibendum [Your Message]. Sed lacinia, justo et '+
    //     'rhoncus fringilla, risus sapien vulputate nunc.'+
    // '</p><p>Sincerely,</p> <p>Your Name</p></body></html>';

    //  await lib_mail.sendivenEmail(ToEmails,CCEmails,type,subject,body);
    //   var resp = { "MATERIAL_ID": "1234", "MATERIAL_DSC": "response.itemsPerPage" }
    //   return resp;
    })


})