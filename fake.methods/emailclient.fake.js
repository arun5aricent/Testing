
var EmailClient = function (emailData) { 

    var sendEmailUrl = emailData.sendEmailUrl;

    this.sendEmail = function (content) {

        /// <summary>Sending the email to the server</summary>
        /// <param name="content" type="object">Object that contains the representation of the actual email</param>
        upstream.gadgets.io.post(sendEmailUrl, {
            json: JSON.stringify(content)
        }).done(function (data) {
            _doneSendEmail(data);
        }).fail(function (data) {
            _enableFileUpload(true);
            _failSendEmail(data);
        });
    }

    //Helper methods
    function _enableFileUpload(isEnable) {        
        /// <summary>Enable/disable the file upload component</summary>
        if (isEnable) {
            //Remove class disable from fileinput-button
        } else {
            //Remove class enable from fileinput-button
        }
    }

    function _doneSendEmail(response) {
        /// <summary>Trigger a message to the current page's parent to indicate email has been sent</summary>
        /// <param name="response" type="string">Response message from the server</param>        
      
    }

    function _failSendEmail(response) {
        /// <summary>Trigger a message to the current page's parent to indicate email was failed to sent</summary>
        /// <param name="response" type="string">Response message from the server</param>          
    }

};
