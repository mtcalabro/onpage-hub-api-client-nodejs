#!/usr/bin/env node

var soap = require('soap');

var OnPageHubApiClient = function (enterprise, token) {
    this.url = 'https://nps.onpage.com/hub-api?wsdl';

    this.enterprise = enterprise;
    this.token = token;

    this.credentials = '' + this.enterprise + '+' + this.token;
};

OnPageHubApiClient.prototype.sendPage = function (message_id, recipients, subject, body, callback) {
    if (message_id == null) {
        message_id = 99999; // this is default message_id if the message_id is not specified
    }

    var recipients_list = [];
    recipients.forEach(function (recipient) {
        recipients_list.push({ id: recipient });
    });

    var args = {
        Credentials: {
            Token: this.credentials
        },
        Messages: [
            {
                Message: {
                    id: message_id,
                    Sender: {
                        ID: 'dispatcher@' + this.enterprise,
                        type: 'EMAIL'
                    },
                    Recipients: { Recipient: recipients_list },
                    Subject: subject,
                    Body: body,
                    Reply: {
                        AllowFreeText: false
                    }
                }
            }
        ]
    };

    function do_callback(result) {
        if (callback) callback(result);
    }

    soap.createClient(this.url, function (err, client) {
        client.SendMessage(args, function (err, result) {
                if (err) {
                    console.log('ERROR: ' + err);
                }

                do_callback(result);
            }
        );
    });
};

module.exports = OnPageHubApiClient;
