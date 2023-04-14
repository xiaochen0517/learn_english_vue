<template>
    <div class="home-page">
        <div class="tool-bar">
            <el-link @click="logoutClick">退出登录</el-link>
        </div>
        <el-card>
            <el-input v-model="word" placeholder="请输入内容"/>
            <el-button type="primary" @click="doSearchClick">搜索</el-button>
            <div class="word-card">
                <div class="word-box flex-row">
                    <div class="word-text">{{ wordInfo.word }}</div>
                    <div class="phonetic-item voice-icon" @click="playAudioClick(wordInfo.voice.queryVoiceUrl)">
                        &#xe82d;
                    </div>
                </div>
                <div class="phonetic-box flex-row">
                    <div class="phonetic-item phonetic-text">[{{ wordInfo.phonetic.usPhonetic }}]</div>
                    <div class="phonetic-item voice-icon" @click="playAudioClick(wordInfo.voice.usVoiceUrl)">
                        &#xe82d;
                    </div>
                    <div class="phonetic-item phonetic-text">[{{ wordInfo.phonetic.ukPhonetic }}]</div>
                    <div class="phonetic-item voice-icon" @click="playAudioClick(wordInfo.voice.ukVoiceUrl)">
                        &#xe82d;
                    </div>
                </div>
                <div class="word-explains">
                    <div v-for="(item, index) in wordInfo.explains" :key="index" class="explain-item">{{ item }}</div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {ElMessageBox, ElMessage} from "element-plus";
import loginApi from "@/api/user/LoginApi";
import dictApi from "@/api/dict/DictApi";

const store = useStore();
const router = useRouter();
const login = computed(() => store.state.login);

const word = ref("word");

const doSearchClick = () => {
    console.log("word", word.value);
    if (word.value.length <= 0) {
        ElMessage.error("请输入内容");
        return;
    }
    queryWord(word.value);
};

const wordInfo = ref({
    id: null,
    word: "",
    phonetic: {
        defPhonetic: "",
        usPhonetic: "",
        ukPhonetic: "",
    },
    voice: {
        queryVoiceUrl: "",
        transVoiceUrl: "",
        usVoiceUrl: "",
        ukVoiceUrl: "",
    },
    explains: [],
    derivedForms: [],
});

const queryWord = (word) => {
    dictApi.queryWord(word).then(res => {
        console.log("success", res);
        wordInfo.value = res.data;
        ElMessage.success("查询成功");
    }).catch(err => {
        console.log("error", err);
        ElMessage.error(err.msg);
    });
};

onMounted(() => {
    if (!login.value) {
        router.push("/login");
    }
    doSearchClick();
});

const logoutClick = () => {
    ElMessageBox.confirm("确认退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        doLogout();
    }).catch(() => {
    });
};

const doLogout = () => {
    loginApi.logout().then(res => {
        console.log("success", res);
        ElMessage.success("退出登录成功");
        store.commit("setLogin", false);
        store.commit("setToken", null);
        router.push("/login");
    }).catch(err => {
        console.log("error", err);
    });
};

const playAudioClick = (url) => {
    const audio = new Audio(url);
    audio.play();
};

</script>

<style lang="less" scoped>
.home-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;

    .tool-bar {
        position: absolute;
        top: 0;
        right: 0;
    }
}

.word-card {
    width: 500px;

    .word-box {
        line-height: 45px;

        .word-text {
            font-size: 30px;
            font-weight: bold;
            color: @primary-text-color;
            margin-right: 10px;
        }

        .voice-icon{
            font-size: 24px;
            cursor: pointer;
        }
    }

    .phonetic-box {
        font-size: 14px;
        font-weight: normal;
        line-height: 24px;
        color: @primary-text-color;

        .phonetic-item {
            margin-right: 5px;
        }

        .voice-icon {
            font-size: 18px;
            cursor: pointer;
        }
    }

    .voice-icon:hover {
        color: @brand-color;
    }

    .word-explains {
    }
}
</style>
