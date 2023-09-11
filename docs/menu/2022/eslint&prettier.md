# 使用eslint和prettier来格式化代码风格

## 对比

- [eslint](http://eslint.cn/)
> 可组装的JavaScript和JSX检查工具

`eslint`的主要作用是对javascript进行代码的问题检测，用于发现bug，同时具备一定的代码格式化功能

- [prettier](https://www.prettier.cn/)
> 一个“有态度的代码格式化工具”

`prettier`的主要作用是对代码进行代码格式美化
> In other words, use Prettier for formatting and linters for catching bugs!

## 配合使用
两个的配合使用，eslint负责代码校验，prettier负责代码格式
- 主要问题：两者的部分规则不兼容
可以使用`eslint-config-prettier`来解决两者之间的规则冲突，使用`eslint-plugin-prettier`来让eslint有prettier的格式化代码能力

## 安装依赖
| 依赖                     | 版本   |
| ------------------------ | ------ |
| `@vue/cli-plugin-babel`  | 4.4.6  |
| `@vue/cli-plugin-eslint` | 4.4.6  |
| `eslint-config-prettier` | 8.5.0  |
| `eslint`                 | 7.15.0 |
| `eslint-plugin-prettier` | 3.4.1  |
| `eslint-plugin-vue`      | 7.2.0  |
| `prettier`               | 2.5.1  |
| `babel-eslint`           | 10.1.0 |
:::warning
若所有依赖按照正常下载，最终结果报错，则可按照上面的版本进行下载，避免依赖过高或过低造成的冲突报错，也可以采用重启vscode的方式，查看是否生效
:::

## 添加配置文件`eslintrc.js`
```js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/recommended', // 适用于 Vue.js 2.x，使用 recommended 规则。详见：https://eslint.vuejs.org/user-guide/#usage
    'plugin:prettier/recommended', // eslint-config-prettier 和 eslint-plugin-prettier 两个插件的快捷配置（官方文档有详细说明）
  ],
  rules: {
    quotes: ['error', 'single'], // 使用单引号
  },
  parserOptions: {
    parser: 'babel-eslint', // 用于解析检查项目中用到的非标准或实验性的语法，比如异步 import
  },
}
```
## 添加配置文件`.prettierrc.js`
```js
module.exports = {
  semi: false, // 行末不跟分号
  trailingComma: 'all', // 有尾随逗号
  arrowParens: 'avoid', // 箭头函数单个参数不加分号
  singleQuote: true, // 使用单引号
  printWidth: 110, // 换行长度
  endOfLine: 'auto' // 说明：https://www.jianshu.com/p/b03ad01acd69
}
```
## 添加.vscode文件夹，并添加`setting.json`配置文件
```json
{
    // VScode主题配置
    "editor.tabSize": 2,
    "editor.lineHeight": 24,
    "javascript.updateImportsOnFileMove.enabled": "always", // 移动文件或者修改文件名时，是否自动更新引用了此文件的所有文件。
    // 每次保存是否自动格式化文件，若和eslint冲突了就关闭
    "editor.formatOnSave": false,
    // 每次保存的时候将代码按格式进行修复
    "editor.codeActionsOnSave": {
        // 自动引入缺少的库
        "source.addMissingImports": true,
        // 为代码及Eslint添加自动修复功能
        "source.fixAll": true,
        "source.fixAll.eslint": true
    },
    // 针对.vue、.ts 和 .tsx 文件开启 ESLint 的 autoFix
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "vue",
        "typescript",
        "typescriptreact"
    ],
}
```
## 结束
这样就可以起到根据`prettier`的规则，`eslint`校验并报错，并在保存时自动修复