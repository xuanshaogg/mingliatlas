# SEO 结构与内容升级 · 2026-09-24

## 本轮范围

在现有站点架构和前两轮 UI 改动上，调整共享 SEO 输出、导航与内容发现机制，重点修订六篇指南。保留现有 URL、工具入口和永久重定向。改动位于本地工作区，尚未部署到生产环境。

## 结构调整

| 项目 | 已完成的调整 |
| --- | --- |
| 页面元数据 | 知识页、首页、博客目录、工具页、About 和 Contact 使用共享生成逻辑；逐页输出 canonical、索引规则、Open Graph 和 Twitter 标题描述。补齐默认分享封面，保留工具专用封面。 |
| 首页标题 | 使用绝对标题，避免模板再次追加品牌。 |
| 文章结构化数据 | Article/BlogPosting 与所解释的 DefinedTerm 分开；文章作者、发布者、网站使用稳定标识。相关页面以 WebPage 表示，引用采用 CreativeWork，避免把所有来源都标成图书。 |
| 集合页面 | Learn、Blog、Tools 输出 CollectionPage 与 ItemList。首页工具和指南分别使用 WebApplication、WebPage，并拥有不同的列表标识。 |
| 内容责任与日期 | 知识页显示共享编辑署名、原始发布日期、更新日期、来源入口；About 增加编辑责任、工具输出说明和纠错锚点。日期使用已有内容记录，六篇实质修订指南更新为本轮日期。 |
| 面包屑与语义 | 可见面包屑和 JSON-LD 共用去重逻辑，消除专题首页重复的 Overview 层级；清理页面内嵌套的 main。 |
| 内链与内容目录 | Learn 加入主导航和页脚。搜索及站点内容目录排除三个旧重定向地址；博客卡片直达规范地址。 |
| 抓取规则 | 各显式机器人分组统一保留 API/admin 抓取限制，并允许公开分享图片端点。 |
| 索引范围 | 原有 36 个允许索引地址增加四篇 Learn 页面，共 40 个。其他页面继续使用原有索引策略。 |

JSON-LD 序列化转义 `<`，避免文本中的脚本结束标签破坏结构化数据脚本。

## 六篇重点内容

| 页面 | 内容增量 |
| --- | --- |
| `/learn` | 增加基础学习、选择方法、核查来源三个入口，连接已有结果的后续阅读路径。 |
| `/learn/beginners-guide` | 增加可照做的练习表：记录输入、复制命盘、识别术语、说明解释范围；使用明确标注的甲子日柱教学例子。 |
| `/learn/which-system` | 用出生时辰未知、考虑新项目、改善书桌三个教学情景说明输入、输出和下一步。 |
| `/learn/resources` | 提供可直接打开的历法、古籍卷次、译本出版记录和算法约定资料，逐项说明资料能支持的判断。 |
| `/bazi` | 加入从计算结果到日主、月支、十神和历法约定的阅读顺序；收敛未经充分支持的历史和预测表述。 |
| `/bazi/what-is-bazi` | 增加甲子日柱拆解表、日干与日支区别、不同计算器产生差异的原因及 FAQ；替换不精确的历史年份与泛化人物引用。 |

六篇指南保留原有有效内容，移除自动插入的重复编辑引语。引用解析器不再把泛称 I Ching、投币方法或 Xu Ziping 自动指向并不对应的来源；Alfred Huang 译本改用具体出版社书目。

## 工具准确性

- **八字约定：** 对照源码和依赖作者文档，明确当前年柱使用农历新年边界，月柱使用节的日期边界。工具说明、About 和相关指南采用一致表述。本轮没有改动八字排盘的历法规则。
- **易经投币：** 原线性同余生成器使用最低位，而该位必定交替，导致结果受限且无法形成动爻。改用最高位，保留现有种子参数和返回结构。本轮未运行随机分布或算法单元测试。
- **解释范围：** 明确五行权重图和生肖配对分数属于规则展示；易经简短解读属于编辑概述。教学例子均标注为示例。

## 构建与页面检查记录

- 最终 `pnpm build` 成功，包含 TypeScript 编译，生成 261 个静态页面。
- 读取本地生产服务的 XML sitemap：40 个地址，40 个唯一地址。
- 读取这 40 个页面的 HTML：均为 HTTP 200；均有 canonical、`index, follow`、分享图片；均只有一个 h1 和一个 main。
- 检视 Article/DefinedTerm 分离、CollectionPage、首页两类 ItemList、作者标识及更新日期；专题首页面包屑没有重复 Overview。
- `/learn/chinese-vs-western-astrology`、`/search`、`/sitemap` 仍输出 `noindex, follow`。
- 三个旧地址仍返回 308，并指向原有正式规范地址。
- 桌面端 1440 × 1000 查看 Learn 页头及新增入口；手机端 390 × 844 查看八字页头、署名日期、示例表格。手机页面宽度为 390px，示例表格在局部容器内横向滚动，未撑宽页面。
- 本轮未新增或运行自动化测试套件。前两轮文档中的历史测试结果不代表本轮结果。

构建中的 Edge runtime 提示对应动态图片路由，不是构建失败。

## 依据与后续工作

内容修订遵循可核查来源、清楚的作者责任、实际帮助读者完成任务的方向，不以凑字数作为质量目标。参考 [Google 的实用内容说明](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)。

结构实现参考 [Article 结构化数据](https://developers.google.com/search/docs/appearance/structured-data/article)、[重复 URL 整合](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)及 [sitemap 与修改日期](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)文档。

本轮核对的内容资料：

- [Hong Kong Observatory 历法转换表](https://www.hko.gov.hk/en/gts/time/conversion.htm)
- [Lunar 库作者的干支边界说明](https://6tail.cn/calendar/lunar.ganzhi.html)
- [Chinese Text Project《三命通会》卷十](https://ctext.org/wiki.pl?chapter=721793&if=en&remap=gb)
- [Alfred Huang 译本出版社记录](https://www.innertraditions.com/books/the-complete-i-ching-10th-anniversary-edition-590)

40 个地址表示本站允许索引并写入 sitemap，不代表搜索引擎已经收录。实际曝光、收录和排名变化需要部署后的 Search Console 数据。本轮未取得新的线上数据。

后续内容批次应逐篇处理其余专题的历史、经典引文和实际例子，再决定是否扩大索引范围。八字的立春、交节时刻等规则可以作为独立功能迭代，避免在内容修订中无说明地改变既有排盘结果。
