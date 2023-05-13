module.exports = {
  "parser": "@babel/eslint-parser",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "plugins": [
    "react"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off"
  }
};