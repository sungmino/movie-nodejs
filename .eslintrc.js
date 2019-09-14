module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "amd": true,
        "node": true,
        "commonjs": true
    },
    
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "eslint-plugin"
    ],
    "rules": {
        "semi": [2, "never"],
        "eqeqeq": [2, "smart"],
        "quotes": [2, "single", "avoid-escape"],
        "operator-linebreak": [2, "after", { "overrides": { "?": "before", ":": "before" } }],
        "padded-blocks": [2, "never"],
        "quotes": [2, "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
        "rest-spread-spacing": [2, "never"],
        "semi": [2, "never"],
        "semi-spacing": [2, { "before": false, "after": true }]
    },
};