import {createStore} from "vuex";

const store = createStore({
    state: {
    // 状态
        login: false,
    },
    mutations: {
    // 同步修改状态
        setLogin(state, payload) {
            state.login = payload;
        }
    },
    actions: {
    // 异步修改状态
    },
    getters: {
    // 获取状态
    }
});

export default store;
