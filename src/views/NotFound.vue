<template>
    <div class="not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <hello-world/>
    </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "NotFound",
    components: {HelloWorld}
};
</script>

<style lang="less" scoped>
.not-found {
  text-align: center;
  margin-top: 60px;
}
</style>
