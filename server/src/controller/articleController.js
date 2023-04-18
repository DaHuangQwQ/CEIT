const MyError = require('../exception')
const {
    REQUEST_PARAMS_ERROR_CODE,
    NO_AUTH_ERROR_CODE,
} = require("../exception/errorCode");
const {
    getArticleList,
    deleteArticleData,
    upArticleData,
    createArticleData, getMyArticleList, getOtherArticleList, getArticle, getTagArticle
} = require("../service/articleService");

async function ArticleUpdateApi(event, req, res){
    if (!event) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
    }
    return await upArticleData(event,req);
}

async function ArticleCreateApi(event, req, res){
    if (!event) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
    }
    return await createArticleData(event,req);
}

async function ArticleDeleteApi(event, req, res){
    const {id} = event;
    if(!id){
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
    }
    return await deleteArticleData(id);
}

async function ArticleListGetApi(event, req, res){

    return await getArticleList();
}

async function MyArticleGetApi(event, req, res){

    return await getMyArticleList(req);
}

async function OtherArticleGetApi(event, req, res){
    const { username } = event
    return await getOtherArticleList(username);
}

async function ArticleGetApi(event, req, res){
    const { id } = event
    return await getArticle(id,req);
}


async function ArticleTagGetApi(event){
    const { tag } = event
    return await getTagArticle(tag)
}
module.exports = {
    ArticleUpdateApi,
    ArticleCreateApi,
    ArticleDeleteApi,
    ArticleListGetApi,
    MyArticleGetApi,
    OtherArticleGetApi,
    ArticleGetApi,
    ArticleTagGetApi
}