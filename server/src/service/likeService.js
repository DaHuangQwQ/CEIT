const MyError = require("../exception");
const {Op, Sequelize} = require("sequelize");

const {
    NO_AUTH_ERROR_CODE,
    REQUEST_PARAMS_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
} = require("../exception/errorCode");

const LikeModel = require('../model/like')
const {getLoginUser} = require("./userService");

async function likeOn(req, article) {
    const userInfo = await getLoginUser(req)
    console.log(userInfo)
    const res = await LikeModel.findAll({
        where: {
            article,
            userID: userInfo.id
        }
    })
    // console.log(res)
    if (res.length >= 1) {
        // throw new MyError(NOT_FOUND_ERROR_CODE, "用户已点赞")
        await LikeModel.destroy({
            where: {
                article,
                userID: userInfo.id
            }
        })
        return 0
    } else {
        await LikeModel.create({
            article,
            userID: userInfo.id
        })
        return 1
    }
}

async function likeOff(req, article) {
    const userInfo = await getLoginUser(req)
    const res = await LikeModel.findAll({
        where: {
            article,
            userID: userInfo.id
        }
    })
    if (!res) {
        throw new MyError(NOT_FOUND_ERROR_CODE, "用户未点赞")
    }
    await LikeModel.destroy({
        where: {
            article,
            userID: userInfo.id
        }
    })
    return true
}

async function getLikeCount(article) {
    const Count = await LikeModel.count({
        where: {
            article
        }
    })
    return Count
}

async function isMyLike(req, article) {
    const userInfo = await getLoginUser(req)
    const res = await LikeModel.findAll({
        where: {
            article,
            userID: userInfo.id
        }
    })
    console.log(res)
    if (res.length >= 1) {
        return true
    } else {
        return false
    }
}

module.exports = {
    likeOn,
    likeOff,
    getLikeCount,
    isMyLike
}