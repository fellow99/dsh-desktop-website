# AGENTS.md — dsh-desktop-website（产品官网）AI Agent 工作规范

> 本文件定义了本项目（`dsh-desktop-website`，DSH Desktop 产品官网）中 AI Agent 必须遵守的规范和工作流程。
> 所有规范均基于本机实际已安装的技能（skills）编写，不含虚构内容。
> 总则见 `~/.agents/AGENTS.md`；工作区总纲见上级 `../AGENTS.md`；本文件为项目级规范，冲突时以本文件为准。

---

## 一、项目背景（必读）

**DSH Desktop 产品官网** —— 为四款 DSH Desktop Edition（`dsh-desktop`、`dsh-desktop-hos`、`dsh-desktop-ark`、`dsh-desktop-android`）制作的营销落地页。

- 线上地址：<https://fellow99.github.io/dsh-desktop-website/>
- **纯静态、零依赖**：原生 HTML/CSS/vanilla JS，无框架、无构建、无外部请求（字体/CDN/统计），须可通过 `file://` 离线完整渲染；由 GitHub Actions（`.github/workflows/pages.yml`）部署到 GitHub Pages。

### 文件结构
| 文件 | 用途 |
|---|---|
| `index.html` | 英文页（`lang="en"`） |
| `index_zh.html` | 简体中文页（`lang="zh-CN"`），与 `index.html` 1:1 结构镜像 |
| `style.css` | 共享样式表，全部主题经 CSS 自定义属性 |
| `script.js` | 共享主题切换逻辑（语言无关，`data-label-*` 驱动） |
| `images/light.png` `images/dark.png` | 鸿蒙真机截图，明/暗两主题（1920×1080） |

### 强制守护规则（必须永久成立）
- **每一条声明都须追溯到产品 README 或源码**；产品事实变化时须同步**两份语言页**与本文档事实。
- **严禁编造能力**：无自动更新、无代码签名、无商店分发、无「官方 DeepSeek 产品」措辞——壳工程是**独立开源项目**。
- 中英两页必须**结构 1:1 相同**（段序、类名、交互），仅文案翻译。
- 设计与交互规则详见本仓库 `README.md` 第 3–8 节（页面结构、设计系统、交互、响应式、部署、贡献检查清单）。

---

## 二、代码地图（CodeGraph）规范 ——【核心】

### 2.1 已建索引
本项目已初始化 `.codegraph/` 代码地图（HTML/JS/CSS）。**探索/修改本工程代码时优先使用 `codegraph-cli`**（工程较小，直接 Read 亦可，但应保持索引习惯）。

### 2.2 索引自动更新（post-commit 钩子）——【强制】
- 本工程 git **`post-commit` 钩子**已安装：每次 commit 后自动 `codegraph sync` 增量更新 `.codegraph/`。
- 钩子非阻塞、失败只写日志（`logs/codegraph-sync.log`）。

### 2.3 命令速查
| 场景 | 命令 |
|---|---|
| 探索功能区域 | `codegraph context "<任务描述>"` |
| 索引状态 / 增量更新 | `codegraph status` / `codegraph sync` |

---

## 三、通用规范

### 3.1 语言
- 与用户交互、编写文档、提交注释使用**中文**；代码、变量、技术术语使用**英文**。
- **网站文案**：英文页用英文，中文页用中文，必须逐项对译一致。

### 3.2 质量
- 前端界面/视觉开发遵循 **`frontend-design`** 技能指导，避免模板化默认样式。
- 每次改文案/结构须**同时维护两页**并核对 `README.md` 第 8 节贡献检查清单（离线检查 `file://`、1280/768/390 视觉检查、主题还原、reduced-motion）。
- 严禁空 `catch(e) {}`；前端脚本保持零依赖、离线可运行。

---

## 四、Git 提交规范（强制使用 `git-commit` 技能）

- 提交前先加载 **`git-commit`** 技能；提交注释**必须**用 [Conventional Commits](https://www.conventionalcommits.org/) 格式 `<type>[optional scope]: <description>`。
- 仅允许 type：`feat` / `fix` / `docs` / `style` / `refactor` / `perf` / `test` / `build` / `ci` / `chore` / `revert`。
- 本工程为**子模块**：本工程内提交后，须回到**父工程**提交新的子模块指针。
- **严禁** `--no-verify` 跳过 Git Hooks（除非用户明确要求）。

---

## 五、技能快速索引

| 任务类型 | 必备技能 |
|---|---|
| Git 提交 | `git-commit` |
| 代码库探索 / 代码地图 | `codegraph-cli` |
| 前端界面设计 | `frontend-design` |
| 代码审查 | `requesting-code-review` / `receiving-code-review` |
| 调试 | `systematic-debugging` |
| 产品/需求规划 | `brainstorming` |

---

## 六、违规处理

违反以上任何规范，Agent 必须立即停止、向用户报告、等待指示后再继续。

---

> **最后更新**：2026-11-02
> **维护者**：fellow99
