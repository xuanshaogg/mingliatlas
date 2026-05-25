# Codex 执行清单：30 天自然流量增长

> 本文件是 `GROWTH-PLAN.md` 的可执行版本，按 Phase 分组，每个任务有明确的文件路径、代码模板和验收标准。
> Codex 按 Phase 1 → 2 → 3 顺序执行，每个 Phase 完成后跑 `npx tsc --noEmit` 验证。

---

## Phase 1：AdSense 合规页面（预计 1-2 小时）

### Task 1.1：扩写 Privacy Policy

**文件：** `src/app/privacy/page.tsx`

**操作：** 在现有 `sections` 数组末尾追加 3 个 section：

```tsx
{
  heading: "Advertising and third-party cookies",
  content: (
    <>
      <p>
        We use Google AdSense to display advertisements. Google and its advertising partners may use cookies to serve ads based on your prior visits to this website and other websites. These cookies enable Google to display personalized ads to you.
      </p>
      <p>
        You can opt out of personalized advertising by visiting{" "}
        <a href="https://www.google.com/settings/ads" className="text-brand-primary underline dark:text-gold-300">Google Ads Settings</a>.
        Alternatively, you can opt out of third-party vendor cookies at{" "}
        <a href="https://www.aboutads.info/choices/" className="text-brand-primary underline dark:text-gold-300">www.aboutads.info</a>.
      </p>
    </>
  ),
},
{
  heading: "Third-party services",
  content: (
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Google AdSense</strong> — advertising display and personalization</li>
      <li><strong>Vercel Analytics / Speed Insights</strong> — anonymous page-view and performance metrics</li>
      <li><strong>Google Search Console</strong> — search indexing and crawl diagnostics</li>
    </ul>
  ),
},
{
  heading: "Children's privacy",
  content: (
    <p>
      This website is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us through the{" "}
      <a href="/contact" className="text-brand-primary underline dark:text-gold-300">contact page</a>{" "}
      and we will delete the information promptly.
    </p>
  ),
},
```

**验收：** 页面渲染正常，包含 "Advertising"、"Third-party services"、"Children's privacy" 三个标题。

---

### Task 1.2：扩写 About 页面

**文件：** `src/app/about/page.tsx`

**操作：** 将现有 3 个 section 替换为 5 个 section（目标 600-800 词）：

```tsx
sections={[
  {
    heading: "Mission",
    content: (
      <>
        <p>
          mingliatlas exists to make Chinese metaphysics accessible to English-speaking readers without flattening it into fortune-telling language. The site covers Bazi (Four Pillars of Destiny), I Ching (Book of Changes), Feng Shui, Ziwei Doushu (Purple Star Astrology), and the Chinese Zodiac — each explained through clear definitions, historical context, and practical reading methods.
        </p>
        <p>
          Our goal is not to predict the future. It is to give readers a structured vocabulary for self-reflection, timing awareness, and pattern recognition using systems that have been refined over more than two thousand years of Chinese intellectual history.
        </p>
      </>
    ),
  },
  {
    heading: "Editorial process",
    content: (
      <>
        <p>
          Every article on mingliatlas follows a consistent editorial process. We begin with primary classical sources — texts like the Yuanhai Ziping (渊海子平), San Ming Tong Hui (三命通会), and the Zhou Yi (周易) — then cross-reference modern English-language scholarship to ensure accuracy and accessibility. Where interpretations diverge between schools, we note the disagreement rather than choosing one side.
        </p>
        <p>
          Each knowledge page includes a direct answer (40-75 words), historical background, mechanism explanation, and practical application. We cite our sources in a visible sidebar so readers can verify claims independently. All content is reviewed for factual accuracy before publication and updated when new scholarship or corrections are brought to our attention.
        </p>
      </>
    ),
  },
  {
    heading: "Content update policy",
    content: (
      <p>
        We review and update existing pages on a quarterly basis. Annual cycle content (such as zodiac year forecasts and luck pillar timing) is refreshed each January. If you find an error or outdated claim, please use our <a href="/contact" className="text-brand-primary underline dark:text-gold-300">contact form</a> with the page URL and a description of the issue. We typically respond within 2-3 business days and publish corrections within one week.
      </p>
    ),
  },
  {
    heading: "Who we are",
    content: (
      <p>
        The Mingli Atlas Editorial Team is a group of researchers and writers specializing in Chinese metaphysics. Our backgrounds span classical Chinese studies, comparative religion, data analysis, and software engineering. We are based across multiple time zones and collaborate asynchronously to produce content that is both culturally faithful and technically precise.
      </p>
    ),
  },
  {
    heading: "Disclaimer",
    content: (
      <p>
        All content on mingliatlas.com is provided for education, entertainment, and self-reflection purposes only. It does not constitute and should not replace professional medical, legal, financial, or mental health advice. Chinese metaphysics systems are symbolic frameworks for structured reflection — they are not predictive sciences. Readers should exercise their own judgment and consult qualified professionals for decisions affecting health, finances, or legal matters.
      </p>
    ),
  },
]}
```

**验收：** About 页面渲染 5 个 section，`document.querySelector('main').innerText.split(/\s+/).length` ≥ 500。

---

### Task 1.3：创建 ads.txt 占位文件

**文件：** `public/ads.txt`（新建）

**内容：**
```
# Google AdSense - replace pub-XXXXXX with actual publisher ID after approval
# google.com, pub-XXXXXX, DIRECT, f08c47fec0942fa0
```

**说明：** 注释状态，AdSense 审核通过后取消注释并填入真实 publisher ID。

---

### Task 1.4：AdSense Script 注入位准备

**文件：** `src/app/layout.tsx`

**操作：** 在 `<head>` 区域添加条件加载的 AdSense script（通过环境变量控制）：

```tsx
{process.env.NEXT_PUBLIC_ADSENSE_ID && (
  <script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
    crossOrigin="anonymous"
  />
)}
```

**验收：** 不设环境变量时不输出 script 标签；设置 `NEXT_PUBLIC_ADSENSE_ID=ca-pub-test` 后 HTML 源码中出现对应 script。

---

## Phase 1 验收

```bash
npx tsc --noEmit
# 期望：无输出（无错误）

pnpm build
# 期望：构建成功
```

---

## Phase 2：FAQ Schema 注入（预计 3-4 小时）

### Task 2.1：`/bazi/five-elements` 独占 FAQ

**文件：** `src/content/bazi/pages.tsx`

**操作：** 找到 `slug: "five-elements"` 对应的 page 定义，将 `faqs: defaultFaqs` 替换为：

```tsx
faqs: [
  {
    question: "What are the Five Elements in Chinese astrology?",
    answer: "The Five Elements (Wu Xing 五行) are Wood, Fire, Earth, Metal, and Water. They describe five phases of energy movement — not fixed substances — used in Bazi, Feng Shui, and traditional Chinese medicine to map how natural forces generate, control, and transform each other through predictable cycles.",
  },
  {
    question: "How do I know which element I am in Bazi?",
    answer: "Your dominant element comes from your Day Master — the Heavenly Stem sitting above your day pillar. For example, if your Day Master is Jia (甲) or Yi (乙), your self-element is Wood. A Bazi calculator using your birth date, time, and location will identify this automatically.",
  },
  {
    question: "What is the difference between the generating and controlling cycles?",
    answer: "The generating cycle (相生 xiāng shēng) shows how each element supports the next: Wood feeds Fire, Fire creates Earth, Earth bears Metal, Metal enriches Water, Water nourishes Wood. The controlling cycle (相克 xiāng kè) shows how each element regulates another: Wood parts Earth, Earth channels Water, Water cools Fire, Fire melts Metal, Metal cuts Wood.",
  },
  {
    question: "Which element is strongest in 2026?",
    answer: "2026 is the year of the Fire Horse (丙午). Fire is the dominant element of the year, supported by the Horse branch which is pure Fire. People with strong Water in their charts may feel more pressure, while those with weak Fire may find the year energizing.",
  },
  {
    question: "Are the Chinese Five Elements the same as Western elements?",
    answer: "No. Western classical elements (earth, water, air, fire) describe static substances. Chinese Wu Xing (五行) describes dynamic phases of movement and transformation. The character 行 means 'to move' or 'to walk.' Wu Xing is a process model, not a material taxonomy.",
  },
  {
    question: "Can my element change over time?",
    answer: "Your natal Day Master element never changes — it is fixed at birth. However, your Luck Pillars (大运 Da Yun) cycle through different elements every 10 years, and annual pillars bring new elemental influences each year. This is why the same person experiences different energy patterns in different decades.",
  },
],
```

---

### Task 2.2：`/bazi/heavenly-stems` 独占 FAQ

**文件：** `src/content/bazi/pages.tsx`

**操作：** 找到 `slug: "heavenly-stems"` 对应的 page 定义，将 `faqs: defaultFaqs` 替换为：

```tsx
faqs: [
  {
    question: "What are the Ten Heavenly Stems in Bazi?",
    answer: "The Ten Heavenly Stems (天干 Tiān Gān) are Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, and Gui. Each carries one of the Five Elements in either yang or yin polarity. They sit above the four pillars in a Bazi chart and represent visible, outward-facing energy.",
  },
  {
    question: "What is my Heavenly Stem?",
    answer: "Your most important Heavenly Stem is your Day Master — the stem above your day pillar. Use a Bazi calculator with your exact birth date and time to find it. For example, someone born on a Jia (甲) day has a Yang Wood Day Master.",
  },
  {
    question: "How are Heavenly Stems different from Earthly Branches?",
    answer: "Heavenly Stems represent the visible, above-ground energy layer (天, heaven). Earthly Branches represent the hidden, below-ground energy layer (地, earth) and contain hidden stems inside them. Together they form the full stem-branch (干支 gānzhī) system used in the Chinese calendar and Bazi charts.",
  },
  {
    question: "Do Heavenly Stems combine with each other?",
    answer: "Yes. There are five stem combinations (天干合 tiāngān hé): Jia-Ji combine toward Earth, Yi-Geng toward Metal, Bing-Xin toward Water, Ding-Ren toward Wood, and Wu-Gui toward Fire. Whether the combination actually transforms depends on seasonal support and surrounding chart conditions.",
  },
  {
    question: "Which Heavenly Stem is the strongest?",
    answer: "No single stem is inherently strongest. Strength depends on seasonal timing (月令 yuè lìng). A stem is strong when it matches the season: Wood stems are strongest in spring, Fire in summer, Metal in autumn, Water in winter. Earth stems gain strength during seasonal transitions.",
  },
  {
    question: "What does my Day Master stem say about my personality?",
    answer: "Your Day Master gives a baseline energy signature. Jia Wood is like a tall tree — upright and ambitious. Yi Wood is like a vine — flexible and adaptive. Bing Fire is like the sun — warm and visible. Each of the ten stems has a natural image that describes its core quality, but personality also depends on the full chart context.",
  },
],
```

---

### Task 2.3：`/bazi/earthly-branches` 独占 FAQ

**文件：** `src/content/bazi/pages.tsx`

**操作：** 找到 `slug: "earthly-branches"` 对应的 page 定义，将 `faqs: defaultFaqs` 替换为：

<!-- PLACEHOLDER_TASK_2_3 -->

```tsx
faqs: [
  {
    question: "What are the 12 Earthly Branches?",
    answer: "The 12 Earthly Branches (地支 Dì Zhī) are Zi, Chou, Yin, Mao, Chen, Si, Wu, Wei, Shen, You, Xu, Hai. They map to the 12 zodiac animals (Rat through Pig), the 12 months of the lunar year, and 12 two-hour blocks of the day. Each branch carries hidden stems and an elemental quality.",
  },
  {
    question: "Are Earthly Branches the same as Chinese zodiac animals?",
    answer: "They share the same 12-cycle but are not identical. Branches are the technical metaphysical unit used in Bazi, the Chinese calendar, and time-keeping. Zodiac animals are the popular symbolic representation of each branch. Zi = Rat, Chou = Ox, Yin = Tiger, and so on.",
  },
  {
    question: "What are hidden stems in Earthly Branches?",
    answer: "Each Earthly Branch contains 1-3 hidden Heavenly Stems (人元 rén yuán). For example, Yin (Tiger) holds Jia Wood, Bing Fire, and Wu Earth. Hidden stems are critical in Bazi reading because they reveal latent elemental influences not visible in the surface stem layer.",
  },
  {
    question: "What are the three harmonies (San He)?",
    answer: "The four three-harmony groups (三合 sān hé) form complete elemental forces: Yin-Wu-Xu form a Fire frame, Si-You-Chou form a Metal frame, Shen-Zi-Chen form a Water frame, and Hai-Mao-Wei form a Wood frame. When all three branches appear in a chart, the corresponding element becomes very strong.",
  },
  {
    question: "What is a branch clash (Liu Chong)?",
    answer: "There are six clashes (六冲 liù chōng): Zi-Wu, Chou-Wei, Yin-Shen, Mao-You, Chen-Xu, Si-Hai. Each pair sits 180 degrees apart on the branch circle and represents opposing energy. Clashes in a chart indicate change, movement, or disruption in the life area associated with that pillar.",
  },
  {
    question: "How do Earthly Branches map to time of day?",
    answer: "Each branch covers a two-hour block. Zi is 11pm-1am, Chou is 1am-3am, Yin is 3am-5am, and so on through Hai (9pm-11pm). Your hour pillar branch is determined by your exact birth time and is essential for a complete Bazi reading.",
  },
],
```

---

### Task 2.4 / 2.5 / 2.6：Dragon / Rat / Tiger 独占 FAQ

**文件：** `src/content/zodiac/pages.tsx`

**操作：** 在 `animalSections` 同位置增加 `animalFaqs` 映射：

```tsx
const animalFaqs: Partial<Record<string, FAQ[]>> = {
  dragon: [
    {
      question: "What years are Dragon years in the Chinese zodiac?",
      answer: "Recent Dragon years include 1940, 1952, 1964, 1976, 1988, 2000, 2012, and 2024. The next Dragon year is 2036. Each Dragon year carries a different element: 2024 was a Wood Dragon year, 2012 was a Water Dragon year, and 2000 was a Metal Dragon year.",
    },
    {
      question: "Is the Dragon the most powerful Chinese zodiac sign?",
      answer: "The Dragon is the only mythical animal among the 12 signs and is traditionally associated with imperial authority, wealth, and good fortune. However, no zodiac sign is inherently 'most powerful' — strength in Chinese metaphysics depends on the full Bazi chart, not the year branch alone.",
    },
    {
      question: "Who is most compatible with a Dragon?",
      answer: "Dragons form harmonies with Rat and Monkey (三合 Shen-Zi-Chen Water frame) and with Rooster (六合 Liu He pair). Dragons clash with Dog (Chen-Xu clash) and may experience friction with Ox and Rabbit. Compatibility is more reliable when read across the full Bazi chart, not just animal signs.",
    },
    {
      question: "What does a Wood Dragon mean vs a Fire Dragon?",
      answer: "The same Dragon branch (Chen) takes on different qualities depending on the year's Heavenly Stem. A Wood Dragon (Jia Chen or Yi Chen) blends Dragon's authority with Wood's growth and vision. A Fire Dragon (Bing Chen or Ding Chen) adds visibility and charisma. The element changes the Dragon's expression but not its core nature.",
    },
    {
      question: "What career suits a Dragon?",
      answer: "Dragons traditionally suit leadership, entrepreneurship, performing arts, politics, and any field that rewards visibility and bold vision. The Chen branch is associated with the Earth element and the springtime transition, which gives Dragons a foundation for both stability and growth-oriented work.",
    },
    {
      question: "How will 2026 affect Dragons?",
      answer: "2026 is the year of the Fire Horse (Bing Wu). Dragons do not clash with Horse but the strong Fire energy may amplify Dragon's natural intensity. Dragons should focus on rest, water-element activities, and avoiding overcommitment to balance the year's Fire-heavy energy.",
    },
  ],
  rat: [
    {
      question: "What years are Rat years?",
      answer: "Recent Rat years include 1936, 1948, 1960, 1972, 1984, 1996, 2008, and 2020. The next Rat year is 2032. Rat is the first sign of the Chinese zodiac and corresponds to the Zi branch — pure Yang Water and the late-night hours of 11pm-1am.",
    },
    {
      question: "What does it mean to be born in the Year of the Rat?",
      answer: "Year of the Rat individuals are traditionally seen as intelligent, adaptable, resourceful, and strategically minded. The Zi branch is pure Water — flowing, perceptive, and capable of navigating obstacles by finding paths around them rather than through them.",
    },
    {
      question: "Who is most compatible with a Rat?",
      answer: "Rats form harmonies with Dragon and Monkey (三合 Shen-Zi-Chen Water frame) and with Ox (六合 Liu He pair). Rats clash with Horse (Zi-Wu clash) and may experience friction with Rabbit and Rooster.",
    },
    {
      question: "What's the difference between a Wood Rat and a Metal Rat?",
      answer: "The Rat branch (Zi) is always Water, but the year's Heavenly Stem changes the surface element. A Wood Rat (Jia Zi or Yi Zi) blends Water's adaptability with Wood's growth. A Metal Rat (Geng Zi or Xin Zi) adds precision and refinement. Each stem-branch combination produces a distinct profile.",
    },
    {
      question: "What careers suit a Rat?",
      answer: "Rats traditionally suit research, finance, analytics, writing, and any field that rewards pattern recognition and strategic thinking. The Water element gives Rats natural skill at navigating complex systems and shifting environments.",
    },
    {
      question: "How will 2026 affect Rats?",
      answer: "2026 is the year of the Fire Horse — Horse directly clashes with Rat (Zi-Wu clash). Rats should expect a year of movement, change, and increased pressure. Avoid major commitments early in the year and focus on flexibility, travel, and adapting plans as conditions shift.",
    },
  ],
  tiger: [
    {
      question: "What years are Tiger years?",
      answer: "Recent Tiger years include 1938, 1950, 1962, 1974, 1986, 1998, 2010, and 2022. The next Tiger year is 2034. Tiger corresponds to the Yin branch — Yang Wood — and the early morning hours of 3am-5am, the time of waking and emergence.",
    },
    {
      question: "What does it mean to be born in the Year of the Tiger?",
      answer: "Year of the Tiger individuals are traditionally seen as courageous, independent, ambitious, and protective. The Yin branch holds Jia Wood, Bing Fire, and Wu Earth as hidden stems, giving Tigers a blend of growth drive, visibility, and grounded action.",
    },
    {
      question: "Who is most compatible with a Tiger?",
      answer: "Tigers form harmonies with Horse and Dog (三合 Yin-Wu-Xu Fire frame) and with Pig (六合 Liu He pair). Tigers clash with Monkey (Yin-Shen clash) and may experience friction with Snake and Tiger itself in some configurations.",
    },
    {
      question: "What's the difference between a Water Tiger and a Wood Tiger?",
      answer: "The Tiger branch (Yin) is always Yang Wood, but the year's Heavenly Stem changes the surface flavor. A Water Tiger (Ren Yin or Gui Yin) softens the Tiger's drive with reflection and depth. A Wood Tiger (Jia Yin or Yi Yin) doubles the Wood energy and amplifies ambition.",
    },
    {
      question: "What careers suit a Tiger?",
      answer: "Tigers traditionally suit leadership roles, entrepreneurship, law enforcement, military, advocacy, and any field that rewards bold action and independent decision-making. The combination of Wood growth energy and hidden Fire visibility makes Tigers natural pioneers.",
    },
    {
      question: "How will 2026 affect Tigers?",
      answer: "2026 is the year of the Fire Horse. Horse forms a three-harmony with Tiger (Yin-Wu-Xu Fire frame), making this a strongly supportive year for Tigers. Expect increased opportunities, visibility, and energy — but pace yourself, since strong Fire can lead to burnout if not balanced with rest.",
    },
  ],
};
```

然后在 `animalPages.map` 中将 `faqs: defaultFaqs` 改为 `faqs: animalFaqs[animal.slug] ?? defaultFaqs`。

**注意：** 顶部需要 `import type { FAQ } from "@/components/shared/FAQSection";`（若未导入）。

---

### Task 2.7：Hexagram 1-12 独占 FAQ（可选，时间允许时做）

**文件：** `src/content/i-ching/pages.tsx`

**操作：** 在 `createHexagramPage` 上方增加 `hexagramFaqs` 映射：

```tsx
const hexagramFaqs: Partial<Record<number, FAQ[]>> = {
  1: [
    {
      question: "What does Hexagram 1 (Qian / The Creative) mean?",
      answer: "Hexagram 1 (乾 Qián, The Creative) consists of six unbroken yang lines representing pure creative energy, heaven, and the dragon's ascent. It signals strong forward momentum, leadership, and the right moment to initiate. The Judgment says: 'The Creative works sublime success, furthering through perseverance.'",
    },
    {
      question: "When should I act on Hexagram 1?",
      answer: "Hexagram 1 appears when conditions support bold, principled action. Move forward with clarity and discipline. The hexagram also warns against arrogance — the top line 'Arrogant dragon will have cause to repent' cautions that even pure yang energy can overreach.",
    },
    {
      question: "What does Hexagram 1 mean in a love reading?",
      answer: "In relationships, Hexagram 1 suggests taking initiative with sincerity and strength. For a new connection, it favors the active partner making a clear move. In an existing relationship, it points to renewal through clarity and direct communication rather than passive waiting.",
    },
    {
      question: "What does Hexagram 1 mean for career?",
      answer: "Hexagram 1 in a career context favors launching ventures, taking leadership roles, and pursuing visible accomplishments. The full-yang structure indicates the energy and conditions for major undertakings — but success requires sustained perseverance, not just initial momentum.",
    },
    {
      question: "What is the changing-line meaning for Hexagram 1?",
      answer: "Each of the six lines describes a stage of the dragon's emergence: hidden dragon, dragon in the field, restless leader at evening, dragon wavering in the depths, flying dragon in the heavens, arrogant dragon. The line that changes in your reading points to which stage you are currently navigating.",
    },
  ],
  2: [
    {
      question: "What does Hexagram 2 (Kun / The Receptive) mean?",
      answer: "Hexagram 2 (坤 Kūn, The Receptive) consists of six broken yin lines representing pure receptive energy, earth, and the devoted mare. It signals the right moment to support, follow, nurture, and respond rather than initiate. Success comes through perseverance, devotion, and following without forcing.",
    },
    {
      question: "When should I act on Hexagram 2?",
      answer: "Hexagram 2 advises pause, observation, and supportive action rather than bold initiative. It is the right hexagram when you should be the foundation for others' efforts, build slowly, or wait for the right leader or opportunity to emerge before acting.",
    },
    {
      question: "What does Hexagram 2 mean in love?",
      answer: "In relationships, Hexagram 2 favors patience, devotion, and emotional steadiness. It supports the role of nurturing and being present rather than chasing. For new connections, it suggests letting the relationship develop naturally rather than pushing for quick definition.",
    },
    {
      question: "What does Hexagram 2 mean for career?",
      answer: "Hexagram 2 in career favors team support roles, operational excellence, and long-term institutional work rather than entrepreneurial leaps. It is the energy of the reliable second-in-command, the foundational builder, the patient cultivator of conditions for future success.",
    },
    {
      question: "How does Hexagram 2 relate to Hexagram 1?",
      answer: "Hexagrams 1 and 2 form a complementary pair: pure yang (Qian, Creative) and pure yin (Kun, Receptive). Together they represent the two foundational energies from which all 62 other hexagrams emerge. Neither is superior — they describe different moments and roles in any process.",
    },
  ],
  // ... 模板可按 1、2 卦的格式扩展到 11 (Tai 泰), 12 (Pi 否), 49 (Ge 革) 等高频咨询卦
};
```

然后在 `createHexagramPage` 内：
```tsx
faqs: hexagramFaqs[hexagram.number] ?? defaultHexagramFaqs,
```

**说明：** 由于全部 64 卦 FAQ 工作量大，本月只做 1-12 卦最常被咨询的；其余保持 default。

---

## Phase 2 验收

```bash
npx tsc --noEmit
# 期望：无输出

pnpm build
# 期望：构建成功
```

部署后用 Google Rich Results Test 抽测 5 个 URL：
- https://mingliatlas.com/bazi/five-elements
- https://mingliatlas.com/bazi/heavenly-stems
- https://mingliatlas.com/chinese-zodiac/dragon
- https://mingliatlas.com/chinese-zodiac/rat
- https://mingliatlas.com/i-ching/hexagram-1

期望：每个 URL 都显示 FAQPage 富媒体结果，FAQ 数量与代码一致。

---

## Phase 3：长尾 Blog 文章（每周 1 篇，预计每篇 4-5 小时）

### Task 3.1：Blog #1 "Day Master in Bazi"

**文件：** `src/content/blog/posts.tsx`

**slug：** `day-master-in-bazi`
**path：** `/blog/day-master-in-bazi`
**title：** "Day Master in Bazi: How to Find Yours and What It Means"
**description：** "The Day Master is the Heavenly Stem above your day pillar — the core 'self' element in your Bazi chart. Learn how to find yours, what each of the 10 Day Masters means, and how strength is measured."
**category：** "Bazi"
**目标字数：** 1800-2200

**Sections 大纲：**
1. **What is a Day Master?**（200 词） — 日主 / Ri Zhu 字面拆解，区别于「日柱」整柱概念；引《渊海子平》
2. **How to find your Day Master in 2 steps**（300 词） — Step 1: 用万年历或在线 Bazi 计算器输入出生年月日时；Step 2: 取日柱的天干；附 `/tools/bazi-calculator` 内链
3. **The 10 Day Masters at a glance**（500 词） — 表格 + 短描述（Jia Wood / Yi Wood / Bing Fire / Ding Fire / Wu Earth / Ji Earth / Geng Metal / Xin Metal / Ren Water / Gui Water），每个一句性格关键词 + 自然意象；内链到 `/bazi/heavenly-stems`
4. **Strong vs weak Day Master**（350 词） — 月令 yue ling、根气、十神支援；强弱判断的实操方法
5. **Day Master and the Five Elements**（250 词） — Day Master 元素与喜用神/忌神的关系；内链 `/bazi/five-elements`
6. **Common misconceptions**（200 词） — Day Master ≠ 性格全部、≠ 命运、必须结合其他柱、不能只看年柱

**FAQ（5 条）：**
- What is my Day Master?
- How do I calculate my Day Master without a calculator?
- Can my Day Master change?
- Is a strong Day Master better than a weak Day Master?
- What is the most common Day Master?

**内链：** `/bazi/five-elements`、`/bazi/heavenly-stems`、`/bazi/earthly-branches`、`/bazi/ten-gods`（若存在）、`/tools/bazi-calculator`

**引用：**
- 《渊海子平》Yuanhai Ziping (Song Dynasty)
- Joey Yap, *Bazi: The Destiny Code* (2005)

---

### Task 3.2：Blog #2 "Chinese Zodiac Compatibility"

**slug：** `chinese-zodiac-compatibility`
**path：** `/blog/chinese-zodiac-compatibility`
**title：** "Chinese Zodiac Compatibility: The Real Rules Behind the 12 Signs"
**description：** "Chinese zodiac compatibility uses three frameworks: six harmonies (六合), four three-harmony groups (三合), and six clashes (六冲). Learn the classical rules — not the simplified internet versions."
**category：** "Chinese Zodiac"
**目标字数：** 2000-2500

**Sections 大纲：**
1. **Why most zodiac compatibility charts online are wrong**（200 词） — 简化「Dragon + Monkey = perfect」忽略了三合/六合/六冲的完整框架
2. **The 6 Harmonies (Liu He 六合)**（350 词） — Rat-Ox / Tiger-Pig / Rabbit-Dog / Dragon-Rooster / Snake-Monkey / Horse-Goat 全配对解释；每对附简短机理
3. **The 4 Three-Harmony Groups (San He 三合)**（300 词） — 火局 寅午戌 (Tiger-Horse-Dog Fire frame)、金局 巳酉丑 (Snake-Rooster-Ox Metal frame)、水局 申子辰 (Monkey-Rat-Dragon Water frame)、木局 亥卯未 (Pig-Rabbit-Goat Wood frame)
4. **The 6 Clashes (Liu Chong 六冲)**（300 词） — 子午、丑未、寅申、卯酉、辰戌、巳亥 六组对冲；解释冲不等于「相克」，而是激活与变动
5. **Full compatibility chart (12×12 matrix)**（180 词 + 大表格）
6. **Compatibility for 2026 (Year of the Horse)**（250 词） — Horse 三合 Tiger、Dog；六合 Goat；冲 Rat
7. **Beyond zodiac: why your Day Master matters more**（300 词） — 引导到 Bazi 文章
8. **Common myths debunked**（150 词） — 「Tigers can't marry Snakes」「Rats and Horses must divorce」等以偏概全的说法

**FAQ（6 条）：**
- Which Chinese zodiac signs are most compatible?
- Can incompatible zodiac signs make a relationship work?
- What is the worst zodiac match?
- Do clashes always mean breakup?
- How accurate is zodiac compatibility compared to Bazi?
- What does my zodiac say about my compatibility in 2026?

**内链：** 12 个生肖页面、`/tools/zodiac-compatibility`、`/bazi/earthly-branches`、Day Master blog (#1)

**引用：**
- 《尔雅》Erya (Han Dynasty classical reference)
- Martin Palmer, *T'ung Shu: The Ancient Chinese Almanac* (1986)

---

### Task 3.3：Blog #3 "I Ching for Beginners"

**slug：** `i-ching-for-beginners`
**path：** `/blog/i-ching-for-beginners`
**title：** "I Ching for Beginners: How to Ask a Question and Read the Answer"
**description：** "A beginner's step-by-step guide to consulting the I Ching: how to phrase a good question, throw the three coins, build the hexagram, read the judgment, and interpret changing lines."
**category：** "I Ching"
**目标字数：** 1500-1800

**Sections 大纲：**
1. **Before you start: how to phrase a good question**（300 词） — 开放式 vs 是非题；避免双重问题；推荐 "What should I focus on regarding X?" 句式
2. **The 3-coin method step by step**（450 词） — 6 次投掷流程、heads/tails 数值映射 (3 tails = 老阴 6, 3 heads = 老阳 9, etc.)、从底向上堆叠成卦的图示
3. **Reading the hexagram you got**（350 词） — 如何在 mingliatlas 站内找到对应卦的解读页（链接到 `/i-ching`）
4. **Changing lines and the second hexagram**（250 词） — 6 和 9 是变爻；变出新卦的含义
5. **How often should you consult?**（150 词） — 避免短时间内重复同一问题；尊重答案
6. **Quick start: 3 example questions and how to read them**（200 词） — 提供 3 个示例 query 全过程

**FAQ（5 条）：**
- Do I have to use coins, or can I use yarrow stalks?
- What if I get the same hexagram twice?
- Should I ask yes/no questions to the I Ching?
- How do I know which line is changing?
- Can I ask the I Ching about other people?

**内链：** `/i-ching` 旗舰页、`/tools/i-ching-oracle`、`/i-ching/hexagram-1`、`/i-ching/hexagram-2`、`/i-ching/hexagram-11`、`/i-ching/hexagram-49`

**引用：**
- Wilhelm/Baynes, *The I Ching or Book of Changes* (Bollingen, 1950)
- Alfred Huang, *The Complete I Ching* (Inner Traditions, 1998)

---

## Phase 3 验收

```bash
npx tsc --noEmit
pnpm build
```

部署后：
1. 用 GSC「URL 检查」对 3 个新 blog URL 逐个请求索引
2. 检查每篇 blog 渲染的 FAQ Schema、Article Schema、Breadcrumb Schema 都正常
3. 用 https://search.google.com/test/rich-results 抽查 3 个 URL

---

## Phase 4：站外基础（每天 15-20 分钟，与 Phase 1-3 并行）

这部分**不需要 Codex 改代码**，由用户手动操作：

1. **Google Search Console** — 验证 mingliatlas.com，提交 sitemap.xml，对 6 个 P0 页面请求索引
2. **Bing Webmaster Tools** — 同步验证，提交 sitemap
3. **AdSense 申请** — Phase 1 完成后立即提交，等待 1-14 天
4. **Funding Choices CMP** — 注册免费 Cookie 同意 banner，部署到 `<head>`
5. **Pinterest Business 账号** — 创建 6 个 board (Chinese Zodiac / Bazi Basics / I Ching / Feng Shui / Five Elements / Year of the Horse 2026)，每天 5 张 Canva pin
6. **Reddit 价值贡献** — r/ChineseAstrology、r/Bazi、r/IChing 前 2 周只评论不发链接，第 3 周开始在高度相关的回答末尾自然带链接

---

## 任务执行顺序总结

| 顺序 | 任务 | 预估时间 | 阻塞依赖 |
|------|------|---------|---------|
| 1 | Task 1.1 - 1.4 (AdSense 合规) | 1-2 小时 | 无 |
| 2 | 提交 AdSense 申请 + GSC + Bing | 30 分钟 | Task 1 完成 |
| 3 | Task 2.1 - 2.3 (Bazi P0 FAQ) | 1 小时 | 无 |
| 4 | Task 2.4 - 2.6 (Zodiac P0 FAQ) | 1 小时 | 无 |
| 5 | Task 2.7 (Hexagram 1-12 FAQ) | 1-2 小时 | 无 |
| 6 | Task 3.1 (Blog #1 Day Master) | 4-5 小时 | 建议安排在 Week 1 末 |
| 7 | Task 3.2 (Blog #2 Compatibility) | 4-5 小时 | Week 2 |
| 8 | Task 3.3 (Blog #3 I Ching) | 4-5 小时 | Week 3 |

---

## 部署 + 验证流程（每个 Phase 完成后）

```bash
cd /Users/xuanshao/Google geo/chinese-metaphysics-site

# 1. 类型验证
npx tsc --noEmit

# 2. 构建验证
pnpm build

# 3. 提交并部署（Vercel auto-deploy from main）
git add .
git commit -m "chore: <phase description>"
git push

# 4. 等待 Vercel 部署完成（约 2-3 分钟）

# 5. 抽样验收：浏览器打开变更页面，devtools console 跑：
document.querySelectorAll('script[type="application/ld+json"]').forEach(s => console.log(JSON.parse(s.textContent)));

# 6. Rich Results Test：
# https://search.google.com/test/rich-results
```

---

## 回滚方案

如任何 Phase 部署后线上出错：
```bash
git revert HEAD
git push
```
Vercel 会自动回滚到上一版本。
