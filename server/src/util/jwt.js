const jwt = require('jsonwebtoken');
const {secretKey} = require('../config/getConfig');
const MyError = require("../exception");
const {NO_AUTH_ERROR_CODE} = require("../exception/errorCode"); //密钥

// 生成token
const sign = (data={}) => {
    return jwt.sign(data, secretKey, {
        expiresIn: 60*60,
    });
};

// 验证token
const verify = (req, res, next) => {
    let authorization = req.headers.authorization || req.body.token || req.query.token || '';
    let token = '';
    // if (authorization.includes('Bearer')) {
    // 	token = authorization.replace('Bearer ', '');
    // } else {
    // 	token = authorization;
    // }
    token = authorization

    jwt.verify(token, secretKey, (error, data) => {
        if (error) {
            res.json({ error: 1, data: 'token验证失败' });
        } else {
            req._id = data._id;
            next();
        }
    });
};

const getTokenInfo = (req, res) => {
    let authorization = req.headers.authorization || req.body.token || req.query.token || '';
    let token = '';
    // if (authorization.includes('Bearer')) {
    // 	token = authorization.replace('Bearer ', '');
    // } else {
    // 	token = authorization;
    // }
    token = authorization
    let userInfo;
    jwt.verify(token, secretKey, (error, data) => {
        if (error) {
            throw new MyError(NO_AUTH_ERROR_CODE, "未登录");
        } else {
            userInfo = data
        }
    });
    return userInfo
};

module.exports = {
    sign,
    verify,
    getTokenInfo
};
