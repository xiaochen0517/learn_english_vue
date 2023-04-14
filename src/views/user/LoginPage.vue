<template>
    <div class="login-page">
        <img class="login-background" src="https://api.cyrilstudio.top/bing/image.php" alt="background image">
        <el-card class="login-card">
            <img class="login-img" src="@/assets/images/user/login_bg.png" alt="logo"/>
            <el-form class="form-box" :model="loginFormData" :rules="loginFormRules" label-width="80px">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="loginFormData.username" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="loginFormData.password" type="password" placeholder="请输入密码"/>
                </el-form-item>
                <el-form-item label-width="0px">
                    <el-button class="login-button" type="primary" @click="doLoginClick">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import loginApi from "@/api/user/LoginApi";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import {reactive} from "vue";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

const loginFormData = reactive({
    username: "",
    password: "",
});

const loginFormRules = reactive({
    username: [{required: true, message: "请输入用户名", trigger: "blur"}],
    password: [{required: true, message: "请输入密码", trigger: "blur"}],
});

const doLoginClick = () => {
    loginApi.login(loginFormData).then((res) => {
        console.log("success", res);
        ElMessage.success("登录成功");
        store.commit("setLogin", true);
        store.commit("setToken", res.data);
        router.push("/");
    }).catch((err) => {
        console.log("error", err);
        ElMessage.error(err.msg);
    });
};
</script>

<script>
export default {
    name: "LoginPage",
    // components: {},
};
</script>

<style lang="less" scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
    overflow: hidden;

    .login-background {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    .login-card {
        width: 450px;
        height: 400px;
        position: relative;

        .login-img {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }

        .form-box {
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: white;
            padding: 24px 0;

            .login-button {
                width: 100%;
            }
        }
    }
}
</style>
