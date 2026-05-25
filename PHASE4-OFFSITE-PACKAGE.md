# Phase 4 — 站外提交资料包

> 目的：Phase 1-3 上线后，把改动告诉搜索引擎与目标受众。本文件可直接复制粘贴使用。
> 前置条件：本机 `git push` 部署到生产，确认 https://mingliatlas.com 已渲染新内容。

---

## 1. Google Search Console（GSC）

### 1.1 重新提交 sitemap
- 进入 https://search.google.com/search-console → 选择 `mingliatlas.com` 资源
- 左栏 **Sitemaps** → 输入 `sitemap.xml` → 提交
- 等待状态变为 **Success**（通常 < 5 分钟）

### 1.2 URL 检查 + 请求编入索引（3 个新 blog）
对以下每个 URL 重复：粘贴到顶栏 URL Inspection → 等待结果 → 点击 **Request Indexing**

```
https://mingliatlas.com/blog/day-master-bazi-complete-guide
https://mingliatlas.com/blog/chinese-zodiac-compatibility-chart
https://mingliatlas.com/blog/i-ching-beginners-reading-guide
```

### 1.3 抽查 Phase 2 FAQ Schema 是否生效
用 Rich Results Test：https://search.google.com/test/rich-results

```
https://mingliatlas.com/blog/bazi-vs-zodiac
https://mingliatlas.com/blog/chinese-zodiac-compatibility-guide
https://mingliatlas.com/i-ching/hexagram-1
```

预期：每个页面应识别出 `FAQPage` 结构化数据。

---

## 2. Bing Webmaster Tools

- 登录 https://www.bing.com/webmasters/
- 选择 `mingliatlas.com`
- **Sitemaps** → 提交 `https://mingliatlas.com/sitemap.xml`
- **URL Submission** → 粘贴上面 3 个新 URL（Bing 每日免费配额 10 条）
- IndexNow 已开启的话会自动通知 Yandex

---

## 3. Google AdSense

### 3.1 申请前自检清单
- [ ] About / Privacy / Terms / Contact 4 个页面都可访问，含真实联系方式
- [ ] 全站文章数 ≥ 20（当前 highIntent + seed + editorial 合计远超）
- [ ] 无版权侵权图片（mingliatlas 全部为文字内容，OK）
- [ ] 主页加载 < 3s（用 PageSpeed Insights 抽测）
- [ ] `ads.txt` 占位文件已存在于 `/public/ads.txt`（已确认）

### 3.2 申请步骤
1. https://www.google.com/adsense/start/ → Sign up
2. 网址填 `mingliatlas.com`
3. 国家/地区按账户所在地选
4. 复制 AdSense 提供的 `<script>` 标签 → 贴到 `src/app/layout.tsx` 的 `<head>` 内
5. AdSense 后台 → ads.txt → 复制 `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
6. 替换 `public/ads.txt` 占位行 → 部署
7. AdSense 后台点 "Request review" → 等 1-4 周

---

## 4. Pinterest（图文引流，免费高 ROI）

### 4.1 准备
- 注册 https://business.pinterest.com/（免费）
- 创建账号名：`mingliatlas` 或 `Mingli Atlas - Chinese Metaphysics`
- Claim website：在 `src/app/layout.tsx` 添加 Pinterest 提供的 `<meta name="p:domain_verify">` 标签

### 4.2 首批 9 个 Pin（每 3 天发 1 个）

每个 Pin = 1 张 1000×1500 px 竖图（用 Canva 免费模板）+ 标题 + 描述 + 链接。

| # | 图片主标题 | Pin 标题 | 链接 |
|---|---|---|---|
| 1 | "Find Your Day Master in 60 Seconds" | Day Master in Bazi: Complete Guide to the 10 Heavenly Stems | /blog/day-master-bazi-complete-guide |
| 2 | "Chinese Zodiac Compatibility Chart" | Are You Compatible? Full 12-Sign Chinese Zodiac Chart | /blog/chinese-zodiac-compatibility-chart |
| 3 | "How to Read an I Ching Hexagram" | I Ching for Beginners: Cast Your First Reading | /blog/i-ching-beginners-reading-guide |
| 4 | "5 Elements & Your Personality" | Wood, Fire, Earth, Metal, Water: Find Your Element | /bazi/five-elements |
| 5 | "The 4 Three-Harmony Triads" | Which Zodiac Signs Are Long-Term Compatible? | /blog/chinese-zodiac-compatibility-chart |
| 6 | "Bazi vs. Western Astrology" | What's the Difference? Bazi vs. Zodiac Explained | /blog/bazi-vs-zodiac |
| 7 | "10 Heavenly Stems Cheat Sheet" | Yin Wood vs. Yang Wood: All 10 Day Masters | /blog/day-master-bazi-complete-guide |
| 8 | "6 Clash Pairs in Chinese Zodiac" | Why Rat and Horse Clash (And What to Do About It) | /blog/chinese-zodiac-compatibility-chart |
| 9 | "3 Coins, 6 Lines, 64 Hexagrams" | The Simplest Way to Read the I Ching | /blog/i-ching-beginners-reading-guide |

### 4.3 Pin 描述模板（200-500 字）

```
Discover [topic] through the lens of Chinese metaphysics. This guide walks you through [3 key points] with practical, non-fatalistic explanations. Free tools included.

#ChineseAstrology #Bazi #IChing #ChineseZodiac #FengShui #SelfDiscovery #PersonalityTypes #SpiritualGrowth #EasternPhilosophy #FourPillars
```

---

## 5. Reddit（社区分享，注意反 spam）

### 5.1 目标 subreddit（按规则严格度排序）

| Subreddit | 订阅数 | Self-promo 规则 | 推荐角度 |
|---|---|---|---|
| r/ChineseAstrology | ~10k | 宽松 | 直接分享 + 邀请讨论 |
| r/Bazi | ~5k | 宽松 | 同上 |
| r/iching | ~30k | 严格（10:1 规则）| 先答 10 个问题再发 |
| r/Divination | ~80k | 中等 | 周日 Self-promotion thread |
| r/Astrology | ~700k | 严格禁推广 | 仅参与讨论，不放链接 |

### 5.2 发帖模板（r/ChineseAstrology / r/Bazi）

标题（任选一种风格）：
```
[Guide] How to find your Day Master and read the 10 Heavenly Stems
[Resource] Complete Chinese Zodiac Compatibility Chart (with triads + clashes)
[Tutorial] Casting your first I Ching reading — step by step
```

正文：
```
Hi r/ChineseAstrology,

I put together a beginner-friendly guide on [topic]. It covers:

- [point 1]
- [point 2]
- [point 3]

Written in a non-fatalistic, reflective tone — no "this sign is doomed" type stuff. Includes a free [tool name] if you want to try it.

[Link]

Happy to answer questions in the comments. What's your [Day Master / sign / favorite hexagram]?
```

### 5.3 规则提示
- **不要**在一周内连发 3 篇（会被 mod 标记 spam）
- 间隔 ≥ 5 天发 1 篇
- 每发 1 篇推广帖，前后各做 3-5 条纯回复贡献
- 不要在标题用 clickbait（"You won't believe..."）

---

## 6. IndexNow（可选，10 分钟搞定）

如果想让 Bing/Yandex 秒级收录每次更新，可在 `next.config.ts` 加 IndexNow 钩子。简单做法：

```bash
# 生成 key（任意 32 位字符串）
echo "abc123...your_key" > public/abc123...your_key.txt
```

部署后在浏览器访问：
```
https://api.indexnow.org/indexnow?url=https://mingliatlas.com/blog/day-master-bazi-complete-guide&key=abc123...your_key
```

对 3 个新 URL 各打一次即可，Bing/Yandex 会在分钟级抓取。

---

## 7. 今日 30 分钟执行清单

按以下顺序，30 分钟可完成 80% 的当日动作：

1. ☐ 本机 `git push` → 等 Vercel/部署完成（5 分钟）
2. ☐ 浏览器打开 3 个新 URL 抽检渲染正常（3 分钟）
3. ☐ GSC 提交 sitemap + 3 个 URL 请求索引（5 分钟）
4. ☐ Bing Webmaster 提交 sitemap + 3 个 URL（3 分钟）
5. ☐ Rich Results Test 抽检 3 个 FAQ 页面（5 分钟）
6. ☐ 在 r/ChineseAstrology 发第 1 篇（Day Master 指南，10 分钟）

## 8. 一周节奏建议

| 日 | 动作 |
|---|---|
| 周一 | Reddit r/ChineseAstrology 发 1 篇 + 回复 5 条 |
| 周二 | Pinterest 发 2 个 Pin |
| 周三 | 检查 GSC Coverage / Performance 报告 |
| 周四 | Reddit r/Bazi 或 r/iching 发 1 篇 |
| 周五 | Pinterest 发 2 个 Pin |
| 周六 | 写下一篇 blog 草稿 |
| 周日 | r/Divination Self-promo thread + 评估周数据 |

---

## 9. 关键指标追踪（每周日检查）

- GSC：Impressions / Clicks / Average position（关键词建议跟踪 `bazi calculator`, `chinese zodiac compatibility`, `i ching reading`, `day master`）
- Pinterest：Saves / Outbound clicks
- Reddit：每篇帖子的 upvotes + 评论数
- 站内：GA4 中 `/blog/*` 路径的 Users / Avg session duration

目标：30 天内 organic clicks 从 0 → 50/天（保守）或 200/天（理想）。
