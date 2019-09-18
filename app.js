
// node 内置API
const path = require('path');

// 需要安装依赖API
const express = require('express');             // 服务框架

const logger = require('morgan');               // 日志服务

const cookieParser = require('cookie-parser');  // cookie解析

const bodyParser = require('body-parser');      // 请求体解析


// 引入内部文件
const index = require('./app/routes/index');  // 路由控制

const app = express();

app.use(logger('dev'));                                     // 中间件处理 -- 日志

app.use(express.static(path.join(__dirname, 'public')));    // 中间件处理 -- 静态文件目录

app.use(bodyParser.json());                                 // 中间件处理 -- 请求体json格式化

app.use(bodyParser.unlencoded({ extended: false }));
app.use(cookieParser());                                    // 中间件处理 -- cookie处理

app.use('/', index);                                        // 中间件处理 -- 路由控制


app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render(error);
});

module.exports = app;