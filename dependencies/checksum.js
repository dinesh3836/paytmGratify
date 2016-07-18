/**
 * Created by dinesh3836 on 18-06-2016.
 */

"use strict";

var crypt = require('./crypt');
var crypto = require('crypto');

var checksum = {

    genchecksum: function (params, key, cb) {
        var flag = params.refund ? true : false;
        var data = paramsToString(params);

        crypt.gen_salt(4, function (err, salt) {
            var sha256 = crypto.createHash('sha256').update(data + salt).digest('hex');
            var check_sum = sha256 + salt;
            var encrypted = crypt.encrypt(check_sum, key);
            if (flag) {
                params.CHECKSUM = encodeURIComponent(encrypted);
                params.CHECKSUM = encrypted;
            } else {
                params.CHECKSUMHASH = encodeURIComponent(encrypted);
                params.CHECKSUMHASH = encrypted;
            }
            cb(undefined, params);
        });
    },
    genchecksumbystring: function (jsonstring, key, cb) {
        var data = jsonstring;
        crypt.gen_salt(4, function (err, salt) {
            var sha256 = crypto.createHash('sha256').update(data + '|' + salt).digest('hex');
            var check_sum = sha256 + salt;
            var encrypted = crypt.encrypt(check_sum, key);

            cb(undefined, encrypted);
        });
    },
    verifychecksum: function (params, key) {

        if (!params) console.log("params are null");

        var data = paramsToString(params, false);
        //TODO: after PG fix on thier side remove below two lines
        if (params.CHECKSUMHASH) {
            params.CHECKSUMHASH = params.CHECKSUMHASH.replace('\n', '');
            params.CHECKSUMHASH = params.CHECKSUMHASH.replace('\r', '');

            var temp = decodeURIComponent(params.CHECKSUMHASH);
            var checksum = crypt.decrypt(temp, key);
            var salt = checksum.substr(checksum.length - 4);
            var sha256 = checksum.substr(0, checksum.length - 4);
            var hash = crypto.createHash('sha256').update(data + salt).digest('hex');
            if (hash === sha256) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
};
module.exports = checksum;

//mandatory flag: when it set, only mandatory parameters are added to checksum

function paramsToString(params, mandatoryflag) {
    var data = '';
    var flag = params.refund ? true : false;
    delete params.refund;
    var tempKeys = Object.keys(params);
    if (!flag) tempKeys.sort();
    tempKeys.forEach(function (key) {
        if (key !== 'CHECKSUMHASH') {
            if (params[key] === 'null') params[key] = '';
            if (!mandatoryflag || mandatoryParams.indexOf(key) !== -1) {
                data += (params[key] + '|');
            }
        }
    });
    return data;
}

