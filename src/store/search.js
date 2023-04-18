import {getTagArticle} from "../api/index.js";

export default {
    state: {
        searchData: "",
        resList:[]
    },
    mutations: {

    },
    actions:{
        async getTagList(content){
            const res = await getTagArticle(content.state.searchData)
            content.state.resList = res.data.data
        }
    }
}