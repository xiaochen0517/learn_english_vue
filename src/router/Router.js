import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: () => import("../views/NotFound.vue"),
            meta: {
                sideBar: false
            }
        },
        {
            path: "/",
            name: "Home",
            component: () => import("../views/HomePage.vue"),
            meta: {
                sideBar: true
            }
        },
        {
            path: "/login",
            component: () => import("../views/user/LoginPage.vue"),
            meta: {
                sideBar: false
            }
        },
        {
            path: "/word/book",
            component: () => import("../views/word/WordBookPage.vue"),
            meta: {
                sideBar: false
            }
        }
    ]
});

export default router;
