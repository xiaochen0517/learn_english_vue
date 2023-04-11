import axios from "@/api/axios/Axios.js";

export default {
    // 测试接口
    test() {
        return axios.get("/api/test/get");
    }
};
