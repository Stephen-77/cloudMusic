# vue-music
项目概述: 该项目是基于vue2的仿网易云音乐PC端，是我自己个人独自开发。

技术选型: Vue2+Vuex+Axios+elementUI+Cropper

## 项目线上地址
### 目前移动端还未做适配,pc端完好
网页预览地址：http://47.104.17.25/

## 目前完成功能

- 歌曲播放器：播放、拖动进度、音量调整、下载、播放列表，歌曲页歌词滚动
- 发现页：推荐、歌单、歌手、排行榜
- 登录：手机号密码登录，二维码登录，验证码登录，退出登录
- 歌曲列表：喜欢音乐，歌手入口，当前播放音乐行
- 各详情页
  - 歌单详情页：歌曲列表、歌单页搜索、加载完整歌单、收藏、评论
  - 歌手详情页：歌手top50热歌列表、歌手描述、、相似歌手
  - 用户详情页：基本信息、地区（仅支持国内地区）、创建的歌单、收藏的歌单、更新个人信息和头像
- 搜索：歌曲、歌手、歌单
- 我的收藏（需要登录）：收藏的专辑
- 最近播放（本地存储，不是云端的播放记录）
- 路由懒加载及代码分块，添加未登录情况下导航守卫，路由 props 解耦合
- 使用 Vuex 管理登录状态、当前歌曲列表及歌曲状态、其余多组件状态

#### 后台GitHub地址
https://github.com/Binaryify/NeteaseCloudMusicApi 开发时对应版本：4.0.23 若出现问题则选择最新版本

#### 目标计划
加上评论、MV功能。
并且使用vue3+Ts重构项目
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
