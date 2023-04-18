const MyError = require("../exception");
const {Op, Sequelize} = require("sequelize");

const {
    NO_AUTH_ERROR_CODE,
    REQUEST_PARAMS_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
} = require("../exception/errorCode");
const ArticleModel = require("../model/article");
const {getLoginUser} = require('../service/userService')
const UserModel = require("../model/user");

async function getArticleList() {
    const ArticleList = await ArticleModel.findAll({
        attributes: ['id', 'userID', 'title', 'sort', 'tag', 'describe', 'createTime', 'view'],
        where: {
            isVis: 1
        }
    });
    if (!ArticleList) {
        throw new MyError(NOT_FOUND_ERROR_CODE, "找不到文章");
    }
    return ArticleList;
}

async function getTagArticle(findData) {
    if (!findData) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
    }
    const attributes = ['id', 'userID', 'title', 'sort', 'tag', 'describe', 'createTime', 'view']
    const ArticleTag = await ArticleModel.findAll({
        attributes,
        where: {
            isVis: 1,
            [Op.and]: Sequelize.literal(`FIND_IN_SET('${findData}', tag)`)
        },
    })
    const ArticleSort = await ArticleModel.findAll({
        attributes,
        where: {
            isVis: 1,
            [Op.and]: Sequelize.literal(`FIND_IN_SET('${findData}', sort)`)
        },
    })
    const ArticleTitle = await ArticleModel.findAll({
        attributes,
        where: {
            title: {
                [Op.like]: `%${findData}%`
            },
            isVis: 1
        }
    })

    return {...ArticleTag, ...ArticleSort, ...ArticleTitle}
}

async function createArticleData({id, data, title, describe, sort, isVis, tag}, req) {
    // 校验
    if (!id || !data || !title || !describe || !sort) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
    }
    // 获取用户信息
    let userInfo = await getLoginUser(req)

    await ArticleModel.create({
            id,
            userID: userInfo.id,
            data,
            title,
            describe,
            sort: sort.join(','),
            isVis,
            tag: tag.join(','),
            createTime: new Date().getTime()
        },
        {});

    return true;
}

async function upArticleData({id, data, title, describe, sort, isVis}, req) {
    // 校验
    if (!id || !data || !title || !describe || !sort || !isVis) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
    }
    // 获取用户信息
    let userInfo = await getLoginUser(req)

    await ArticleModel.update({
            data,
            title,
            describe,
            sort,
            isVis,
            updateTime: new Date().getTime()
        },
        {
            where: {
                [Op.and]: [{userID: userInfo.id}, {id}]
            },
        });

    return true;
}

async function deleteArticleData(id) {
    // 校验
    if (!id) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
    }
    await ArticleModel.destroy({
        where: {
            id
        },
    });

    return true;
}

async function getMyArticleList(req, username) {
    const userInfo = await getLoginUser(req)

    if (!userInfo.id) {
        throw new MyError(NO_AUTH_ERROR_CODE, "未登录");
    }
    const ArticleList = await ArticleModel.findAll({
        where: {
            userID: userInfo.id
        }
    })
    return ArticleList
}

async function getOtherArticleList(username) {

    if (!username) {
        throw new MyError(NO_AUTH_ERROR_CODE, "未登录");
    }
    const UserInfo = await UserModel.findOne({
        where: {
            username
        }
    })

    const ArticleList = await ArticleModel.findAll({
        where: {
            userID: UserInfo.id
        }
    })
    return ArticleList
}

async function getArticle(id, req) {
    // const userInfo = await getLoginUser(req)
    if (!id) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误")
    }
    const Article = await ArticleModel.findByPk(id)
    const {data, userID, isVis} = Article
    // if(userID == userInfo.id && isVis != 1){
    //     return data
    // }
    // else if(isVis == 1){
    //     return data
    // }else{
    //     new MyError(NOT_FOUND_ERROR_CODE,"你无法查看")
    // }
    return data
}

module.exports = {
    getArticleList,
    deleteArticleData,
    upArticleData,
    createArticleData,
    getMyArticleList,
    getOtherArticleList,
    getArticle,
    getTagArticle
}