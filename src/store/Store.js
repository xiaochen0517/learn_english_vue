import {createStore} from "vuex";

const store = createStore({
    state: {
        // 状态
        login: false,
        token: null,
    },
    mutations: {
        // 同步修改状态
        setLogin(state, payload) {
            state.login = payload;
        },
        setToken(state, payload) {
            state.token = payload;
        },
        // 从本地存储中加载状态
        initState(state) {
            const savedState = localStorage.getItem("vuex");
            if (savedState) {
                this.replaceState(Object.assign(state, JSON.parse(savedState)));
            }
        },
    },
    actions: {
        // 保存状态到本地存储
        saveState({state}) {
            localStorage.setItem("vuex", JSON.stringify(state));
        }
    },
    getters: {
        // 获取状态
    }
});

// 每次状态变化时都保存到本地存储
store.subscribe(() => {
    store.dispatch("saveState");
});

// 初始化状态
store.commit("initState");

export default store;
