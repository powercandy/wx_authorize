const express = require('express');

const wxSignature = require('../middleware/wxSignature.js');

const wxAuth = require('../middleware/wxAuth.js');

const router = express.Router();

// 接口 -- 签名
router.get('/signature', wxSignature.getAccessToken, wxSignature.getTicket, wxSignature.getSignature, (req, res, next) => {
    res.send({
        code: 0,
        data: req.result
    });
});

// 微信授权
roter.get('/wxAuth', wxAuth.getCode, (req, res, next) => {
    // todo
});

// 获取用户信息
router.get('/wxAuth/getUserInfo', wxAuth.getAccessToken, wxAuth.getUserInfo, (req, res, next) => {
    let back_url = req.query.back_url;
    if (back_url.indexOf('?path=')) {
        back_url = back_url.replace('?path=', '#/');
    }
    res.redirect(back_url);
});

module.exports = router;