<script>
import {defineComponent} from "vue";

export default defineComponent({
    name: "HomePage",
});
</script>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessageBox, ElMessage} from "element-plus";
import loginApi from "@/api/user/LoginApi";
import dictApi from "@/api/dict/DictApi";


const store = useStore();
const router = useRouter();
const login = computed(() => store.state.login);

onMounted(() => {
    if (!login.value) {
        router.push("/login");
    }
    queryWord(word.value);
});

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
        // 查询例句
        queryExampleSentence(word);
    }).catch(err => {
        console.log("error", err);
        ElMessage.error(err.msg);
    });
};

const exampleSentence = ref([]);
const queryExampleSentence = (word) => {
    dictApi.queryExampleSentence(word).then(res => {
        console.log("success", res);
        exampleSentence.value = res.data;
    }).catch(err => {
        console.log("error", err);
        ElMessage.error(err.msg);
    });
};
const showSentTransClick = (item) => {
    item.show = item.show == undefined || !item.show;
};

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

const isFlipped = ref(false);
const showDetailClick = () => {
    isFlipped.value = !isFlipped.value;
};
const flipCardClick = () => {
    isFlipped.value = !isFlipped.value;
};

const playAudioClick = (url) => {
    const audio = new Audio(url);
    audio.play();
};

</script>

<template>
    <div class="home-page">
        <div class="tool-bar">
            <el-input v-model="word" placeholder="请输入内容"/>
            <el-button type="primary" @click="doSearchClick">搜索</el-button>
            <el-link @click="logoutClick">退出登录</el-link>
        </div>
        <div class="center-content">
            <div class="main-card-box">
                <div class="word-card card__back" :class="{ card__back__flipped: isFlipped }" @click="showDetailClick">
                    <div class="word-box flex-row">
                        <div class="word-text">{{ wordInfo.word }}</div>
                        <div class="phonetic-item voice-icon iconfont"
                             @click.stop="playAudioClick(wordInfo.voice.queryVoiceUrl)">
                            &#xe82d;
                        </div>
                    </div>
                    <div class="phonetic-box flex-row">
                        <div class="phonetic-item phonetic-text">US: [{{ wordInfo.phonetic.usPhonetic }}]</div>
                        <div class="phonetic-item voice-icon iconfont"
                             @click.stop="playAudioClick(wordInfo.voice.usVoiceUrl)">
                            &#xe82d;
                        </div>
                        <div class="phonetic-item phonetic-text">UK: [{{ wordInfo.phonetic.ukPhonetic }}]</div>
                        <div class="phonetic-item voice-icon iconfont"
                             @click.stop="playAudioClick(wordInfo.voice.ukVoiceUrl)">
                            &#xe82d;
                        </div>
                    </div>
                    <div class="word-explains">
                        <div v-for="(item, index) in wordInfo.explains" :key="index" class="explain-item">
                            {{ item }}
                        </div>
                    </div>
                </div>
                <div class="word-card card__front" :class="{ card__front__flipped: isFlipped }"
                     @click="showDetailClick">
                    <div class="word-box flex-row">
                        <div class="word-text">{{ wordInfo.word }}</div>
                        <div class="phonetic-item voice-icon iconfont"
                             @click.stop="playAudioClick(wordInfo.voice.queryVoiceUrl)">
                            &#xe82d;
                        </div>
                    </div>
                    <div class="phonetic-box flex-row">
                        <div class="phonetic-item phonetic-text">US: [{{ wordInfo.phonetic.usPhonetic }}]</div>
                        <div class="phonetic-item voice-icon iconfont"
                             @click.stop="playAudioClick(wordInfo.voice.usVoiceUrl)">
                            &#xe82d;
                        </div>
                        <div class="phonetic-item phonetic-text">UK: [{{ wordInfo.phonetic.ukPhonetic }}]</div>
                        <div class="phonetic-item voice-icon iconfont"
                             @click.stop="playAudioClick(wordInfo.voice.ukVoiceUrl)">
                            &#xe82d;
                        </div>
                    </div>
                    <div class="example-sentence-box">
                        <div class="example-sentence-title">例句：</div>
                        <div v-for="(item, index) in exampleSentence" :key="index" class="example-sentence-item"
                             @click.stop="showSentTransClick(item)">
                            <div class="example-sentence-text">{{ item.en }}</div>
                            <div class="example-sentence-translation" :class="{'content-blur': !item.show}">
                                {{ item.zh }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="center-bottom-content">
                <el-button class="iconfont" type="default" size="large" @click="flipCardClick">
                    &#xeb63;
                </el-button>
            </div>
        </div>
    </div>
</template>

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

    .center-content {
        display: inline-block;

        .main-card-box {
            width: 600px;
            height: 600px;
            position: relative;
            display: inline-block;
            transform: perspective(5000px) rotateY(0deg);
            transform-style: preserve-3d;
            user-select: none;
        }

        .center-bottom-content {
            display: flex;
            justify-content: center;
            padding-top: 14px;
        }
    }
}

.word-card {
    width: 100%;
    height: 100%;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    transition: all .4s ease-in-out;
    padding: 10px;

    .word-box {
        line-height: 45px;

        .word-text {
            font-size: 35px;
            font-weight: bold;
            color: @primary-text-color;
            margin-right: 10px;
        }

        .voice-icon {
            font-size: 24px;
            cursor: pointer;
        }
    }

    .phonetic-box {
        font-size: 16px;
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
        font-size: 16px;
        line-height: 24px;

        .explain-item {
            margin: 5px 0;
        }
    }

    .example-sentence-box {
        margin-top: 10px;

        .example-sentence-title {
            font-size: 18px;
            line-height: 28px;
            font-weight: bold;
            color: @primary-text-color;
        }

        .example-sentence-item {
            margin: 5px 0;
            font-size: 18px;
            line-height: 24px;

            .example-sentence-text {
                font-weight: normal;
                color: @primary-text-color;
            }

            .example-sentence-translation {
                cursor: pointer;
            }
        }
    }
}

.card__front {
    z-index: 2;
    transform: rotateY(0deg);
}

.card__back {
    z-index: 1;
    transform: rotateY(180deg);
}

.card__front__flipped {
    z-index: 1;
    transform: rotateY(180deg);
}

.card__back__flipped {
    z-index: 2;
    transform: rotateY(360deg);
}

.flipped {
    z-index: 1;
    transform: rotateY(+180deg);
}
</style>
