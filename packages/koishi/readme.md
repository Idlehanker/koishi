<div align="center">
  <a href="https://koishi.chat/" target="_blank">
    <img width="160" src="https://koishi.chat/logo.png" alt="logo">
  </a>
  <h1 id="koishi"><a href="https://koishi.chat/" target="_blank">Koishi</a></h1>

[![Codecov](https://img.shields.io/codecov/c/github/koishijs/koishi?style=flat-square)](https://codecov.io/gh/koishijs/koishi)
[![downloads](https://img.shields.io/npm/dm/koishi?style=flat-square)](https://www.npmjs.com/package/koishi)
[![npm](https://img.shields.io/npm/v/koishi?style=flat-square)](https://www.npmjs.com/package/koishi)
[![GitHub](https://img.shields.io/github/license/koishijs/koishi?style=flat-square)](https://github.com/koishijs/koishi/blob/master/LICENSE)

</div>

Koishi 是一个跨平台、可扩展、高性能的聊天机器人框架。

它的名字和图标设计来源于来源于东方 Project 中的角色古明地恋 (Komeiji Koishi)。古明地恋是一个会做出无意识举动的角色，取这个名字既象征着聊天机器人的主题，也蕴含了开发者为之倾注的热爱。

## 特性

### 开箱即用

Koishi 提供了高度便利的控制台，让你无需基础让你在几分钟之内搭建自己的聊天机器人。

- 提供在线插件市场，即使没有任何编程基础，也能轻松在控制台中下载安装插件
- 支持 QQ，Telegram，Discord，飞书等主流聊天平台，支持多账户和跨平台数据互通
- 随时随地通过控制面板监控运行状态，控制机器人的行为，甚至上号聊天

### 生态丰富

经过了长达四年的迭代，Koishi 已经发展出了丰富的插件生态和与之匹配的健壮系统。超过 3000 个官方和社区插件覆盖了机器人开发的方方面面，从平台支持、数据库、资源存储、网页控制台、状态管理到具体的业务功能一应俱全。无论你的目标是构建大型交互应用还是轻量级的辅助机器人，Koishi 都为你提供了最佳实践。如果担心在复杂的功能中迷失方向，我们也准备了细致的文档来提供帮助。

### 专为开发者打造

Koishi 更为开发者准备了众多专业功能，使插件开发者得以在各种复杂需求中构建规模化的解决方案。

- 类型支持：Koishi 完全基于 TypeScript 开发，拥有顶级的类型支持，丰富的代码提示让你在编写代码的时候甚至无需查看文档
- 单元测试：所有核心功能均已经通过单元测试，既确保了可靠性，也为开发者提供了一套测试插件和定位问题的最佳实践
- 模块热重载：开发 Koishi 插件时，只需轻点保存即可热重载，无需频繁重启机器人，如同前端开发一样丝滑顺畅

## 快速起步

[前往文档](https://koishi.chat/manual/starter/)

## 跨仓库开发（external/）

本仓库依赖的上游 monorepo（[satorijs/satori](https://github.com/satorijs/satori) 与 [cordiverse/minato](https://github.com/cordiverse/minato)）以 git submodule 的形式挂载在 `external/` 目录下（satori 跟踪 `v4` 分支，minato 跟踪 `v3` 分支，与 koishi/dev 对齐）。**该功能目前在 `dev` 分支上可用**（`master` 等其他分支不包含 `.gitmodules`，直接对默认分支执行 `--recursive` 克隆不会拉取 submodule）。yarn workspaces 会自动将这些包链接进 `node_modules`，使本地源码直接生效。`external/` 下的其他内容不会被版本控制。

### 搭建流程

```bash
# 新克隆：submodule 仅在 dev 分支提供，-b dev --recursive 会自动拉取并检出固定提交
#git clone --recursive -b dev https://github.com/koishijs/koishi
git clone --recursive -b dev https://github.com/Idlehanker/koishi.git

# 已有克隆：先切换到 dev 分支，再初始化 submodule
git checkout dev
git submodule update --init

# 必须使用 corepack yarn（系统自带的 yarn 1.x 不支持本仓库的 packageManager 约定）
COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack yarn install
COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack yarn build
```

submodule 默认固定在注册时的提交（可复现）；如需跟进上游分支最新提交，执行 `git submodule update --remote`（按 `.gitmodules` 中的 `branch = v4` / `branch = v3` 跟踪）。注意 git 不会自动执行安装与构建，上述两条 corepack 命令始终需要手动运行。

### 历史问题总结

以下问题均已在本仓库中修复，列出以避免复发：

1. **上游分支不匹配**：上游 `main` 分支为下一代开发线（minato 已更名为 `@cordisjs/plugin-database`，satori core 为 5.0.0-alpha），不满足 koishi 的 `^3.7.0` / `^4.6.0` 依赖范围，请务必检出 `v3` / `v4` 分支。
2. **不要在 `tsconfig.base.json` 中添加 `paths`**：各包通过 `node_modules` 中的 workspace 符号链接解析彼此的 `lib/index.d.ts`，paths 指向源码会导致 `yakumo tsc` 构建失败（TS6059）。
3. **`@types/koa` 版本冲突**：根 `package.json` 的 `resolutions` 已固定 `@types/koa__router/@types/koa` 为 `^2`（workspace 成员自身的 resolutions 会被 yarn 忽略，见 YN0057）。
4. **过期的增量编译缓存**：修改依赖或 resolutions 后，先执行 `corepack yarn exec yakumo tsc --clean` 再构建，避免过期的 `tsbuildinfo` 缓存导致错误。
5. **IDE 误报 TS2307**：执行 clean 之后 IDE 可能缓存 `@satorijs/*` 等模块的解析失败，先重新 `build`，再重启 TS Server 即可消失。

### 常用命令

```bash
COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack yarn build            # 构建全部（esbuild + tsc）
COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack yarn exec yakumo tsc --clean   # 清理构建产物与缓存
COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack yarn test            # 运行单元测试
```
## Monorepo supported
```bash
# update submodule by
git submodule update --init --recursive

# pull all submodules
git pull --recurse-submodules
```
## 许可证

Koishi 完全使用 [MIT](./LICENSE) 协议开源，维护良好的开源生态从我做起 (*>ω<)φ

Copyright © 2019-2023, Shigma

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fkoishijs%2Fkoishi.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fkoishijs%2Fkoishi?ref=badge_large)

## 更多

- [贡献指南](./CONTRIBUTING.md)
- [参与讨论](https://koishi.chat/about/contact.html)
- [支持作者](https://afdian.net/a/shigma)
