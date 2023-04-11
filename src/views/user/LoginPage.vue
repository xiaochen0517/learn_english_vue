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

<script>
import loginApi from "@/api/user/LoginApi";
import {mapState, mapMutations} from "vuex";

export default {
    name: "LoginPage",
    components: {},
    data() {
        return {
            loginFormData: {
                username: "",
                password: ""
            },
            loginFormRules: {
                username: [
                    {required: true, message: "请输入用户名", trigger: "blur"}
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: "blur"}
                ]
            }
        };
    },
    computed: {
        ...mapState(["login", "token"])
    },
    methods: {
        ...mapMutations(["setLogin", "setToken"]),
        doLoginClick() {
            loginApi.login(this.loginFormData).then(res => {
                console.log("success", res);
                this.setLogin(true);
                this.setToken(res.data);
                this.$router.push("/");
            }).catch(err => {
                console.log("error", err);
                this.$message.error(err.msg);
            });
        }
    }
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

    .login-background{
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
