import axios from "@/api/axios/Axios.js";

export default {
    // 查询单词
    queryWord(word) {
        return axios.put("/api/dict/query/word", {word: word});
    },
    // 查询单词例句
    querySentence(word) {
        return axios.put("/api/dict/query/word/sentence", {word: word});
    }
};
