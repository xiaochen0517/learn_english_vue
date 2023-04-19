<script>
import SideBarComponent from "@/components/bar/SideBarComponent.vue";

export default {
    name: "App",
    components: {
        SideBarComponent
    }
};
</script>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const sideBarDisplay = ref(true);
onMounted(() => {
    setSideBarDisplay(router.currentRoute.value);
});
// 监听路由变化，如果当前路由login或者notFound，则不显示侧边栏
router.afterEach((to) => {
    setSideBarDisplay(to);
});
const setSideBarDisplay = (route) => {
    // 获取路由中的sideBar配置
    const sideBar = route.meta.sideBar;
    // 将值赋值给sideBarDisplay
    sideBarDisplay.value = sideBar == undefined ? true : sideBar;
};
</script>

<template>
    <div id="app">
        <el-container>
            <el-aside v-if="sideBarDisplay">
                <side-bar-component/>
            </el-aside>
            <el-main style="padding: 0;">
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<style>
html, body {
    margin: 0;
    padding: 0;
    font-family: "HarmonyOS_Sans", "PingFang SC", "Microsoft YaHei", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
}
</style>
