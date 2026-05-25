# Codex 部署与验收说明

## 本次更新概览

本次提交包含 GEO（Generative Engine Optimization）优化的全部修复，目标是提升 mingliatlas.com 在 AI 引擎（ChatGPT、Perplexity、Gemini）中的引用率。

---

## 变更文件清单

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `src/content/i-ching/pages.tsx` | 修复 + 扩写 | 修复 `upperTrigram`/`lowerTrigram` 编译错误；所有 64 卦均有完整 sections |
| `src/content/bazi/pages.tsx` | 内容扩写 | `five-elements`、`heavenly-stems`、`earthly-branches` 三页从约 100 词扩写至 600–800 词 |
| `src/content/zodiac/pages.tsx` | 内容扩写 | Rat、Tiger、Dragon 三个生肖页新增个性化 sections，各约 500 词 |
| `src/lib/constants.ts` | 新增字段 | 添加 `AUTHOR` 常量（Person Schema 用） |
| `src/lib/seo/jsonLd.tsx` | Schema 修复 | `author` 字段从 Organization 改为 Person |
| `src/app/about/page.tsx` | Schema 新增 | 添加 Person + Organization JSON-LD |
| `src/lib/seo/llms.ts` | 内容新增 | `llms.txt` 添加 `## Core Entities` 段落 |
| `src/app/layout.tsx` | Schema 修复 | Organization schema 添加 `sameAs` 字段 |
| `src/content/blog/posts.tsx` | 内容扩写 | `what-is-bazi` 等 blog 文章扩写至 1200+ 词 |

---

## 部署步骤

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 安装依赖（如有变化）
pnpm install

# 3. TypeScript 编译检查（必须无错误）
npx tsc --noEmit

# 4. 构建
pnpm build

# 5. 部署到生产（按项目现有流程）
# 例如：vercel --prod 或 pnpm deploy
```

---

## 验收清单

### P0 内容扩写验收

部署完成后，在浏览器控制台执行以下命令检查字数：

```js
// 在对应页面执行
document.querySelector('main').innerText.split(/\s+/).length
```

| 页面 URL | 目标字数 | 验收标准 |
|---------|---------|---------|
| `/bazi/five-elements` | 800+ 词 | ≥ 800 |
| `/bazi/heavenly-stems` | 800+ 词 | ≥ 800 |
| `/bazi/earthly-branches` | 800+ 词 | ≥ 800 |
| `/chinese-zodiac/rat` | 600+ 词 | ≥ 600 |
| `/chinese-zodiac/tiger` | 600+ 词 | ≥ 600 |
| `/chinese-zodiac/dragon` | 600+ 词 | ≥ 600 |
| `/blog/what-is-bazi` | 1200+ 词 | ≥ 1200 |
| `/i-ching/hexagram-1` | 600+ 词 | ≥ 600 |

### P1 Person Schema 验收

在任意知识页（如 `/bazi/five-elements`）执行：

```js
JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent).author
// 期望输出：{ "@type": "Person", "name": "Mingli Atlas Editorial Team", ... }
```

在 `/about` 页面执行：

```js
[...document.querySelectorAll('script[type="application/ld+json"]')]
  .map(s => JSON.parse(s.textContent)['@type'])
// 期望包含 "Person"
```

### P2 llms.txt 验收

```bash
curl https://mingliatlas.com/llms.txt | grep "Core Entities"
# 期望输出：## Core Entities
```

### P3 来源引用验收

访问 `/bazi/five-elements`，页面底部 SOURCES 区域应显示：
- 《黄帝内经》Huangdi Neijing
- 《三命通会》San Ming Tong Hui

### P4 sameAs 验收

在首页执行：

```js
JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent).sameAs
// 期望输出包含 "https://mingliatlas.com" 的数组
```

### I Ching 编译错误修复验收

访问任意卦辞页（如 `/i-ching/hexagram-3`），页面应正常渲染，正文中应出现类似：

> "Hexagram 3 is built from two trigrams: Water above and Thunder below."

---

## AI 引擎引用率基线测试

部署后 48 小时，在以下 AI 引擎中测试查询，记录是否引用 mingliatlas.com：

| 查询 | 引擎 | 期望 |
|------|------|------|
| "What is Bazi Four Pillars of Destiny" | ChatGPT / Perplexity / Gemini | 引用 mingliatlas.com |
| "How do the Five Elements work in Chinese astrology" | ChatGPT / Perplexity | 引用 /bazi/five-elements |
| "I Ching hexagram 1 meaning" | Perplexity / Gemini | 引用 /i-ching/hexagram-1 |
| "Chinese zodiac Dragon personality" | ChatGPT / Perplexity | 引用 /chinese-zodiac/dragon |
| "What is Feng Shui" | 任意 | 引用 mingliatlas.com |

---

## 回滚方案

如部署后出现页面渲染异常：

```bash
git revert HEAD
pnpm build
# 重新部署
```

TypeScript 编译错误是唯一的硬性阻断条件。本次所有变更已通过 `npx tsc --noEmit` 验证，无编译错误。
