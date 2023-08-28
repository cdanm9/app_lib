const cds = require("@sap/cds");
module.exports = {

    sendEmail: async function(connection,sEmailBody,sEmailSubject,aEmailTo,aEmailCC,sEmailSender){
      try{
        //get email contact id
        if (sEmailSender === null || sEmailSender === "" || sEmailSender === undefined) {
            var aEmailIds = await this.getEmailContactId(connection);
            if (aEmailIds === null) {
                throw "Sender email id is missing in master"
            }
            sEmailSender = aEmailIds.EMAIL_NOTIF_1;
        }
     
        //CC Check
        if (aEmailCC === null) {
            aEmailCC = [];
        }
    //set connection to Email Destination
    let Emailconnection = await cds.connect.to ('EMAIL_DEST');
    // const result = await SPA_API.send('POST', '/workflow/rest/v1/workflow-instances',
    //  JSON.stringify(workflowContent), { "Content-Type": "application/json" });

    //Email to
    // var params = "send_email?EmailTo=supritha.m@intellectbizware.com"  ;
    var params = "send_email?EmailTo= " + aEmailTo.toString()  ;

    //Email Body
    // params += "&EmailBody=" + encodeURIComponent('This is test email');
    params += "&EmailBody=" + encodeURIComponent(sEmailBody);

    //Email Sender & CC
    // params += "&EmailSender=" + "support.scp@intellectbizware.com";
    params += "&EmailSender=" + sEmailSender;
    // params += "&EmailCc=" + "siddhesh.d@intellectbizware.com";
    params += "&EmailCc=" + aEmailCC.toString();

    //Email Subject
    // params += "&EmailSubject= " + "Test java Email from CAPM";
    params += "&EmailSubject= " + sEmailSubject;

    var path = encodeURI(params);
    const Mailresult = await Emailconnection.send('GET',path);
    return Mailresult;
} 
catch(error){throw error }
},
 getEmailContactId:async function(connection) {
    try{
        // let connection = await cds.connect.to ('db');
        // console.log(connection.entities['EMPLOYEE']);
        let aResult =  await connection.run(SELECT .from `${connection.entities['VENDOR_PORTAL.MASTER_EMAIL_CONTACT_ID']}`);
    var aEmailIds = null;
    // var conn = $.hdb.getConnection();
    // var sQuery = 'SELECT * FROM "VENDOR_PORTAL"."VENDOR_PORTAL.Table::MASTER_EMAIL_CONTACT_ID" ';
    // var aResult = conn.executeQuery(sQuery);


    if(aResult.length > 0) {
       aEmailIds =  aResult.length > 0 ? aResult[0] : null;
    }

    // conn.close();
    return aEmailIds;
} 
catch(error  ){  throw error; }
},
sendTestEmail: async function(sEmailBody,sEmailSubject,aEmailTo,aEmailCC,sEmailSender){

    this.sendEmail('This is test email',"Test java Email from CAPM",aEmailTo,aEmailCC,sEmailSender)
}
}