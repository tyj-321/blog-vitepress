# chrome117发起mock请求太方便了！！

chrome117版本更新中提供了一个可以在network面板直接发起mock请求的功能，这样就可以在开发阶段，前端直接写好接口路径，并按照正常开发逻辑发起请求，本地调试完成后，根据后端提供的接口文档，做相应的修改即可，基本前端开发阶段不用依赖后端的接口文档，就能完成请求的逻辑

## 开始使用
- 确保chrome浏览器的版本在117及以上即可使用该功能

新写的接口直接发起请求，是会报错404的

![](/chrome117-mock/新请求404.png)

右键接口，选择`Override content`，首次使用需要选择目标文件夹，可以在桌面创建一个文件夹即可，并`select folder`选择该文件夹

![](/chrome117-mock/select-folder.png)

并选择访问权限允许

![](/chrome117-mock/允许权限.png)


:::tip
- 右键接口，选择`Override headers`，这里可以配置返回头部信息，加上`Content-Type:application/json;charset=UTF-8`可以避免一些中文乱码的问题
![](/chrome117-mock/header.png)
- 返回的json内容需要key和value都加上双引号，才能返回正确，类似下面这样
![](/chrome117-mock/json.png)
:::

然后在network面板中就可以看到这个有个标记的接口，并返回mock数据

![](/chrome117-mock/成功返回mock数据.png)

## 取消使用本地mock数据
在mock数据配置中取消勾选`Enable Local Overrides`，并清除即可，这样就不会使用本地的mock数据了

![](/chrome117-mock/取消使用mock.png)

## 总结
chrome117版本更新中新增的直接在network页面发起mock请求的功能，整体体验还是比较丝滑
<br>
利用这个功能可以快速地使用模拟数据来开发前端的请求逻辑，不需要依赖后端的接口文档就可以进行开发，快速搭建起页面并书写代码逻辑，最后联调时只需要对应接口文档修改下路径和参数字段即可，可以作为前端开发中的一个提升开发效率的工具
