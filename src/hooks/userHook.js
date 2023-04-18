import {getLoginUser} from "../api/index.js";

export const userLogin = async (code, back) => {
    const res = await getLoginUser()
    if(res.data.code === code){
        back()
    }
}