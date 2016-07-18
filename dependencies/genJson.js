/**
 * Created by dinesh3836 on 18-06-2016.
 */
var genReq = {
    body: function (phone_number, amount, order_id, merchant_id, wallet_id, isnew_user, cur_type, cus_msg, plat_ip, plat_name) {
        var body = {
            "request": {
                "requestType": "null",
                "merchantGuid": merchant_id,
                "merchantOrderId": order_id,
                "salesWalletGuid": wallet_id,
                "payeeEmailId": "",
                "payeePhoneNumber": phone_number,
                "payeeSsoId": "",
                "appliedToNewUsers": isnew_user,
                "amount": amount,
                "currencyCode": cur_type
            },
            "metadata": cus_msg,
            "ipAddress": plat_ip,
            "platformName": plat_name,
            "operationType": "SALES_TO_USER_CREDIT"
        };
        return body;
    }
};
module.exports = genReq;
