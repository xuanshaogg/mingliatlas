# 部署说明与验收标准 — 2026-05-25

本次更新涵盖 **Phase 3（长尾内容扩展）** 与 **Phase 4（站外提交资料包）**。本文档供 Codex（或其他执行方）在本机/线上部署并验收使用。

---

## 一、本次更新内容总览

| 类别 | 数量 | 说明 |
|---|---|---|
| 新增 blog 文章 | 3 篇 | 长尾关键词覆盖，注入到 `seedPosts` 数组 |
| 新增文档 | 2 份 | Phase 4 资料包 + 本部署说明 |
| 修改文件 | 1 个 | `src/content/blog/posts.tsx` |
| 自动生效 | sitemap.xml / RSS / blog index | 通过 `allBlogPosts` 自动注入 |

---

## 二、详细变更清单

### 2.1 新增 3 篇 blog 文章

文件：`src/content/blog/posts.tsx`（在 line 1340 `}),` 与 `];` 之间新增 3 个 `buildPage({...})` 块）

#### 文章 1 — Day Master 完整指南
- **slug**：`day-master-bazi-complete-guide`
- **路径**：`/blog/day-master-bazi-complete-guide`
- **标题**：Day Master in Bazi: A Complete Guide to the 10 Heavenly Stems
- **分类**：Bazi Guide
- **datePublished**：2026-04-20  /  **dateModified**：2026-05-20
- **结构**：subtitle + directAnswer + breadcrumbs + JSON-LD schema + 3 stats + 2 citations + 4-5 sections + baseFaqs + cta
- **CTA**：指向 `/tools/bazi-calculator`
- **relatedLinks**：`baziLinks`

#### 文章 2 — 生肖兼容性图表
- **slug**：`chinese-zodiac-compatibility-chart`
- **路径**：`/blog/chinese-zodiac-compatibility-chart`
- **标题**：Chinese Zodiac Compatibility Chart: All 12 Animals Explained
- **分类**：Zodiac Guide
- **datePublished**：2026-04-22  /  **dateModified**：2026-05-20
- **覆盖**：4 个三合（San He）+ 6 个六合（Liu He）+ 6 个相冲（Chong）
- **CTA**：指向 `/tools/zodiac-compatibility`
- **relatedLinks**：`zodiacLinks`

#### 文章 3 — I Ching 起卦解卦入门
- **slug**：`i-ching-beginners-reading-guide`
- **路径**：`/blog/i-ching-beginners-reading-guide`
- **标题**：I Ching for Beginners: How to Cast and Read Your First Hexagram
- **分类**：I Ching Guide
- **datePublished**：2026-04-25  /  **dateModified**：2026-05-20
- **结构**：5 步起卦解卦教程（三硬币法）
- **CTA**：指向 `/tools/i-ching`
- **relatedLinks**：自定义（含 `/blog/i-ching-for-beginners` 内链）

### 2.2 避开的 slug 冲突（请勿误删）
以下 slug 已在仓库中存在，本次三篇新文章故意避开重名：
- `day-master-meaning`（line 537、990）
- `i-ching-for-beginners`（line 595、1076）
- `chinese-zodiac-compatibility-guide`（line 1256）

### 2.3 新增文档
- `PHASE4-OFFSITE-PACKAGE.md` — 站外提交资料包（GSC/Bing/AdSense/Pinterest/Reddit/IndexNow）
- `DEPLOYMENT-NOTES-2026-05-25.md` — 本文件

### 2.4 自动联动（无需手动改动）
- `src/lib/content/sitePages.ts` 第 176 行的 `allBlogPosts` 已自动包含新文章
- `src/app/sitemap.ts` 自动从 `publishedSitePages` 生成 → 3 个新 URL 自动进入 sitemap
- RSS feed（若存在）/ blog index 页同样自动生效

---

## 三、部署步骤（Codex 执行）

### Step 1 — 清理 git lock（沙箱遗留）
```bash
cd "/Users/xuanshao/Google geo/chinese-metaphysics-site"
rm -f .git/index.lock
```

### Step 2 — 本地验证
```bash
npx tsc --noEmit            # 必须无报错
npm run lint                # 应通过（可选）
npm run build               # 必须成功（macOS 本机 Next.js SWC 可用）
```

**预期输出**：build 阶段应看到 3 个新路由：
```
○ /blog/day-master-bazi-complete-guide
○ /blog/chinese-zodiac-compatibility-chart
○ /blog/i-ching-beginners-reading-guide
```

### Step 3 — 提交并推送
```bash
git add -A
git status                  # 确认仅本次预期文件被改动
git commit -m "feat(blog): add 3 long-tail posts + Phase 4 offsite package

- day-master-bazi-complete-guide
- chinese-zodiac-compatibility-chart
- i-ching-beginners-reading-guide
- docs: PHASE4-OFFSITE-PACKAGE.md, DEPLOYMENT-NOTES-2026-05-25.md"
git push origin main
```

### Step 4 — 等待 Vercel/部署平台构建完成
通常 1-3 分钟。检查部署平台 dashboard 确认 status = Ready。

---

## 四、线上验收标准（部署完成后逐项核查）

### 4.1 路由可达性（HTTP 200）
用浏览器或 curl 检查以下 3 个 URL：

```bash
curl -I https://mingliatlas.com/blog/day-master-bazi-complete-guide
curl -I https://mingliatlas.com/blog/chinese-zodiac-compatibility-chart
curl -I https://mingliatlas.com/blog/i-ching-beginners-reading-guide
```

**通过标准**：3 个 URL 全部返回 `HTTP/2 200`。

### 4.2 sitemap 包含新 URL
```bash
curl -s https://mingliatlas.com/sitemap.xml | grep -E "day-master-bazi-complete|zodiac-compatibility-chart|i-ching-beginners-reading"
```

**通过标准**：3 行匹配输出（每篇文章各一行 `<loc>` 标签）。

### 4.3 页面内容完整性（人工抽查每篇）
- [ ] H1 标题正确显示
- [ ] subtitle / directAnswer 段落渲染
- [ ] breadcrumbs 显示且链接可点击
- [ ] 至少 4 个内容 sections 渲染
- [ ] FAQ Schema 区块显示（页面底部）
- [ ] Related Links 卡片显示（侧栏或文末）
- [ ] CTA 按钮显示并跳转到对应 tool 页面
- [ ] 无 JSX 转义残留（不应出现 `&ldquo;` `&rdquo;` 字面字符）

### 4.4 结构化数据（Schema.org）
用 Google Rich Results Test：https://search.google.com/test/rich-results

依次测试 3 个 URL，**通过标准**：
- 检测到 `BlogPosting` schema
- 检测到 `FAQPage` schema（如有 FAQ 区块）
- 检测到 `BreadcrumbList` schema
- **零 error**（warnings 可接受）

### 4.5 Meta 标签
View Source 或 curl 检查 `<head>`：
```bash
curl -s https://mingliatlas.com/blog/day-master-bazi-complete-guide | grep -E '<title>|name="description"|property="og:'
```

**通过标准**：
- `<title>` 与文章标题一致
- `<meta name="description">` 不为空且与 buildPage 中的 description 字段一致
- `og:title`、`og:description`、`og:url` 三项齐全

### 4.6 内链与回链
- [ ] blog index `/blog` 列表页能看到 3 篇新文章（按 datePublished 排序应在前列）
- [ ] 每篇文章的 relatedLinks 卡片至少 3 个，链接可点击且目标页 200
- [ ] 文章 2 的 CTA 跳 `/tools/zodiac-compatibility` 正常
- [ ] 文章 1 的 CTA 跳 `/tools/bazi-calculator` 正常
- [ ] 文章 3 的 CTA 跳 `/tools/i-ching` 正常

### 4.7 移动端可读性
用 Chrome DevTools mobile preview（iPhone 12 Pro）打开 3 个新 URL：
- [ ] 无横向滚动
- [ ] 字号 ≥ 16px
- [ ] CTA 按钮可点击区域 ≥ 44×44px
- [ ] FAQ accordion 可正常展开/折叠（若有交互）

### 4.8 性能（PageSpeed Insights）
抽测文章 1 移动端 PageSpeed：https://pagespeed.web.dev/

**通过标准**（参考线，不是硬性）：
- Performance ≥ 80
- SEO ≥ 95
- Accessibility ≥ 90
- Best Practices ≥ 90

### 4.9 Search Console 提交
- [ ] GSC → URL Inspection → 输入 3 个新 URL，分别点 "Request Indexing"
- [ ] GSC → Sitemaps → 重新提交 `sitemap.xml`
- [ ] Bing Webmaster → Submit URLs → 提交 3 个新 URL

### 4.10 文档可见性
- [ ] 仓库根目录可见 `PHASE4-OFFSITE-PACKAGE.md`
- [ ] 仓库根目录可见 `DEPLOYMENT-NOTES-2026-05-25.md`

---

## 五、回滚方案

如线上发现严重问题（例如 build 失败、schema 报错、文案错误），回滚：

```bash
git log --oneline -5                    # 找到本次 commit hash
git revert <commit-hash>                # 生成 revert commit
git push origin main
```

或仅删除 3 篇文章：编辑 `src/content/blog/posts.tsx`，删除 line 1341-1640 区间的 3 个 `buildPage({...})` 块（注意保留前后逗号语法正确），再 commit & push。

---

## 六、验收完成后操作

所有 4.1-4.10 验收通过后：

1. 在 PR/commit 中评论："✅ Deployment verified — all 10 acceptance criteria passed"
2. 按 `PHASE4-OFFSITE-PACKAGE.md` 第 7 节执行 30 分钟站外提交
3. 监控 GSC 一周，记录 Impressions/CTR 变化

---

## 七、关键文件路径速查

| 文件 | 路径 |
|---|---|
| 文章源码 | `src/content/blog/posts.tsx`（line 1341 起为本次新增）|
| sitemap 注入 | `src/lib/content/sitePages.ts` line 176 |
| sitemap 生成 | `src/app/sitemap.ts` |
| Phase 4 资料包 | `PHASE4-OFFSITE-PACKAGE.md` |
| 本说明 | `DEPLOYMENT-NOTES-2026-05-25.md` |

---

**生成时间**：2026-05-25
**生成者**：Cowork AI Assistant
**目标执行方**：Codex / 本机开发者
