// get libraries/modules
const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
const lib_common = require('./LIB/iven_library')
var nodemailer = require('nodemailer');
// const lib_dms = require('./DMS_LIB/BTP_DMS_LIB')
module.exports = cds.service.impl(function () {
    this.on('SendEmail',async(req)=>{
        try{
            var {emailData}=req.data;
            var sResponse;    
            // var sFrom=emailData.emailFrom||"";
            var sTo=emailData.aToEmail||"";
            var sCC=emailData.aCcEmail||"";
            var sEMailSubj=emailData.sEmailSubject||"";
            var sEmailContent=emailData.sEmailBody||"";       
            const lvEmailConfig = await getEmailConfig();                    
            await sendivenEmail(sTo,sCC,'html', sEMailSubj,sEmailContent,lvEmailConfig);            
            req.reply("E-Mail Sent Successfully");   
        }catch(oError){
            req.error({ code:'500', message:  error.message ? error.message : error });   
        }
    })         

    async function sendivenEmail(ToEmails, CCEmail, type, subject, body,lvEmailConfig){
        
        const transporter = nodemailer.createTransport({     
            host: lvEmailConfig.HOST,
            port: lvEmailConfig.PORT,
            secure: lvEmailConfig.SECURE, // STARTTLS
            auth: {
                user: lvEmailConfig.USERNAME,
                pass: lvEmailConfig.PASSWORD,
            },
        });
        var senderEmail = lvEmailConfig.SENDER_EMAIL;         
        if (type == 'html') {
            var mailOptions = {
                from: senderEmail,
                to: ToEmails,
                cc: CCEmail,
                subject: subject,
                html: body
            };
        } else {
            var mailOptions = {
                from: senderEmail,
                to: ToEmails,
                cc: CCEmail,
                subject: subject,
                text: body
            };
        }    

        var mailres = await transporter.sendMail(mailOptions);

    }

    async function getEmailConfig(){
        let connection = await cds.connect.to('db');
        let queryResult = await connection.run(SELECT`*`.from`${connection.entities['VENDOR_PORTAL.EMAIL_CONFIG']}`.where`SR_NO = 1`);
        return queryResult[0];
    }


    
})