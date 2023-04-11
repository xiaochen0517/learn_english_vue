import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: () => import("../views/NotFound.vue")
        },
        {
            path: "/",
            name: "Home",
            component: () => import("../views/HomePage.vue")
        },
        {
            path: "/login",
            component: () => import("../views/user/LoginPage.vue")
        },
    ]
});

export default router;
