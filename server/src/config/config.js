

/**
 * 默认配置
 * @author DaHuang
 */
module.exports = {
    redisConfig: {
        host: "127.0.0.1",
        port: "6379",
        password: "123456",
        db: 2,
    },
    // MySQL 配置
    dbConfig: {
        database: "ceit",
        username: "root",
        password: "123456",
        host: "127.0.0.1",
        port: 3306,
    },
    baiduFanYiConfig: {
        appid: "",
        key: "",
    },
    cos: {
        SecretId:'123', // 你的 腾讯云 cos 的 SecretId 和 SecretKey
        SecretKey: '123'
    },
    secretKey: "DaHuang"
};