import { createStore } from 'vuex'

import article from './article'
import user from './user'
import search from "./search.js";
export default createStore({
    modules: {
        article,
        user,
        search
    },
    // plugins: [createPersistedState({
    //     path: [collapse,tableData]
    // })],
})

