const request = require('request');

const redis = require('redis');

const redisConfig = require('../../config/redisConfig');

const redisClient = redis.createClient(redisConfig);

exports.setItem = (url, req, key, next) => {
    redisClient.get(key, (err, data) => {
        if (data) {
            console.log(data);
            req[key] = data;
            next();
        } else {
            request(url, (error, response, body) => {
                console.log(body);
                let result = JSON.parse(body);
                let result_key = result[key];
                let exprires = result.expires_in - 100;
                req[key] = result_key;
                redisClient.set(key, result_key);
                redisClient.expire(key, exprires);
                next();
            })
        }
    });
}