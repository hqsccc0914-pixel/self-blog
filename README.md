# 花青素的主页

崔川川的个人网站，记录工程、阅读与生活。使用纯白背景、宋体和简洁排版，包含个人照片、阅读文章、生活分享。文章列表只显示标题与首次上传日期，文章页保留标题和正文，数学公式使用 LaTeX 语法。

## 首次上线

将这八个独立文件放在 GitHub 的 `hqsccc0914-pixel/self-blog` 仓库根目录，文件名保持不变：

| 文件 | 作用 |
| --- | --- |
| `README.md` | 本说明 |
| `package.json` | 生成命令与依赖 |
| `package-lock.json` | 固定依赖版本 |
| `build.mjs` | 生成主页、文章页和站点地图 |
| `site.css` | 字体、颜色、宽度与间距 |
| `articles.json` | 文章标题、日期与分类 |
| `turbulence-history.md` | 湍流文章正文 |
| `portrait.jpg` | 首页照片 |

如仓库中已放入旧方案的 `.github/workflows/deploy.yml`，先删除该工作流，避免继续向旧 Pages 项目发布。这个版本由 Cloudflare 的 Git 集成直接发布，不需要 GitHub Actions 或 Cloudflare API 密钥。

在 Cloudflare 打开 **Workers 和 Pages → 创建应用 → Pages → 连接到 Git**，授权 GitHub 并选择 `self-blog` 仓库。新建一个可用名称的项目，设置：

| 设置 | 内容 |
| --- | --- |
| 生产分支 | `main` |
| 框架预设 | 无 / None |
| 构建命令 | `npm run build` |
| 构建输出目录 | `dist` |
| 根目录 | 留空 |
| 环境变量 | `NODE_VERSION` = `22` |

保存并部署。Cloudflare 会安装依赖、生成网页，再发布 `dist` 中的内容。仓库里没有手写的首页 `index.html`，它在构建时自动生成。

新项目的网址以 Cloudflare 部署结果为准。程序会根据 Cloudflare 的构建环境识别 Pages 项目域名。若绑定自定义域名，在生产与预览环境设置 `SITE_URL` 为正式网址，例如 `https://你的域名`，然后重新构建。原有网站无需删除。

新网址需要在 Google Search Console 单独验证。取得验证标签后，可在 Cloudflare 环境变量 `GOOGLE_SITE_VERIFICATION` 中填写标签的 `content` 值，再重新构建。站点地图位于新网址的 `/sitemap.xml`。

## 在线修改

在 GitHub 打开文件，点击编辑，修改后提交到 `main`。Cloudflare 自动构建发布。文章正文改 `turbulence-history.md`；字体与间距改 `site.css`；个人介绍改 `build.mjs` 中的首页模板；更换照片时上传同名 `portrait.jpg`。

`articles.json` 中的 `date` 填实际首次上传当日日期，后续修改保留。`description` 用于搜索引擎，不显示在文章列表。

## 新增文章或生活分享

在仓库页面按键盘 `.` 打开 GitHub 网页编辑器，可一次提交正文和目录修改。

1. 在根目录新建 `my-note.md`，写入：

```markdown
# 文章标题

这里是正文。

## 1 第一节

行内公式：\(E=mc^2\)。

$$
Re=\frac{\rho UL}{\mu}
\tag{1}
$$
```

2. 在 `articles.json` 数组中添加以下对象，相邻对象用逗号分隔：

```json
{
  "slug": "my-note",
  "title": "文章标题",
  "description": "简短介绍。",
  "date": "2026-09-11",
  "category": "articles"
}
```

`slug` 与正文文件名对应，使用小写英文字母、数字和连字符；`date` 替换为实际上传日期。`category` 填 `articles` 放入阅读文章，填 `life` 放入生活分享。保存两项修改并提交即可。

正文使用 Markdown，公式支持 KaTeX 的 LaTeX 数学语法。行内公式用 `\( ... \)` 或 `$ ... $`，独立公式用 `$$ ... $$`，编号用 `\tag{1}`。不要将实际公式放进代码块；不支持直接编译完整的 LaTeX 文档。公式与字体在生成时打包到网站，阅读时无需连接外部公式服务。

删除文章时，同时删除正文文件和 `articles.json` 中对应记录。下次构建会清除旧页面。

## 本地生成（可选）

电脑安装 Node.js 22 或更高版本后执行 `npm ci`，再执行 `npm run build`。`dist` 是生成结果，不上传到 GitHub，也不要上传 `node_modules`。在线编辑和自动发布不要求电脑安装 Node.js。

依赖：KaTeX 0.16.22、Marked 17.0.5。个人文章与照片未授予额外的开放许可。

[Cloudflare Git 集成说明](https://developers.cloudflare.com/pages/get-started/git-integration/)
