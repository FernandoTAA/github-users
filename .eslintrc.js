module.exports = {
    "extends": ["airbnb", "plugin:prettier/recommended", "prettier/react"],
    "env": {
	   "browser": true,
	   "node": true,
       "jquery": true
	  },
    "rules": {
        "import/extensions": ["off", "never"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
         "no-bitwise": ["error", { "allow": ["~"] }],
         "jsx-a11y/label-has-for": 0,
         "react/destructuring-assignment": 0,
         "prettier/prettier": ["error", {"singleQuote": true, printWidth: 150}]

    },

    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "json"
    ]
};


