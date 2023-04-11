module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
    ],
    globals: {
        require: false,
        module: false,
    },
    rules: {
        "indent": ["error", 4],
        "vue/html-indent": ["warn", 4],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "vue/require-default-prop": "off",
        "newline-per-chained-call": ["error", {"ignoreChainWithDepth": 2}],
        "vue/max-attributes-per-line": "off",
        "vue/html-closing-bracket-spacing": ["error", {
            "startTag": "never",
            "endTag": "never",
            "selfClosingTag": "never"
        }]
    }
};
