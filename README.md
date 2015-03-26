Node.js onpage-hub-api-client module is simple script to send the Page to OnPage recipients.

Basic usage:

```nodejs
var OnPageHubApiClient = require('./index');
// THE ENTERPRISE NAME AND TOKEN HAS TO BE REQUESTED FROM ONPAGE SUPPORT.
var onPageHubApiClient = new OnPageHubApiClient('enterprise_name', 'token');

// specify message_id for tracing sent messages
var message_id = 123098;

// specify recipients list in next call
var sendPageResult = onPageHubApiClient.sendPage(
    message_id,
    ['RECIPIENT1', 'RECIPIENT2', ...],
    'subject text',
    'body text',
    function (result) {

    // process result from OnPage Server
    if (result == null) {
        console.log('NO RESULT');
    } else {
        if (
            result.SendMessageResult == null ||
            result.SendMessageResult.Messages == null ||
            result.SendMessageResult.Messages.Message == null ||
            result.SendMessageResult.Messages.Message.length < 1
            ) {
            console.log('UNKNOWN MESSAGE RESULT');
        } else {
            result.SendMessageResult.Messages.Message.forEach(function (message) {
                console.log('Message: ' + message.id + ' is ' + ((message.ACCEPTED == true) ? 'ACCEPTED' : 'NOT ACCEPTED'));
            });
        }
    }
});
```
