# Koishi 核心文档与知识图谱索引 (Documentation Index)

本目录汇集了项目底层微内核架构、子模块协同规范、现代 JavaScript 元编程原理及 TypeScript 高阶类型系统的权威技术指南与专题报告。

---

## 目录结构总览

```
docs/
├── README.md                                  # 文档中心总览索引 (本文件)
├── koishi/                                    # Koishi 核心框架与微内核生态指南
│   ├── dev_debug_playbook.md                  # Koishi & Cordis 开发者调试指南与启动手册
│   ├── koishi_beginner_principles_tutorial.md # Koishi 底层工作原理实战通识教程 (入门通识)
│   ├── koishi_mastery_playbook.md             # Koishi 核心架构与实战精通手册 (进阶架构)
│   └── satori_submodule_codemap.md            # Satori 子模块架构与代码全景图谱 (协议与适配器)
├── javascript/                                # 现代 JavaScript 规范与元编程专题
│   ├── javascript_metaprogramming_playbook.md # 深入解析 JavaScript 元编程 (自省/自修改/拦截)
│   ├── javascript_property_definition_spec.md # 深入解析 JavaScript 属性定义 ([[Set]] vs [[Define]])
│   └── javascript_proxy_report.md             # 深入解析 JavaScript Proxy (13 Traps / Reflect / 权衡)
├── typescript/                                # TypeScript 类型系统与高阶抽象原理
│   ├── generic_programming_report.md          # 深入解析泛型编程 (参数化多态 / 约束 / 黄金法则)
│   ├── ts_type_space_vs_value_space_report.md # TypeScript 类型空间 vs 值空间深度解析报告
│   └── tuple_programming_report.md            # 深入解析元组 (Tuple) (异构序列 / 模式匹配 / 权衡)
└── git/                                       # Monorepo 工程化与版本管理规范
    └── git_submodule_playbook.md              # Git Submodule 规范与故障避坑指南 (SOP / 分支对齐)
```

---

## 分类导航与模块概览

### 1. Koishi 核心框架与生态 (`docs/koishi/`)
专注于 Koishi 微内核架构、服务依赖注入容器（Cordis IoC）、跨平台协议网关（Satori）与开发者调试模型：
* [**`koishi_beginner_principles_tutorial.md`**](file:///d/koishi/docs/koishi/koishi_beginner_principles_tutorial.md)：从 Context 树、Service 依赖注入、Disposable 资源释放到 Minato ORM 实验的零基础通识教程。
* [**`koishi_mastery_playbook.md`**](file:///d/koishi/docs/koishi/koishi_mastery_playbook.md)：分层解耦体系、Satori 消息流水线、洋葱中间件模型与工业级扩展食谱。
* [**`dev_debug_playbook.md`**](file:///d/koishi/docs/koishi/dev_debug_playbook.md)：Master-Worker 多进程架构解析、CLI 调试参数、Node Inspector 及 VS Code 源码断点调试指南。
* [**`satori_submodule_codemap.md`**](file:///d/koishi/docs/koishi/satori_submodule_codemap.md)：统一消息协议标准、Element AST 渲染引擎、多协议网关服务端与 15+ 异构适配器全景代码导读。

### 2. JavaScript 语言与元编程 (`docs/javascript/`)
探讨 ECMAScript 规范层面的核心对象机制、属性模型与底层操作介入：
* [**`javascript_metaprogramming_playbook.md`**](file:///d/koishi/docs/javascript/javascript_metaprogramming_playbook.md)：自省（Introspection）、自修改（Self-Modification）与介入拦截（Intercession）三大支柱。
* [**`javascript_proxy_report.md`**](file:///d/koishi/docs/javascript/javascript_proxy_report.md)：13 种原生 Trap、`Reflect` 协同、不可变量（Invariants）保护机制与元编程性能权衡。
* [**`javascript_property_definition_spec.md`**](file:///d/koishi/docs/javascript/javascript_property_definition_spec.md)：`[[Set]]` 动态赋值 vs `[[Define]]` 属性定义、描述符配置与类私有槽字段底层机制。

### 3. TypeScript 类型系统与抽象 (`docs/typescript/`)
解构强类型语言中的抽象边界、二元空间映射与编译期元编程：
* [**`ts_type_space_vs_value_space_report.md`**](file:///d/koishi/docs/typescript/ts_type_space_vs_value_space_report.md)：值空间与类型空间的彻底分离、双重身份关键字、跨空间桥接与类型体操本质。
* [**`generic_programming_report.md`**](file:///d/koishi/docs/typescript/generic_programming_report.md)：参数化多态机制、类型上下界约束与“泛型单次出现反模式”等黄金工程法则。
* [**`tuple_programming_report.md`**](file:///d/koishi/docs/typescript/tuple_programming_report.md)：固定长度异构序列、变长元组解构推导、只读元组与函数重载参数应用。

### 4. Git 规范与版本协同 (`docs/git/`)
指导大型 Monorepo 跨仓库子模块协作的最佳实践与故障排查：
* [**`git_submodule_playbook.md`**](file:///d/koishi/docs/git/git_submodule_playbook.md)：根治游离头指针（Detached HEAD）、`.gitmodules` 与 `.git/config` 分支配置脱节、标准操作流程（SOP）与排错速查表。
