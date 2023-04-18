const sendMail = require('../common/sendEmail/index').main

async function test(){
    return await sendMail({to:'2195921486@qq.com',subject:'aaa',content:'asd'})

}

console.log(test())
