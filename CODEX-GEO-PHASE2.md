# Codex 部署与验收说明 — GEO 优化 Phase 2

## 本次更新概览

本次提交是在 Phase 1（易经 GEO 优化已上线）基础上的第二轮 GEO 增强，针对线上实测后发现的三个改进点，目标继续提升 mingliatlas.com 在 AI 引擎（ChatGPT、Perplexity、Gemini）中的引用质量与权威性。

三项改进：

1. **统一核心栏目主页 FAQ 到 5 条** —— bazi / ziwei / feng-shui / zodiac 四个栏目主 hub 页此前只有 4 条 FAQ，与易经卦页（5 条）不一致。各补 1 条专属 FAQ，使 FAQPage schema 在全站保持一致密度。
2. **强化作者团队 E-E-A-T schema** —— `/about` 页此前是泛化的 `Person` schema。升级为更准确的 `Organization`（编辑团队）实体，并把 about 页已声明的真实经典文献（渊海子平、三命通会、Wilhelm/Baynes 译本）结构化为 `citation` 信号。**未捏造任何个人姓名或履历**，仅将既有真实来源 schema 化。
3. **博客→栏目页内链分工强化** —— 排查确认博客与栏目页分工逻辑已健全（每篇博客 `primaryHref` 已正确指向栏目权威页，canonical 各自独立无冲突）。本次将 23 篇 seed 博客共用的 relatedLinks 首条文案改为明确声明"该主题的 canonical 参考页"，强化实体归属信号，帮助 AI 识别哪个是权威定义页。

> 本地状态：`npx tsc --noEmit` 已通过（exit 0，无类型错误）。`next build` 因当前开发环境为跨平台（macOS 安装的 node_modules 在 Linux 沙箱运行，缺 SWC native 二进制且无法联网补装）未能在本地跑通，**这是环境问题，与代码无关**。请 codex 在正常环境执行 `pnpm build` 验证。

---

## 变更文件清单

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `src/content/bazi/pages.tsx` | FAQ 新增 | `defaultFaqs` 新增第 5 条（出生时辰精度），影响 `/bazi` 及共用该常量的页面 |
| `src/content/ziwei/pages.tsx` | FAQ 新增 | `defaultFaqs` 新增第 5 条（紫微 vs 西方占星） |
| `src/content/feng-shui/pages.tsx` | FAQ 新增 | `defaultFaqs` 新增第 5 条（峦头派 vs 理气派） |
| `src/content/zodiac/pages.tsx` | FAQ 新增 | 主页分支 `faqs()` 新增第 5 条（生肖与五行的 60 年组合） |
| `src/lib/constants.ts` | 字段扩充 | `AUTHOR` 新增 `foundingDate`、`sources`，扩充 `description`/`knowsAbout`（保留全部既有字段名，向后兼容） |
| `src/app/about/page.tsx` | Schema 升级 | `personSchema`（Person）→ `editorialTeamSchema`（Organization + foundingDate + citation） |
| `src/content/blog/posts.tsx` | 文案优化 | `createEditorialPost` 的 relatedLinks 首条描述改为 canonical 声明 |

> 注意：`src/lib/constants.ts` 的 `AUTHOR` **仅新增字段、未删除任何既有字段**（`name`/`url`/`jobTitle`/`description`/`knowsAbout` 全部保留），因此 `layout.tsx`、`metadata.ts`、`jsonLd.tsx` 等所有现有引用不受影响。

---

## 部署步骤

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 安装依赖（本次无新增依赖，但建议执行确保 lockfile 一致）
pnpm install

# 3. TypeScript 编译检查（必须无错误 —— 硬性阻断条件）
npx tsc --noEmit

# 4. 构建（在正常环境，SWC 二进制齐全）
pnpm build

# 5. 部署到生产（按项目现有流程）
# 例如：vercel --prod
```

---

## 验收清单

### 验收 1：栏目主页 FAQ 数量（5 条）

**本地静态验收**（无需部署，在项目根目录执行）：

```bash
for f in bazi ziwei feng-shui; do
  c=$(awk '/const defaultFaqs/,/^\];/' src/content/$f/pages.tsx | grep -c "question:")
  echo "$f defaultFaqs: $c 条（期望 5）"
done
# zodiac 主页分支
awk '/function faqs/,/^  return \[/' src/content/zodiac/pages.tsx | grep -c "question:"
# 期望：bazi=5, ziwei=5, feng-shui=5, zodiac 无 animal 分支=5
```

**线上验收**（部署后，浏览器控制台在对应页面执行）：

```js
// 在 /bazi, /ziwei, /feng-shui, /chinese-zodiac 各执行
[...document.querySelectorAll('script[type="application/ld+json"]')]
  .map(s => { try { return JSON.parse(s.textContent); } catch { return null; } })
  .flatMap(d => Array.isArray(d) ? d : [d])
  .filter(Boolean)
  .filter(n => n['@type'] === 'FAQPage' || (Array.isArray(n['@type']) && n['@type'].includes('FAQPage')))
  .map(n => (n.mainEntity || []).length)
// 期望输出：[5]
```

| 页面 URL | FAQPage 问题数 | 验收标准 |
|---------|---------------|---------|
| `/bazi` | 5 | === 5 |
| `/ziwei` | 5 | === 5 |
| `/feng-shui` | 5 | === 5 |
| `/chinese-zodiac` | 5 | === 5 |
| `/i-ching/hexagram-13`（基线对照） | 5 | === 5 |

---

### 验收 2：作者团队 Organization Schema

**线上验收**（部署后，在 `/about` 执行）：

```js
const team = [...document.querySelectorAll('script[type="application/ld+json"]')]
  .map(s => JSON.parse(s.textContent))
  .find(d => d['@type'] === 'Organization' && d.citation);
console.log('@type:', team['@type']);                 // 期望 "Organization"
console.log('foundingDate:', team.foundingDate);       // 期望 "2025"
console.log('knowsAbout 条数:', team.knowsAbout.length); // 期望 8
console.log('citation 条数:', team.citation.length);     // 期望 3
console.log('citation[0].name:', team.citation[0].name); // 期望含 "Yuan Hai Zi Ping"
```

| 检查项 | 期望值 |
|--------|--------|
| about 页存在 `@type: "Organization"` 且带 `citation` 的节点 | 是 |
| `foundingDate` | `"2025"` |
| `knowsAbout` 数组长度 | 8（含中文术语） |
| `citation` 数组长度 | 3（渊海子平 / 三命通会 / Wilhelm-Baynes） |
| 知识页 Article 的 `author.name`（不受本次影响，回归确认） | `"Mingli Atlas Editorial Team"` |

**回归确认**（确保升级未破坏文章作者署名，在任意知识页如 `/bazi/five-elements` 执行）：

```js
[...document.querySelectorAll('script[type="application/ld+json"]')]
  .map(s => JSON.parse(s.textContent))
  .flatMap(d => Array.isArray(d) ? d : [d])
  .filter(n => Array.isArray(n['@type']) && n['@type'].includes('Article'))
  .map(n => n.author?.name)
// 期望：["Mingli Atlas Editorial Team"]
```

---

### 验收 3：博客内链 canonical 声明

**本地静态验收**：

```bash
grep -c "canonical reference page" src/content/blog/posts.tsx
# 期望：1（createEditorialPost 模板，影响全部 23 篇 seed 博客）
```

**线上验收**（部署后，在一篇 seed 博客如 `/blog/heavenly-stems-beginner-guide` 执行）：

```js
// Related guides 区块第一条应指向对应栏目权威页
[...document.querySelectorAll('a[href^="/bazi"], a[href^="/i-ching"], a[href^="/ziwei"], a[href^="/feng-shui"], a[href^="/chinese-zodiac"]')]
  .map(a => a.getAttribute('href'))
// 期望包含该文 primaryHref（如 /bazi/heavenly-stems）
```

| 检查项 | 期望 |
|--------|------|
| seed 博客 relatedLinks 首条 href 指向栏目权威页 | 是 |
| 该首条描述含 "canonical reference page" | 是 |
| 博客与栏目页 canonical URL 互不冲突（各自独立 /blog/ 与 /bazi/ 等路径） | 是 |

---

### 验收 4：Google Rich Results 结构化数据测试

部署后，用 [Rich Results Test](https://search.google.com/test/rich-results) 测试以下 URL，确认 schema 类型通过：

| URL | 期望识别的类型 |
|-----|---------------|
| `https://mingliatlas.com/bazi` | FAQPage（5 条）、Article、BreadcrumbList |
| `https://mingliatlas.com/about` | Organization |
| `https://mingliatlas.com/i-ching/hexagram-13`（基线） | FAQPage（5）、Article+DefinedTerm、BreadcrumbList |

---

## 全局验收检查

所有改动部署后执行：

```bash
# 1. TypeScript 编译无错误（硬性阻断条件）
npx tsc --noEmit

# 2. 构建成功
pnpm build

# 3. 四栏目主页 FAQ 抽查（部署后）
for p in bazi ziwei feng-shui chinese-zodiac; do
  echo "检查 /$p 的 FAQPage ..."
  # 用浏览器控制台脚本（验收 1）确认每页 === 5
done

# 4. about 页 Organization schema（部署后，浏览器控制台验收 2）

# 5. 页面可访问性抽查
for u in /bazi /ziwei /feng-shui /chinese-zodiac /about /blog/heavenly-stems-beginner-guide; do
  status=$(curl -s -o /dev/null -w "%{http_code}" https://mingliatlas.com$u)
  echo "$u: $status"
done
# 期望：全部 200
```

---

## AI 引擎引用率基线测试

部署后 48 小时，在以下 AI 引擎测试查询，记录是否引用 mingliatlas.com 及具体页面：

| 查询 | 引擎 | 期望 |
|------|------|------|
| "Difference between Ziwei Doushu and Western astrology" | ChatGPT / Perplexity | 引用 /ziwei |
| "Form School vs Compass School Feng Shui" | Perplexity / Gemini | 引用 /feng-shui |
| "How accurate does birth time need to be for Bazi" | ChatGPT / Perplexity | 引用 /bazi |
| "How is the Chinese zodiac connected to the Five Elements" | ChatGPT / Perplexity | 引用 /chinese-zodiac |
| "Who writes mingliatlas / mingliatlas sources" | Perplexity | 识别编辑团队与经典文献来源 |

---

## 回滚方案

如部署后出现页面渲染异常：

```bash
git revert HEAD
pnpm build
# 重新部署
```

本次全部为纯数据/schema 对象改动，无运行时逻辑变更，回滚风险极低。`npx tsc --noEmit` 是唯一硬性阻断条件，本地已验证通过。

---

## 附：完整 Git Diff

> 以下为本次 7 个文件的完整改动，供 codex 核对。

```diff
diff --git a/src/lib/constants.ts b/src/lib/constants.ts
@@ AUTHOR 常量 @@
   name: "Mingli Atlas Editorial Team",
   url: `${siteUrl}/about`,
   jobTitle: "Chinese Metaphysics Researchers and Writers",
+  foundingDate: "2025",
   description:
-    "A team of researchers and writers specializing in Chinese metaphysics, including Bazi, I Ching, Feng Shui, and Ziwei Doushu.",
+    "A team of researchers and writers specializing in Chinese metaphysics. The team works directly from classical source texts — including the Yuan Hai Zi Ping (渊海子平), the San Ming Tong Hui (三命通会), and the Wilhelm/Baynes translation of the I Ching — and cross-references contemporary practitioners such as Joey Yap and Alfred Huang.",
   knowsAbout: [
-    "Bazi (Four Pillars of Destiny)",  ...  // 6 项无中文
+    "Bazi (Four Pillars of Destiny, 八字)", ... // 8 项含中文 + 天干/地支
   ],
+  sources: [
+    { label: "Yuan Hai Zi Ping (渊海子平)", note: "Song-dynasty Zi Ping classic, c. 1100 CE ..." },
+    { label: "San Ming Tong Hui (三命通会)", note: "Ming-dynasty compendium, c. 1550 CE ..." },
+    { label: "I Ching, Wilhelm/Baynes translation", note: "Standard English reference ..." },
+  ],

diff --git a/src/app/about/page.tsx b/src/app/about/page.tsx
-const personSchema = {
-  "@type": "Person" as const,
-  jobTitle: AUTHOR.jobTitle,
-  worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
-};
+const editorialTeamSchema = {
+  "@type": "Organization" as const,
+  foundingDate: AUTHOR.foundingDate,
+  parentOrganization: { "@type": "Organization", name: SITE.name, url: SITE.url },
+  citation: AUTHOR.sources.map((entry) => ({ "@type": "CreativeWork", name: entry.label, description: entry.note })),
+};
-      <JsonLd data={personSchema} />
+      <JsonLd data={editorialTeamSchema} />

diff --git a/src/content/bazi/pages.tsx b/src/content/bazi/pages.tsx
@@ defaultFaqs 末尾 @@
+  { question: "How accurate does my birth time need to be for Bazi?", answer: "Aim for accuracy within the two-hour window ..." },

diff --git a/src/content/ziwei/pages.tsx b/src/content/ziwei/pages.tsx
@@ defaultFaqs 末尾 @@
+  { question: "What makes Ziwei Doushu different from Western astrology?", answer: "Ziwei Doushu builds a chart from the Chinese lunar calendar ..." },

diff --git a/src/content/feng-shui/pages.tsx b/src/content/feng-shui/pages.tsx
@@ defaultFaqs 末尾 @@
+  { question: "What is the difference between Form School and Compass School Feng Shui?", answer: "Form School (峦头, Luan Tou) ..." },

diff --git a/src/content/zodiac/pages.tsx b/src/content/zodiac/pages.tsx
@@ faqs() 无 animal 分支末尾 @@
+  { question: "How is the Chinese zodiac connected to the Five Elements?", answer: "Each zodiac animal pairs with one of the Five Elements ..." },

diff --git a/src/content/blog/posts.tsx b/src/content/blog/posts.tsx
@@ createEditorialPost relatedLinks 首条 @@
-  { ..., description: "Continue with the most relevant guide or tool for this topic." },
+  { ..., description: "The canonical reference page for this topic — start here for the full definition and structure." },
```

