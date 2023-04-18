const MyError = require("../exception");
const {
    REQUEST_PARAMS_ERROR_CODE,
    NO_AUTH_ERROR_CODE,
} = require("../exception/errorCode");
const {
    userLogin,
    userRegister,
    getLoginUser,
    userUpdate,
    getUserList
} = require("../service/userService");

/**
 * 用户注册
 * @param event
 * @param req
 * @param res
 */
async function userRegisterApi(event, req, res) {
    return await userRegister(event);
}

/**
 * 用户登录
 * @param event
 * @param req
 * @param res
 */
async function userLoginApi(event, req, res) {
    return await userLogin(event, req);
}

/**
 * 用户注销
 * @param event
 * @param req
 * @param res
 */
function userLogoutApi(event, req, res) {
    if (!req.session.userInfo) {
        throw new MyError(NO_AUTH_ERROR_CODE, "未登录");
    }
    delete req.session.userInfo;
    return true;
}

async function userUpdateApi(event, req, res) {
    const {id, username, password, email,introduction,age,sex,birth,addr} = event;
    if (!id || !username || !password || !email || !introduction || !age || !sex || !birth || !addr) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
    }
    return await userUpdate({id, username, password, email,introduction,age,sex,birth,addr});
}

/**
 * 获取当前登录用户
 * @param event
 * @param req
 * @param res
 */
async function getLoginUserApi(event, req, res) {
    return await getLoginUser(req);
}


async function getUserListApi(event, req, res) {
    let {begin,end} = event
    return await getUserList(begin,end);
}

module.exports = {
    userRegisterApi,
    userLoginApi,
    getLoginUserApi,
    userLogoutApi,
    userUpdateApi,
    getUserListApi
};
