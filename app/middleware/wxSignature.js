
const wxConfig = require('../../config/wxConfig');

const redisClient = require('./redis');

const sha1 = require("sha1");

const crypto = require("crypto");
const log = require("../../config/log");

exports.getAccessToken = (req, res, next) => {
    let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxConfig.appId}&secret=${wxConfig.appSecret}`;
    redisClient.setItem(url, req, 'access_token', next);
}

exports.getTicket = (req, res, next) => {
    let access_token = req.access_token;
    console.log('getTicket-access_token: ' + access_token);
    let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
    redisClient.setItem(url, req, 'ticket', next);
}

exports.getSignature = (req, res, next) => {
    let ticket = req.ticket;
    let timestamp = parseInt(new Date().getTime() / 1000);
    let url = req.query.url;
    let noncestr = crypto.randomBytes(8).toString('hex');
    let str = [`jsapi_ticket=${ticket}`, `noncestr=${noncestr}`, `timestamp=${timestamp}`, `url=${url}`].sort().join("&");
    let signature = sha1(str);
    log.out('timestamp --- ' + timestamp);
    log.out('ticket --- ' + ticket);
    log.out('noncestr --- ' + noncestr);
    log.out('url --- ' + url);
    log.out('str --- ' + str);
    log.out('signature --- ' + signature);
    req.result = {
        signature: signature,
        appId: wxConfig.appId,
        timestamp: timestamp,
        nonceStr: noncestr
    };
    next();
};