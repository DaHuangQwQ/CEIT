const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const MyError = require("./exception");
const http = require("http");
const {FORBIDDEN_ERROR_CODE} = require("./exception/errorCode");
const morgan = require("morgan");
const {expressjwt} = require("express-jwt")
const {secretKey} = require('./config/getConfig'); //密钥
const JWT = require('./util/jwt')

// 请求大小限制
const requestLimit = "5120kb";

class ExpressServer {
    constructor() {
        this.app = express();
        // 上下文请求路径
        this.contextPath = "/api";
        // 请求日志
        this.app.use(morgan("short"));
        this.app.use(
            bodyParser.urlencoded({extended: false, limit: requestLimit})
        );
        this.app.use(bodyParser.json({limit: requestLimit}));

        this.app.set("x-powered-by", false);

        this.app.all("*", (req, res, next) => {
            // 开启跨域
            res.setHeader("Access-Control-Allow-Credentials", "true");
            const origin = req.get("Origin");
            // 允许的地址 http://127.0.0.1:9000 这样的格式
            if (origin) {
                res.setHeader("Access-Control-Allow-Origin", origin);
            }
            res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
            next();
        });
        // this.app.use(expressjwt({secret: secretKey, algorithms: ["HS256"]}).unless({ path: ["/api/user/login",'/login'] }))
        // 设置静态资源
        this.app.use(express.static(path.join(__dirname, 'public')));

        // this.app.use(expressSession(sessionOptions));
        // this.app.use((err, req, res, next) => {
        //     let token = req.headers.authorization
        //     console.log(token)
        //
        //     if (!token) {
        //         res.status(401).send("无效的token...");
        //     } else {
        //         JWT.verify(req, res, next)
        //     }
        // });

        this.server = http.createServer(this.app);
    }

    setRoute(path, handlerFunction) {
        const handler = async (req, res) => {
            // IP 过滤
            const requestClientIp = getClientIp(req);
            if (!requestClientIp) {
                return FORBIDDEN_ERROR_CODE;
            }
            const event = req.body;
            let result;
            try {
                const startTime = new Date().getTime();
                let params;
                if (event.file) {
                    let eventCopy = {...event};
                    eventCopy.file = undefined;
                    params = JSON.stringify(eventCopy);
                } else {
                    params = JSON.stringify(event);
                }
                console.log(
                    `req start path = ${req.path}, clientIp = ${requestClientIp}, params = ${params}`
                );
                result = await handlerFunction(event, req, res);
                // 封装响应
                result = {
                    code: 0,
                    data: result,
                };
                console.log(
                    `req end path = ${
                        req.path
                    }, clientIp = ${requestClientIp}, params = ${params}, costTime = ${
                        new Date().getTime() - startTime
                    }`
                );
            } catch (e) {
                // 全局异常处理
                if (e instanceof MyError) {
                    result = {
                        code: e.code,
                        message: e.message,
                        data: null,
                    };
                } else {
                    result = {
                        code: 500,
                        data: null,
                        message: "server error",
                    };
                }
                console.error(
                    `req error path = ${
                        req.path
                    }, clientIp = ${requestClientIp}, params = ${JSON.stringify(event)}`,
                    e
                );
            }
            res.send(result);
        };
        this.app.post(this.contextPath + path, handler);
    }

    listen(port) {
        this.server.listen(port);
        let url = `http://localhost:${port}`;
        if (this.contextPath) {
            url += this.contextPath;
        }
        console.log(`server start at ${url}, env = ${process.env.NODE_ENV}`);
    }
}

/**
 * 获取真实客户端 ip
 * @param req
 * @returns {*|string}
 */
function getClientIp(req) {
    if (!req) {
        return "";
    }
    return (
        req.headers["x-forwarded-for"] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.connection?.socket?.remoteAddress ||
        req.ip
    );
}

module.exports.CloudBaseRunServer = ExpressServer;
