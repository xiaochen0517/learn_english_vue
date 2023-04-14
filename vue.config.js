const {defineConfig} = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    css: {
        loaderOptions: {
            less: {
                additionalData: `@import "@/assets/style/variable.less";`
            }
        }
    }
});
