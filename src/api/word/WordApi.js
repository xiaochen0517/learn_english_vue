import axios from "@/api/axios/Axios";

export default {
    // 获取单词本列表
    getWordBookList(name = "", count = 10, page = 1) {
        return axios.get(`/api/word/book/list?count=${count}&page=${page}&name=${name}`);
    }
};
