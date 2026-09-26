# 深度 SEO 与内容修订 · 2026-09-26

## 范围与状态

本轮延续现有 UI 和第一轮 SEO 改动，重点处理内容发现、索引边界、重复主题、来源与日期准确性。修改位于本地工作区，尚未提交、推送或部署。

审计范围是内容注册表中的 **242 个规范公开页面**。本站继续允许其中 **40 个页面**索引并写入 XML sitemap；这表示代码中的索引策略，不表示 Google 已收录 40 个页面。本轮未获取新的 Search Console 数据。

## 审计发现与处理

| 发现                                               | 本轮处理                                                                                                             |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 六十四卦目录没有直接通往单卦指南的入口             | 新增完整 64 卦目录，按文王卦序排列，展示数字、名称、卦符及上下卦；提供每八卦一组的页内跳转。                         |
| 重点文章从正文中获得的入口较少                     | 五个专题首页增加有顺序的阅读路径；十二生肖总览补全 12 个生肖入口；单卦页连接目录、成对卦、投币说明、阅读指南和工具。 |
| 两个页面使用同一桌面风水标题                       | 博客改成独立的 10 分钟工作区检查清单；专题页继续负责概念解释。现有两个 URL 均保留。                                  |
| 多篇不相关博客复用火元素 FAQ                       | 火元素 FAQ 仅在对应内容中保留；桌面文章使用独立问答；没有合适问答的文章不输出空 FAQ 区块或结构化数据。               |
| 57 处编辑概述被称为经典 Judgment 原文              | 改为明确的编辑概述标注。全部 64 篇卦象指南加入结构与来源说明，区分本站文字和指定译本的原文。                         |
| 64 篇卦象指南按卦号推算发布日期                    | 移除推算函数及这些无法确认的发布日期；保留本轮实际修订的更新日期。博客种子文章改为读取自身日期，移除统一日期覆盖。   |
| 八卦说明颠倒既济卦上下卦，并含不准确的起卦概率表述 | 更正为水上火下；补齐八卦表、投币数值与概率表，以及从既济变屯的完整动爻例子；区分蓍草法与三枚硬币法。                 |
| 无效路径可能继承首页 canonical                     | 移除根布局的首页 canonical 默认值，内容路由关闭未注册参数，缺失内容直接进入 404。有效页面继续逐页输出 canonical。    |
| 重定向规则散落在多处                               | 三个既有永久重定向集中在 `src/lib/content/urls.ts`；路由配置、规范地址和目录过滤共用规则。                           |
| 预览部署没有明确的全站索引保护                     | `VERCEL_ENV=preview` 时输出 noindex 元数据和响应头，省略 sitemap 条目，允许抓取以便机器人读取 noindex。              |

## 内容与阅读体验

### 五个专题首页

八字、易经、生肖、风水和紫微首页均增加普通服务端链接组成的阅读路径。每个入口解释该页面能解决什么问题，读者可从概念、方法进入具体工具和延伸指南。

相关内容链接统一转换为规范地址，并去除重复及指向当前页的入口。页面目录包含新增内容区块；结构化数据中的相关页面与实际可见链接保持一致。

### 三篇易经基础指南

- `/i-ching/eight-trigrams`：八卦名称、自然意象、符号及从下往上读取的三位线型；对照既济与未济说明位置的重要性。
- `/i-ching/sixty-four-hexagrams`：完整 64 卦卡片目录与 64 项 CollectionPage / ItemList；桌面双列、手机单列。
- `/i-ching/how-to-cast`：明确正反面赋值约定、6/7/8/9 的含义、理想公平硬币的概率，以及逐爻记录和变卦例子。

三篇指南使用各自的简介、统计卡片和问答，避免重复的通用介绍。概率说明只描述起卦模型，不用于推断现实事件的发生概率。

### 桌面风水博客

`/blog/office-desk-feng-shui` 改为 **Desk Feng Shui Checklist: A 10-Minute Workspace Review**。正文包含五步检查、简图记录方式、可观察的前后对比示例和三个对应问题。它与 `/feng-shui/office/desk` 的概念页互相连接。

### 来源与机器可读内容

易经页面提供古籍文本和指定译本出版社入口，并明确本站内容的编辑性质。`llms.txt` 和 `llms-full.txt` 的说明同步修正；卦象链接从实际允许索引的页面集合产生，避免硬编码清单与索引策略脱节。这些文件不代表搜索引擎收录承诺。

## 本地检查记录

| 项目           | 结果                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------- |
| 生产构建       | `pnpm build` 成功，TypeScript 编译通过，生成 259 个静态页面。                                       |
| 公开页面 HTML  | 242 / 242 返回 HTTP 200。                                                                           |
| 标题与描述     | 242 个页面中没有重复 title，也没有重复 meta description。                                           |
| Canonical      | 242 个页面均与其规范路径一致。                                                                      |
| 页面语义       | 每页均有一个 h1 和一个 main。                                                                       |
| 索引与 sitemap | 40 个页面输出 `index, follow`；XML sitemap 为 40 个地址、40 个唯一地址。                            |
| 六十四卦目录   | 正文含 64 个单卦链接，CollectionPage 列表同为 64 项。                                               |
| FAQ 输出       | 未发现空 FAQPage 列表。                                                                             |
| 卦象发布日期   | 64 篇卦象指南不再输出推算的 `datePublished`。                                                       |
| 无效路径       | 易经、博客、八字及根路径的四个缺失地址均返回 404 与 noindex，未继承首页 canonical。                 |
| 永久重定向     | 三个既有地址仍返回 308，目标保持原有生产规范地址。                                                  |
| 响应式展示     | 六十四卦目录在 1440px 桌面与 390px 手机视口显示正常，页面宽度未超出视口；八卦卡片亦完成手机端查看。 |

上一轮构建的 261 个静态页面减少为 259 个，是因为博客和生肖各一个重定向旧地址不再额外生成 HTML；重定向仍然存在。

下表仅统计 **40 个允许索引页面正文中的不同来源页数量**，排除页头、页脚及当前页自身，不是外部反向链接或搜索表现指标：

| 目标页面                                | 调整前 | 调整后 |
| --------------------------------------- | -----: | -----: |
| `/blog/i-ching-beginners-reading-guide` |      1 |      9 |
| `/i-ching/hexagram-1`                   |      1 |      2 |
| `/i-ching/hexagram-63`                  |      1 |      4 |
| `/chinese-zodiac/tiger`                 |      1 |      2 |

检查通过本地生产服务的 HTML、XML 和浏览器页面完成。本轮未新增或运行自动化测试套件；之前文档中的测试结果不代表本轮结果。构建的 Edge runtime 提示对应动态图片路由，没有阻止构建完成。

## 实际限制

- Vercel 预览环境的 noindex 保护已实现，尚未在真实预览部署上检查；本地生产构建没有误加全站 noindex 响应头。
- 本轮没有扩大 40 个页面的索引范围。其余文章仍需逐篇完善内容依据、具体例子和独立价值，再决定是否开放索引。
- 收录、曝光、点击和排名需要部署后的 Search Console 数据观察。仓库中 2026 年 8 月的历史记录不是本轮线上结果。

## 依据

技术与内容方向参考以下官方资料：

- [Google：实用、可靠、以读者为先的内容](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google：可抓取链接与锚文本](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google：页面发布日期和更新日期](https://developers.google.com/search/docs/appearance/publication-dates)
- [Google：阻止索引及抓取与 noindex 的关系](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Next.js：路由参数与静态路径配置](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)
- [Vercel：系统环境变量](https://vercel.com/docs/environment-variables/system-environment-variables)

易经内容核对参考：

- [Chinese Text Project：《说卦》](https://ctext.org/book-of-changes/shuo-gua)
- [Chinese Text Project：既济《象传》](https://ctext.org/book-of-changes/ji-ji2/ens)
- [Chinese Text Project：《系辞上》](https://ctext.org/book-of-changes/xi-ci-shang)
- [Alfred Huang《The Complete I Ching》出版社书目](https://www.innertraditions.com/books/the-complete-i-ching-10th-anniversary-edition-590)
