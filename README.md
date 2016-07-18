# paytmGratify

**paytmGratify** is a paytm module which helps in hassle free money transfer from Merchant Sub-Wallet to customer wallet

## Installation

npm install paytmGratify

## Usage
* Sample Code
```javascript
var status = require('http-status-codes');                      
var request = require('request');                               
var gratify = require('paytmGratify');                          //Require paytmGratify module
var ORDER_ID = 'ORDXXXXX';                                      //Unique per transaction
var WALLET_NUMBER = "7777777777";                               //Wallet to which amount is to be transferred ('7777777777' is Paytm testing Wallet)
var ISNEW = "Y";                                                //"y" If aaplied to NewUser
var AMOUNT = '1';                                               //Amount OT be Transferred
var MESSAGE = "Test Amount";                                    //Message 
var AES_KEY = "XXXXXXXXXX";                                     //Merchant key  (Given by Paytm)
var MERCHANT_GUID = "XXXXXX-XXXXXXX-XXXXXXXX-XXXXXX";           //Merchant ID   (Given by Paytm)
var SALES_WALLET_GUID = "XX-XXXXXXX-XXXXXXXX-XXXXXXXXX-XXXXXX"; //Wallet ID     (Get from merchant Gratification Panel or Paytm)
var IP_ADDRESS = '192.168.0.1';                                 //Generally IP Address of your server
var PLATFORM_NAME = 'MY PLATFORM';                              //Your PLatform Name
var CURRENCY = 'INR';                                           //Currency Code as in Paytm Documentation
var TRANSACTION_TYPE = 'staging';                               //Transaction type ('staging' or 'production')
module.exports = {
  transfer: function (req, res) {
    var transaction_details = {
      'transaction_type': TRANSACTION_TYPE,
      'order_id': ORDER_ID,
      'cust_phone': WALLET_NUMBER,
      'amount': AMOUNT,
      'currency_type': CURRENCY,
      'message': MESSAGE,
      'isnew_user': ISNEW
    };
    var merchant_details = {
      'aes_key': AES_KEY,
      'merchant_guid': MERCHANT_GUID,
      'wallet_guid': SALES_WALLET_GUID
    };
    var platform_details = {
      'platform_name': PLATFORM_NAME,
      'ip_address': IP_ADDRESS
    };
    gratify.gratifyCustomer(transaction_details, merchant_details, platform_details, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }
};
```

##References
[Paytm Gateway Reference](http://paywithpaytm.com/)
[Paytm Api Documentation](http://paywithpaytm.com/developer/paytm_api_doc/)

##Author
[Dinesh Kumar Sharma](https://in.linkedin.com/in/dinesh-sharma-2a7312100)

