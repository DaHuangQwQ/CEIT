const CaptchaModel = require('../../model/captcha')

exports.main = async (captcha) => {
    const res = await CaptchaModel.findOne({
        where: {
            captcha
        }
    })
    if (!res) {
        console.log("无验证码")
        return false
    } else if (res.create_date < new Date().getTime()) {
        console.log("验证码过期")
        return false
    } else {
        return true
    }
}