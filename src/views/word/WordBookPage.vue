<script>
export default {
    name: "WordBookPage"
};
</script>

<script setup>
import {ref, onMounted} from "vue";
import WordApi from "@/api/word/WordApi";

const wordBookList = ref([]);
onMounted(() => {
    queryWordBookList();
});
const queryWordBookList = () => {
    WordApi.getWordBookList().then(res => {
        console.log("success", res);
        wordBookList.value = res.data.records;
    }).catch(err => {
        console.log("error", err);
    });
};
</script>

<template>
    <div class="word-book-page flex-row">
        <el-card v-for="(item, index) in wordBookList" :key="index" class="word-book-card">
            <div class="word-book-body">
                <div class="word-book-title">{{ item.name }}</div>
            </div>
        </el-card>
    </div>
</template>

<style lang="less" scoped>
.word-book-page {
    padding: 10px;

    .word-book-card{
        margin: 10px;

        .word-book-body{
            width: 200px;
            height: 280px;

            .word-book-title{
                font-size: 20px;
                line-height: 40px;
                font-weight: bold;
                text-align: center;
                margin-top: 10px;
            }
        }
    }
}
</style>
