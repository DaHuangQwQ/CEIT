const MyError = require("../exception");
const {Op} = require("sequelize");
const {getTokenInfo} = require("../util/jwt")
const {
    NO_AUTH_ERROR_CODE,
    REQUEST_PARAMS_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
} = require("../exception/errorCode");
const UserModel = require("../model/user");
const md5 = require("md5");
const JWT = require("../util/jwt");

const SALT = "DaHuang";


exports.main = async ({
                          id,
                          name,
                          username,
                          password,
                          email,
                          introduction,
                          age,
                          sex,
                          birth,
                          addr,
                          contest,
                          skillStack
                      }) => {
    // 校验
    if (!id || !username || !password || !introduction || !age || !sex || !birth || !addr) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
    }
    const regEmail =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!regEmail.test(email)) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "邮箱非法");
    }
    // 用户是否已存在
    let user = await UserModel.findOne({
        where: {
            [Op.or]: [{username}, {id}],
        },
    });
    if (user) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, "该用户名或邮箱已被注册");
    }

    // 插入新用户
    const cryptoPassword = md5(password + SALT);
    user = await UserModel.create({
        id,
        name,
        email,
        username,
        password: cryptoPassword,
        contest: contest.join(','),
        skillStack: skillStack.join(','),
        introduction,
        age,
        sex,
        birth,
        addr,
        role: 'user',
        createTime: new Date().getTime()
    });

    return user.id;
}
