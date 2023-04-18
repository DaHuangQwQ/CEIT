const MyError = require("../exception");
const {Op, Sequelize} = require("sequelize");

const {
    NO_AUTH_ERROR_CODE,
    REQUEST_PARAMS_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
} = require("../exception/errorCode");

const LikeModel = require('../model/like')
const {getLoginUser} = require("./userService");

async function avatarUpdate(event, req) {
    console.log(event)
    return req.file
}


module.exports = {
    avatarUpdate
}