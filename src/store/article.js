import { getArticleList } from "../api/index.js";

export default {
    state: {
      articleData: [],
    },
    mutations: {
        pushMarkDownData(state,val){
            state.articleData.push(val)
        }
    },
    actions: {
        async getList(content){
            const res = await getArticleList()
            content.state.articleData = res.data.data
        }
    }
  }