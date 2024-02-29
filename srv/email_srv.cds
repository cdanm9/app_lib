@path:'email-service'     
service emailService {
    action SendEmail(emailData:emailObj) returns many String;     
    type emailObj :{   
        aToEmail:String;   
        aCcEmail:String;
        sEmailSubject:String;         
        sEmailBody:String;                          
    }    
}
