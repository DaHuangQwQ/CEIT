/**
 * 默认配置
 * @author DaHuang
 */
module.exports = {
    redisConfig: {
        host: "81.70.203.121",
        // host: "127.0.0.1",
        port: "6379",
        password: "123456",
        db: 2,
    },
    // MySQL 配置
    dbConfig: {
        database: "ceit",
        username: "root",
        password: "adYZ5TTsSjiKJjFt",
        host: "81.70.203.121",
        port: 3306,
    },
    baiduFanYiConfig: {
        appid: "",
        key: "",
    },
    cos: {
        SecretId:'AKIDueFept23pODzXrxqZlmZ8TaUBfw65xbH',
        SecretKey: 'X4NuGOL5bv1ub4O8j8ax9JJFxc5NWUGq'
    },
    secretKey: "DaHuang"
};