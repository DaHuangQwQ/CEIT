// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import OpenApiUtil from '@alicloud/openapi-util';
import Util, * as $Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';


export default class Client {

    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    static createClient(accessKeyId: string, accessKeySecret: string): OpenApi {
        let config = new $OpenApi.Config({
            // 必填，您的 AccessKey ID
            accessKeyId: accessKeyId,
            // 必填，您的 AccessKey Secret
            accessKeySecret: accessKeySecret,
        });
        // 访问的域名
        config.endpoint = `dysmsapi.aliyuncs.com`;
        return new OpenApi(config);
    }

    /**
     * API 相关
     * @param path params
     * @return OpenApi.Params
     */
    static createApiInfo(): $OpenApi.Params {
        let params = new $OpenApi.Params({
            // 接口名称
            action: "SendSms",
            // 接口版本
            version: "2017-05-25",
            // 接口协议
            protocol: "HTTPS",
            // 接口 HTTP 方法
            method: "POST",
            authType: "AK",
            style: "RPC",
            // 接口 PATH
            pathname: `/`,
            // 接口请求体内容格式
            reqBodyType: "json",
            // 接口响应体内容格式
            bodyType: "json",
        });
        return params;
    }

    static async main(args: string[]): Promise<void> {
        // 工程代码泄露可能会导致AccessKey泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html
        let client = Client.createClient("accessKeyId", "accessKeySecret");
        let params = Client.createApiInfo();
        // query params
        let queries: { [key: string]: any } = {};
        queries["PhoneNumbers"] = "13029375985";
        queries["SignName"] = "CEIT工作室";
        queries["TemplateCode"] = "SMS_276305619";
        queries["TemplateParam"] = "{\"code\":\"1234\"}";
        queries["SmsUpExtendCode"] = "CEIT 工作室";
        queries["OutId"] = "asd";
        // runtime options
        let runtime = new $Util.RuntimeOptions({});
        let request = new $OpenApi.OpenApiRequest({
            query: OpenApiUtil.query(queries),
        });
        // 复制代码运行请自行打印 API 的返回值
        // 返回值为 Map 类型，可从 Map 中获得三类数据：响应体 body、响应头 headers、HTTP 返回的状态码 statusCode
        await client.callApi(params, request, runtime);
    }

}

Client.main(process.argv.slice(2));