'use strict';

const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const express = require('express');

const config = require('./config/config');

function init() {
    let app = express();

    // 初始化中间件
    initMiddleware(app);
    
    // 添加对 ejs 模板引擎的支持
    setViews(app);
    
    // 设置静态资源目录
    setStatic(app);
    
    // 初始化路由
    initRoutes(app);
    
    // 初始化错误路由
    initErrorRoutes(app);
    
    // 初始化数据库
    initDB(app);

    return app;
}

function initMiddleware(app) {
    // log4js 日志
    let appenders = {};
    if (config.environment === 'development') {
        appenders[config.project.name] = { type: 'stdout' };
    } else if (config.environment === 'production') {
        appenders[config.project.name] = {
            type: 'dateFile',
            filename: '../logs/captcha.log'
        };
    }
    
    log4js.configure({
        appenders: appenders,
        categories: {
            default: {
                appenders: [ config.project.name ],
                level: 'debug'
            }
        }
    });
    global.logger = log4js.getLogger('stdout');
    app.use(log4js.connectLogger(logger, { level: 'debug' }));
}

function setViews(app) {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
}

function setStatic(app) {
    app.use(express.static(path.join(__dirname, 'public')));
}

function initRoutes(app) {
    let files = fs.readdirSync('./routes');
    for (let f of files) {
        let p = path.join(__dirname, 'routes', f);
        let router = require(p);
        app.use(router);
    }
}

function initErrorRoutes(app) {
    app.use(function(err, req, res, next){
        console.error(err);
        res.status(500).send('Something broke!')
    })
}

function initDB(app) {}

module.exports.init = init;