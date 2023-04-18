const MyError = require('../exception')
const {
    REQUEST_PARAMS_ERROR_CODE,
    NO_AUTH_ERROR_CODE,
} = require("../exception/errorCode");
const {likeOn, likeOff, getLikeCount, isMyLike} = require("../service/likeService");

async function LikeOnApi (event,req){
    const { article } = event
    return await likeOn(req,article)
}

async function LikeOffApi (event,req){
    const { article } = event
    return await likeOff(req,article)
}

async function GetLikeCountApi(event){
    const { article } = event
    return await getLikeCount(article)
}

async function IsMyLike(event,req){
    const { article } = event
    return await isMyLike(req,article)
}


module.exports = {
    LikeOnApi,
    LikeOffApi,
    GetLikeCountApi,
    IsMyLike
}