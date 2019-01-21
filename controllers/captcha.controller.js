'use strict';

const svgCaptcha = require('svg-captcha');

async function getCaptcha(req, res) {
    let options = {
        size: 4,
        ignoreChars: '0o1i',
        noise: 2,
        color: true,
        background: '#cfffe9',
        width: 150,
        height: 50,
        fontSize: 56,
        charPreset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    };
    
    let ret = svgCaptcha.create(options);
    // return { code: 200, data: ret };
    return res.render('captcha', ret);
}

module.exports = {
    getCaptcha,
}