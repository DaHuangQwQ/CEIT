/**
 * 获取当前环境的配置
 * @author DaHuang
 */
let config;
const env = process.env.NODE_ENV ?? "local";
config = require("./config");

// if (env === "local") {
//     config = require("./config");
// } else {
//     config = require(`./config.${env}`);
// }

module.exports = config;
