/**
 * 接口路由
 * @author DaHuang
 */
const routes = [
    {
        path: "/user/register",
        handler: require("./controller/userController").userRegisterApi,
    },
    {
        path: "/user/list",
        handler: require("./controller/userController").getUserListApi,
    },
    {
        path: "/user/login",
        handler: require("./controller/userController").userLoginApi,
    },
    {
        path: "/user/logout",
        handler: require("./controller/userController").userLogoutApi,
    },
    {
        path: "/user/get",
        handler: require("./controller/userController").getLoginUserApi,
    },
    {
        path: "/user/update",
        handler: require("./controller/userController").userUpdateApi,
    },
    {
        path: "/article/getList",
        handler: require("./controller/articleController").ArticleListGetApi
    },
    {
        path: "/article/get",
        handler: require("./controller/articleController").ArticleGetApi
    },
    {
        path: "/article/tag",
        handler: require("./controller/articleController").ArticleTagGetApi
    },
    {
        path: "/article/update",
        handler: require("./controller/articleController").ArticleUpdateApi,
    },
    {
        path: "/article/delete",
        handler: require("./controller/articleController").ArticleDeleteApi,
    },
    {
        path: "/article/create",
        handler: require("./controller/articleController").ArticleCreateApi,
    },
    {
        path: "/article/my",
        handler: require("./controller/articleController").MyArticleGetApi
    },
    {
        path: "/article/other",
        handler: require("./controller/articleController").OtherArticleGetApi
    },


    {
        path: "/like/on",
        handler: require("./controller/likeController").LikeOnApi
    },
    {
        path: "/like/off",
        handler: require("./controller/likeController").LikeOffApi
    },
    {
        path: "/like/count",
        handler: require("./controller/likeController").GetLikeCountApi
    },
    {
        path: "/like/is",
        handler: require("./controller/likeController").IsMyLike
    },


];

module.exports = routes;
