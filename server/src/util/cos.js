const COS = require('cos-nodejs-sdk-v5');
const fs = require("fs");
const cos = new COS({
    SecretId: process.env.SecretId,
    SecretKey: process.env.SecretKey,
});

async function cosAvatarUpdate(username,file){
    cos.putObject({
        Bucket: 'ceit-1312547723', /* 必须 */
        Region: 'ap-beijing',    /* 必须 */
        Key: username,              /* 必须 */
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
            console.log(JSON.stringify(progressData));
        }
    }, function(err, data) {
        console.log(err || data);
    });
}

module.exports = {
    cosAvatarUpdate
}