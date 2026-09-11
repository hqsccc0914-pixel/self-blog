# 花青素的主页

崔川川的个人网站，记录工程、阅读与生活。

**网站：** https://hqsccc.pages.dev/
**仓库：** https://github.com/hqsccc0914-pixel/self-blog

页面采用纯白背景和宋体，首页包含个人简介、照片、阅读文章及生活分享入口。文章列表只显示标题和首次上传日期，文章页保留标题与正文。LaTeX 公式在发布前生成，字体随网站保存，阅读时无需访问外部公式服务。

## 在线编辑与自动发布

在 GitHub 编辑源码并提交到 `main` 后，GitHub Actions 会生成网站、检查资源，然后发布到现有 Cloudflare Pages 项目 `hqsccc`。首次使用需要完成下面的一次性设置。

此仓库发布到现有的直接上传项目，无需新建 Pages 项目，也无需修改原网址。工作流会读取该项目的生产分支，避免把更新误发到预览环境。

### 一次性设置

1. 在 Cloudflare 控制台找到拥有 `hqsccc` 项目的**账户 ID**。
2. 创建 API 令牌，权限设为**账户 → Cloudflare Pages → 编辑**，账户范围选择该项目所属账户。
3. 打开本仓库的 [Actions 密钥设置](https://github.com/hqsccc0914-pixel/self-blog/settings/secrets/actions)，选择 **New repository secret**，保存以下两项：

| 名称 | 填写内容 |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID |
| `CLOUDFLARE_API_TOKEN` | 刚创建的 API 令牌 |

令牌只放在仓库的 Secrets 中，不写入文章、README 或其他仓库文件。

4. 打开 [Actions](https://github.com/hqsccc0914-pixel/self-blog/actions)，允许仓库运行工作流，选择**发布花青素主页 → Run workflow → main → Run workflow**。
5. 运行成功后打开原网站检查。之后每次提交到 `main` 都会自动发布，无需上传 ZIP，也无需在电脑安装 Node.js。

若首次提交时尚未设置上述密钥，发布步骤会给出明确提示。补齐后重新运行即可。绿色完成状态才表示整个发布流程成功。

## 修改现有文章

打开 [content/turbulence-history.md](content/turbulence-history.md)，点击编辑按钮，修改后选择 **Commit changes** 并提交到 `main`。文章正文使用 Markdown：一级标题用 `#`，章节用 `##`，小节用 `###`，段落之间空一行。

行内公式使用 `\( ... \)` 或 `$ ... $`：

```markdown
雷诺数为 \(Re=\frac{\rho UL}{\mu}\)。
```

独立公式使用 `$$`，编号使用 `\tag{1}`：

```markdown
$$
\frac{\partial u}{\partial t}
+u\frac{\partial u}{\partial x}
=-\frac{1}{\rho}\frac{\partial p}{\partial x}
\tag{1}
$$
```

公式中保留单个反斜杠，正文里的公式不要放在代码块内。支持 KaTeX 的 LaTeX 数学语法，不编译带 `\documentclass` 的完整 LaTeX 文档。错误公式会使生成失败，修正后再提交；失败的生成不会覆盖线上网站。

## 新增文章或生活分享

建议在仓库页面按键盘 `.`，打开 GitHub 网页编辑器，一次提交正文和目录配置。

1. 在 `content` 中新建 Markdown 文件，例如 `engineering-notes.md`，参考 [文章模板.md](文章模板.md) 填写正文。
2. 在 [content/articles.json](content/articles.json) 数组中添加一项，数组的相邻项之间用逗号分隔：

```json
{
  "slug": "engineering-notes",
  "title": "工程随笔",
  "description": "这篇文章的简短介绍，用于搜索引擎。",
  "date": "2026-09-11",
  "category": "articles"
}
```

`slug` 与 Markdown 文件名一致，使用小写英文字母、数字和连字符。`date` 填写实际首次上传当日日期，后续修改文章时保留。`category` 填 `articles` 进入阅读文章，填 `life` 进入生活分享。`description` 不显示在文章列表中。

提交后，文章页面、列表和站点地图会一同更新。删除文章时删除对应 Markdown 和目录配置，下一次生成会自动移除旧页面。

## 修改主页与格式

| 要修改的内容 | 文件 |
| --- | --- |
| 文章正文 | `content/*.md` |
| 标题、日期、文章分类 | `content/articles.json` |
| 字体、字号、背景、宽度与间距 | `site.css` |
| 首页个人简介和按钮文字 | `build.mjs` 中的首页模板 |
| 首页照片 | `public/assets/portrait.jpg` |
| 自动发布流程 | `.github/workflows/deploy.yml` |

替换照片时保持文件名。Google 验证标签保留在首页模板中。文章和页面使用独立网址，站点地图地址为 https://hqsccc.pages.dev/sitemap.xml 。

## 本地生成（可选）

电脑安装 Node.js 22 或更新版本后，在仓库目录运行：

```sh
node build.mjs
node scripts/check-site.mjs
```

`dist` 是生成结果，已在 Git 中忽略，不直接编辑。所有必须的 Markdown、公式组件及其许可证位于 `vendor`，本地生成无需安装其他依赖。Windows 可双击 `生成部署包.bat`，生成手动部署用的 ZIP。

## 参考

- [Cloudflare：通过持续集成更新直接上传项目](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)
- [Cloudflare Wrangler Action](https://github.com/cloudflare/wrangler-action)

第三方组件的授权条款见各自的 `vendor` 目录。仓库未为个人文章和照片授予额外的开放许可。
