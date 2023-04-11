import axios from "@/api/axios/Axios.js";

export default {
    // 登录接口
    login(data) {
        return axios.post("/api/login", data);
    }
};
