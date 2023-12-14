import MediumZoom from "vite-plugin-vitepress-medium-zoom"
// https://vitepress.dev/reference/site-config
export default {
  title: "个人博客",
  base: "/",
  description: "blog-vitepress",
  vite: {
    plugins: [
      MediumZoom.vite()
    ]
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      src: 'https://api.iconify.design/emojione:aerial-tramway.svg',
      width: 40,
      height: 40
    },
    nav: [
      { text: 'blog', link: '/menu/2023/bash-alias' },
    ],

    sidebar: {
      "/menu/": [
        {
          text: '2️⃣0️⃣2️⃣3️⃣',
          items: [
            { text: 'git bash配置命令行别名技巧🥓', link: '/menu/2023/bash-alias' },
            { text: 'chrome117发起mock请求🍕', link: '/menu/2023/chrome117-mock' },
            { text: '发布npm依赖包🍥', link: '/menu/2023/publish_npm' },
            { text: 'pnpm依赖包管理🍟', link: '/menu/2023/pnpm' }
          ]
        },
        {
          text: '2️⃣0️⃣2️⃣2️⃣',
          collapsed: true,
          items: [
            { text: '用户体验法则', link: '/menu/2022/用户体验法则' },
            { text: 'async/await语法糖真的好用吗', link: '/menu/2022/async&await' },
            { text: '浏览器的缓存', link: '/menu/2022/Browser-cache' },
            { text: 'CSS盒模型', link: '/menu/2022/debugger' },
            { text: 'chrome浏览器打断点调试', link: '/menu/2022/css-box' },
            { text: '使用eslint和prettier来格式化代码风格', link: '/menu/2022/eslint&prettier' },
            { text: '使用一个switch开关来实现暗夜主题和明亮主题的切换', link: '/menu/2022/switchTheme' },
            { text: 'Vue的虚拟DOM以及Diff算法', link: '/menu/2022/VirtualDOM&Diff' },
            { text: '微信公众号网页授权', link: '/menu/2022/weixinOauth' },
          ]
        },
        {
          text: '2️⃣0️⃣2️⃣1️⃣',
          collapsed: true,
          items: [
            { text: '回顾一下2021年', link: '/menu/2021/用户体验法则' },
            { text: '子组件改变父组件值', link: '/menu/2021/v-modelSkill' },
            { text: '防抖和节流', link: '/menu/2021/debounce&throttle' },
            { text: '移动端适配方案', link: '/menu/2021/Mobilefit' },
            { text: 'css 布局', link: '/menu/2021/cssLayout' },
            { text: 'Vue中的响应式原理', link: '/menu/2021/VueReactive' },
            { text: 'TS语法学习', link: '/menu/2021/Typescript' },
            { text: '记一次docker的使用', link: '/menu/2021/Docker' },
            { text: '使用Composition API复用逻辑', link: '/menu/2021/composition-api' },
            { text: 'js继承的6种方法', link: '/menu/2021/jsextend' },
            { text: 'webpack5 模块联邦', link: '/menu/2021/modulefederation' },
            { text: 'Vue mixins混入使用以及Vuex', link: '/menu/2021/mixins-vuex' },
            { text: '我的自学前端路线', link: '/menu/2021/learnroad' },
            { text: 'Event-loop与微任务，宏任务', link: '/menu/2021/event-loop' },
            { text: '代码风格', link: '/menu/2021/codeStyle' },
            { text: '互联网', link: '/menu/2021/internet' },
            { text: 'css预处理器', link: '/menu/2021/less-scss' },
            { text: 'vscode 插件demo', link: '/menu/2021/vscodePlugin' },
            { text: 'chrome插件demo', link: '/menu/2021/chromePlugin' },
            { text: 'JS的数据类型总结', link: '/menu/2021/dataType' },
            { text: '工作中的一些总结', link: '/menu/2021/workSummary' },
            { text: '记录一次团队案例', link: '/menu/2021/teamWork' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tyj-321' }
    ]
  }
}
