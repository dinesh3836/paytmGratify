/**
 * Created by dinesh3836 on 18-07-2016.
 */

var checksum = require('./dependencies/checksum');
var crypt = require('./dependencies/crypt');
var genJson = require('./dependencies/genJson');
var request = require('request');

module.exports = {
    gratifyCustomer: function (transaction_details, merchant_details, platform_details, callback) {
        if (transaction_details.transaction_type && transaction_details.order_id && transaction_details.cust_phone && transaction_details.amount && transaction_details.currency_type && transaction_details.message && transaction_details.isnew_user) {
            if (merchant_details.aes_key && merchant_details.merchant_guid && merchant_details.wallet_guid) {
                if (platform_details.platform_name && platform_details.ip_address) {
                    if (transaction_details.transaction_type == 'staging' || transaction_details.transaction_type == 'production') {
                        var url = "";
                        merchant_details.merchant_guid
                        if (transaction_details.transaction_type == 'production') {
                            url = "http://trust.paytm.in/wallet-web/salesToUserCredit";
                        } else {
                            url = "http://trust-uat.paytm.in/wallet-web/salesToUserCredit";
                        }
                        //Genertae PaytmJson
                        var paytmJson = genJson.body(transaction_details.cust_phone, transaction_details.amount, transaction_details.order_id, merchant_details.merchant_guid, merchant_details.wallet_guid, transaction_details.isnew_user, transaction_details.currency_type, transaction_details.message, platform_details.ip_address, platform_details.platform_name);


                        //Generate Checksum
                        checksum.genchecksumbystring(JSON.stringify(paytmJson), merchant_details.aes_key, function (err, checksum) {

                            if (err) {
                                callback(true, null);
                            } else {

                                //API Call
                                request({
                                        method: "POST",
                                        url: url,
                                        json: paytmJson,
                                        headers: {
                                            "Content-type": 'application/json',
                                            "mid": merchant_details.merchant_guid,
                                            "checksumhash": checksum
                                        }
                                    },
                                    function (error, response) {
                                        if (error)
                                            callback(true, null);
                                        else {
                                            callback(null, response);
                                        }
                                    });
                            }
                        });
                    } else {
                        callback({
                            status: 'failed',
                            message: 'Transaction Type Can be "production" or "staging"'
                        }, null);
                    }
                } else {
                    callback({
                        status: 'failed',
                        message: 'Insufficient Platform Details'
                    }, null);
                }
            } else {
                callback({
                    status: 'failed',
                    message: 'Insufficient Merchant Details'
                }, null);
            }
        } else {
            callback({
                status: 'failed',
                message: 'Insufficient Transaction Details'
            }, null);
        }
    }
};