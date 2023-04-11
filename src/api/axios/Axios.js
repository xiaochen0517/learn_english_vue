import axios from "axios";
import {ElMessage} from "element-plus";
import store from "@/store/Store";
import router from "@/router/Router";

const instance = axios.create({
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * 请求拦截
 */
instance.interceptors.request.use(
    config => {
        // 获取token
        const token = store.state.token;
        // 添加token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        console.log(error);
        ElMessage.error(error.message);
        return Promise.reject(error);
    }
);

/**
 * 响应拦截
 */
instance.interceptors.response.use(
    response => {
        console.log("request success=>", response);
        // 检查code是否为200
        if (response.data.code == 200) {
            return response.data;
        } else {
            if (response.data.code == 401) {
                // 用户未登录，跳转到登录界面
                router.push("/login");
            }
            return Promise.reject(response.data);
        }
    },
    error => {
        // 对响应错误做些什么
        console.log("request error =>", error);
        ElMessage.error(error.message);
        return Promise.reject(error);
    }
);

export default instance;
