<template>
    <div class="login-page">
        <h1>Login Page</h1>
        <hello-world/>
    </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "LoginPage",
    components: {HelloWorld}
};
</script>

<style lang="less" scoped>
.login-page {
  text-align: center;
  margin-top: 60px;
}
</style>
