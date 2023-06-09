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
        "quotes": ["warn", "double"],
        "semi": ["error", "always"],
        "vue/require-default-prop": "off",
        "vue/max-attributes-per-line": "off",
        "vue/html-closing-bracket-spacing": ["error", {
            "startTag": "never",
            "endTag": "never",
            "selfClosingTag": "never"
        }],
        "vue/html-self-closing": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/no-export-in-script-setup": "off",
        "vue/first-attribute-linebreak": "off",
        "vue/html-closing-bracket-newline": "off",
    }
};
