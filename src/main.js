import {createApp} from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router/Router.js";
import store from "@/store/Store.js";
import axios from "@/api/axios/Axios.js";

// style
import "@/assets/style/global.less";
import "@/assets/font/fonts.css";
import "@/assets/style/iconfont.less";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.config.globalProperties.$axios = axios;
app.mount("#app");
