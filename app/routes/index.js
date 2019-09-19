const express = require('express');

const wxSignature = require('../middleware/wxSignature.js');

const wxConfig = require('../../config/wxConfig');

const sha1 = require("sha1");

// const wxAuth = require('../middleware/wxAuth.js');

const router = express.Router();

// 接口 -- 签名
router.get('/signature', wxSignature.getAccessToken, wxSignature.getTicket, wxSignature.getSignature, (req, res, next) => {
    res.send({
        code: 0,
        data: req.result
    });
});

// 接口 -- 验证token
router.get('/token', (req, res, next) => {
    console.log(req.query);
    res.send(req.query.echostr || 'undefined');
    return;
    let signature = req.query.signature;
    let nonce = req.query.nonce;
    let timestamp = req.query.timestamp;
    let echostr = req.query.echostr;
    let token = wxConfig.token;
    let str = [token, timestamp, nonce].sort().join('');
    let sha = sha1(str);
    res.send(echostr);
    return;
    if (sha === signature) {
        console.log('send')
        res.send(echostr);
    } else {
        res.result = {
            code: -1,
            error: 'valid error'
        }
        res.send(res.result);
    }
});

// 微信授权
// roter.get('/wxAuth', wxAuth.getCode, (req, res, next) => {
//     // todo
// });

// 获取用户信息
// router.get('/wxAuth/getUserInfo', wxAuth.getAccessToken, wxAuth.getUserInfo, (req, res, next) => {
//     let back_url = req.query.back_url;
//     if (back_url.indexOf('?path=')) {
//         back_url = back_url.replace('?path=', '#/');
//     }
//     res.redirect(back_url);
// });

module.exports = router;