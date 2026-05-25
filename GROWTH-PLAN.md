# mingliatlas.com 30 天自然流量增长规划

> 制定日期：2026-05-25
> 约束条件：$0 推广预算 / 每天 1-2 小时 / 30 天首批自然流量 / 变现走 AdSense + 付费工具（订阅暂不做）

---

## 总体战略

mingliatlas.com 在英文中国玄学这个细分赛道有天然位差：竞争比英文星座低、用户付费意愿比中文玄学高（北美/欧洲华裔 + 西方玄学爱好者）。30 天内不追 SEO 排名（太慢），重点是**让 AI 引擎和社交平台先把流量送过来**，同时把基础设施铺好让 SEO 在 60-90 天后接棒。

变现走双轨：
1. **Google AdSense 展示广告** — 流量起来后立刻产生稳定被动收入
2. **付费工具（一次性付费的 PDF 报告等）** — 比订阅低门槛、起步快

订阅模式（recurring subscription）暂不开发。

---

## 三大主战场

### A. AdSense 合规与启用
让站点尽快通过 AdSense 审核，部署广告位、ads.txt、Cookie 同意框架。这是变现的前置条件，必须最先做。

### B. FAQ Schema 注入（GEO 持续优化）
利用现有 `KnowledgePage` 组件已自动注入 FAQPage Schema 的便利，给 P0 知识页和高频卦页填充独占 FAQ，提升 AI 引擎引用率。

### C. 长尾 Blog 内容生产
本月写 3 篇精准长尾文章覆盖 Bazi / Zodiac / I Ching 三大支柱，每篇内链回流到现有知识页，构建关键词矩阵和权重传导。

---

## 第 1-4 周节奏表

| 周次 | A. AdSense | B. FAQ Schema | C. 长尾 Blog | 其他配套 |
|------|-----------|---------------|-------------|---------|
| Week 1 | 补 privacy + Cookie + about + 提交申请 | 写 6 条 × 6 个 P0 页 = 36 条 FAQ | 写 Blog #1 "Day Master" | GSC + Bing 收录 + sitemap |
| Week 2 | 等待审核 / 通过后接广告位 | 写 5 条 × 12 个高频卦 = 60 条 FAQ | 写 Blog #2 "Zodiac Compatibility" | Pinterest 启动、Reddit 启动 |
| Week 3 | 优化广告位 + ads.txt | 补充 blog 文章独占 FAQ | 写 Blog #3 "I Ching Beginners" | AI 引擎主动喂养 |
| Week 4 | 监控 RPM、调整密度 | 抽样验证 Rich Results | 复盘流量 + 选下月题 | 邮件订阅 + lead magnet |

---

## 各战场详细规划

### A. AdSense 合规与启用

**现状盘点：**
- ✅ `/about`、`/privacy`、`/terms`、`/contact`、`/sitemap` 全部存在
- ✅ Person Schema 已就绪（Editorial Team）
- ✅ 64 卦 + Bazi + Zodiac 内容深度满足审核「足够内容」门槛
- ❌ Privacy 页缺 AdSense 广告条款、第三方 Cookie 说明、退出链接
- ❌ 无 Cookie consent banner（欧盟流量必需 CMP）
- ❌ About 页内容偏短（约 150 词），审核员会读
- ❌ 未集成 AdSense script 注入位
- ❌ 缺 `public/ads.txt`

**修复顺序：**
1. 改 `src/app/privacy/page.tsx`：添加 Advertising / Third-party vendors / Children's privacy 三段
2. 扩写 `src/app/about/page.tsx`：加 Editorial process、内容更新政策、纠错联系方式，扩到 600-800 词
3. 集成 Google Funding Choices CMP（免费 Cookie 同意 banner）
4. 提交 AdSense 申请（审核 1-14 天）
5. 通过后：在 `src/app/layout.tsx` 注入 `<AdSenseScript>`、创建 `public/ads.txt`、放置 3 个广告位（文章首段后 / 第 3 个 H2 前 / 文末）

**预期收益：** 通过审核后 1000 UV/月可带来 $5-15 起步，到第 60-90 天月 UV 上 1 万时月收入 $50-150。

---

### B. FAQ Schema 注入

**关键发现：** `src/components/templates/KnowledgePage.tsx` line 135 已经自动调用 `buildFAQPageSchema(faqs)`，意味着只要给每个 page 的 `faqs` 数组填内容，结构化数据自动生效，不需要改组件代码。

**当前问题：**
- bazi 板块只有 2 个页面（line 670、780）有自定义 FAQ，其余 P0 扩写页全部用 `defaultFaqs`（4 条通用问答，复用率太高）
- zodiac 12 个生肖页全部共享通用 FAQ
- i-ching 64 卦也是共享通用 FAQ

通用 FAQ 的问题：搜索引擎和 AI 引擎检测到同一组 FAQ 在多个页面重复出现时，会降低引用权重。每个页面应有独占的 5-8 条 FAQ。

**优先注入清单：**

| 优先级 | 页面 | FAQ 数量 |
|--------|------|---------|
| P0 | `/bazi/five-elements`、`/bazi/heavenly-stems`、`/bazi/earthly-branches` | 各 6 条 |
| P0 | `/chinese-zodiac/dragon`、`/rat`、`/tiger` | 各 6 条 |
| P1 | `/i-ching/hexagram-1` 到 `hexagram-12` | 各 5 条 |
| P2 | 其余 9 个生肖页 | 各 5 条 |
| P3 | 高流量 blog 文章独占 FAQ | 各 5 条 |

**FAQ 写作原则（决定是否被 AI 引擎抽取）：**
- 问题用第二人称提问（"What does my..." / "How do I..."），匹配真实搜索 query
- 答案首句直接给结论，40-60 词最理想（ChatGPT/Perplexity 抽取窗口）
- 答案中至少出现一次「中文术语 + 拼音 + 英文」三元组（如 "Wu Xing 五行 (Five Elements)"），帮助实体识别
- 避免反问句、修辞句

**验收：**
- `npx tsc --noEmit` 通过
- Google Rich Results Test (https://search.google.com/test/rich-results) 抽样 5 个 URL 显示 FAQPage 富媒体结果
- 部署 7 天后 GSC 「增强项 → 常见问题解答」面板显示有效项目数 > 50

---

### C. 长尾 Blog 内容生产

**选题原则：** 月搜索量 1k-10k、KD（关键词难度）<30、AI 引擎查询频次高、能自然内链到现有知识页。

**3 篇本月文章：**

#### Blog #1: "Day Master in Bazi: How to Find Yours and What It Means"
- 目标关键词：`day master bazi`（月搜索量约 2400，KD 22）
- 字数：1800-2200
- 大纲见 `CODEX-GROWTH-TASKS.md`
- 内链：5 个（五行、十干、十二地支、十神、bazi-calculator）
- 引用：《渊海子平》、Joey Yap

#### Blog #2: "Chinese Zodiac Compatibility: The Real Rules Behind the 12 Signs"
- 目标关键词：`chinese zodiac compatibility`（月搜索量约 9900，KD 28）
- 字数：2000-2500（流量主题，深度必须够）
- 内链：12 个生肖页 + zodiac-compatibility 工具 + 十二地支
- 引用：《尔雅》、Martin Palmer《T'ung Shu》

#### Blog #3: "I Ching for Beginners: How to Ask a Question and Read the Answer"
- 目标关键词：`i ching for beginners`（月搜索量约 1300，KD 18）
- 字数：1500-1800
- 内链：i-ching 旗舰页 + i-ching-oracle 工具 + 4-5 个高频卦页
- 引用：Wilhelm/Baynes、Alfred Huang

**为什么是这三篇：** 三篇分别覆盖 Bazi / Zodiac / I Ching 三大支柱，每篇都有强内链回流到现有知识页，能把链接权重在站内合理分配。三个目标关键词都是 1k+ 月搜索量、KD<30 的「容易摘的果子」，30 天内有机会进 top 30，60-90 天进 top 10。

---

## 配套基础工作

**Week 1 必做（每天 15-20 分钟）：**
1. Google Search Console 验证 mingliatlas.com，提交 sitemap.xml
2. Bing Webmaster Tools 同步验证（Bing 是 ChatGPT search 的索引源，重要性被低估）
3. GSC「URL 检查」对 6 个 P0 扩写页逐个请求索引
4. 内部链接审计：确保每个知识页底部至少 3 个相关内链

**Week 2 启动：**
- Pinterest Business 账号 + 6 个 board + 每天 5 张 pin
- Reddit r/ChineseAstrology、r/Bazi、r/IChing 价值贡献（前 2 周只评论不发链接）

**Week 3 启动：**
- ChatGPT、Perplexity、Gemini 各跑 5 个目标查询基线测试，记录是否引用 mingliatlas
- 没引用的查询 → 反向定位被引用站的 H1/title 模式 → 优化我们的页面

**Week 4 收口：**
- 复盘 GSC 数据（曝光、CTR、关键词分布）
- 决定下月 3 篇 blog 选题
- 邮件订阅 + lead magnet（"Free 2026 Year of the Horse Forecast PDF"）

---

## 30 天 KPI

| 指标 | 保守 | 乐观 |
|------|-----|------|
| Google 自然 UV/天 | 30-80 | 150-300 |
| Pinterest UV/天 | 50-150 | 300-600 |
| Reddit/AI 引擎 UV/天 | 20-50 | 80-200 |
| AdSense 月收入 | $20-50 | $80-150 |
| FAQ Rich Results 数量 | 50+ | 100+ |
| 邮件订阅 | 30-80 | 120-200 |

---

## 不做什么（明确边界）

- ❌ **订阅制变现** — 用户暂不需要，本月聚焦 AdSense + 一次性付费工具
- ❌ **付费推广（Google Ads / Meta Ads / 红人合作）** — 0 预算约束
- ❌ **重写历史页面** — P0 扩写已完成，本月只做增量内容
- ❌ **新增技术栈** — 维持 Next.js 15 现状，不做架构改造
- ❌ **过度依赖 X/Twitter** — 新账号冷启动太慢，本月不投精力

---

## 下一步

把 `CODEX-GROWTH-TASKS.md` 里的任务交给 Codex 按 Phase 1 → Phase 2 → Phase 3 顺序执行。每完成一个 Phase 跑 `npx tsc --noEmit` 验证，部署后回到本计划核对 KPI。
