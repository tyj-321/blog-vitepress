# 我把一个vite插件写成了一个库，并发布npm包

## 背景
在一次使用`vitepress`的过程中，我发现`vitepress`并没有完善的插件系统，不像`vurepress`那么完善，`vuepress`中的一些插件还是很好用的，比如文档中的图片放大查看的功能，`vitepress`其实要实现也是可以的，[`github`](https://github.com/vuejs/vitepress/issues/854#issuecomment-1293930473)上有具体讨论实现的方式，但是搜索了一圈，并没有对应的插件实现，我就想着手写一个插件，来优雅地实现这个功能
- 这个博客文档就是使用了该插件来实现图片放大查看的功能

## 寻找实现方案
`vitepress`实际本身是没有插件系统的，所以不能像`vuepress`一样直接使用对应的插件系统开发，但是`vitepress`是基于`vite`的，而[`vite`](https://cn.vitejs.dev/guide/api-plugin.html)是有提供插件开发的，那我就可以开发一个`vite`插件，然后在`vitepress`中引入使用即可
但是在阅读完这个插件文档后，发现在实际提供的钩子函数中，没法获取到`window`对象，而我实现这个放大查看图片的功能是基于这个[`medium-zoom`](https://github.com/francoischalifour/medium-zoom)依赖包的，所以只有寻找其他方法，直到找到了一个[`unplugin`](https://github.com/unjs/unplugin)的工具，这个工具能够扩展出一下钩子函数，给我实现想要的效果，提供了方案
> unplugin extends the excellent Rollup plugin API as the unified plugin interface and provides a compatible layer base on the build tools used with.

> unplugin扩展了优秀的Rollup插件API作为统一的插件接口，并在使用的构建工具上提供了兼容的层。

## 开发插件

我创建了一个`vitepress`项目，并开始根据这个[方案](https://github.com/vuejs/vitepress/issues/854#issuecomment-1293930473)去解耦实现图片放大查看的功能，然后在`.vitepress/config.js`中引入配置内容，从而来实现目标功能，最后我发现我可以直接获取到打包时的源码，我在此基础上把我要的内容根据字符串拼接的方式加上，其实实现起来并想像中的简单

- 核心代码
```js
import { createUnplugin } from 'unplugin'
export default createUnplugin((options) => {
  return {
    name: 'vite-plugin-vitepress-medium-zoom',
    enforce: 'pre',
    transformInclude(id) {
      return id.endsWith('index.js') || id.endsWith('style.css')
    },
    transform(code) {
      // index.js文件需要加上对应的处理，用于做放大查看操作的逻辑
      if (code.includes('export default')) {
        const regex = new RegExp(/export default {/g)
        // 参考https://github.com/vuejs/vitepress/issues/854#issuecomment-1293930473
        const code1 = code.replace(regex, (match, p1, p2) => {
          return `import { onMounted, watch, nextTick } from \'vue\'\nimport mediumZoom from \'medium-zoom\'\nimport { useRoute } from \'vitepress\'\n${match}`
        })
        const code2 = code1.replace(regex, (match, p1, pa) => {
          return `${match}\n  setup() {
    const route = useRoute();
    const initZoom = () => {
      new mediumZoom('.main img', { background: 'var(--vp-c-bg)' });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },`
        })
        return code2
      } else if (code.includes('--vp-c-brand')){
        return code + `.medium-zoom-overlay {
  z-index: 20;
}

.medium-zoom-image {
  z-index: 21;
}`
      }
    },
  }
})
```

## 解耦该功能代码，并打包
既然核心js代码已经完成，我就像对该功能进行打包操作，然后发布到[npm](https://www.npmjs.com/settings/tyj-321/packages)上，这样其他人就可以直接使用该功能了
我选择使用`vite`来打包
```js
// vite.config.js
import { defineConfig } from 'vite'
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                // 指定输出的格式为 ES module
                format: 'esm',
                entryFileNames: `index.js`,
            },
        },
        lib: {
            // 将依赖包打包成 npm 包
            entry: 'src/index.js',
            name: 'vite-plugin-vitepress-medium-zoom'
        },
    },
});
```
## 发布npm包
1、`npm init` 完善这个npm包的一些信息内容，并增加vite打包命令行
```json
// package.json
{
  "name": "vite-plugin-vitepress-medium-zoom",
  "version": "0.0.2",
  "description": "vitepress plugin",
  "main": "dist/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "vite build"
  },
  "files": [
    "dist"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/tyj-321/vite-plugin-vitepress-medium-zoom.git"
  },
  "keywords": [
    "vitepress",
    "plugin"
  ],
  "author": "tangyongjie",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/tyj-321/vite-plugin-vitepress-medium-zoom/issues"
  },
  "homepage": "https://github.com/tyj-321/vite-plugin-vitepress-medium-zoom#readme",
  "dependencies": {
    "buffer": "^6.0.3",
    "medium-zoom": "^1.0.8",
    "path": "^0.12.7",
    "unplugin": "^1.3.1",
    "url": "^0.11.1",
    "vite": "^4.4.9"
  }
}
```
2、`npm run build` 运行vite打包命令行

3、`npm login` 登录npm账号

4、`npm publish` 发布npm包

![](../../publish_npm/npm-package.png)

## 安装使用
```node
pnpm install medium-zoom // 因为实际实现依赖到了这个库
pnpm install vite-plugin-vitepress-medium-zoom
```
```js
// .virepress/config.js
import MediumZoom from "vite-plugin-vitepress-medium-zoom"
export default {
  ... // other config
  vite: {
    plugins: [
      MediumZoom.vite()
    ]
  },
  ... // other config
}
```