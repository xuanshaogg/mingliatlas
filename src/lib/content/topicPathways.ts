import type { RelatedLink } from "@/components/shared/RelatedLinks";

export interface TopicPathway {
  heading: string;
  introduction: string;
  links: RelatedLink[];
}

// Curated task sequences for topic hubs. Plain links are rendered on the server.
export const topicPathways: Record<string, TopicPathway> = {
  "/bazi": {
    heading: "Learn Bazi from a chart to its relationships",
    introduction:
      "Start with the notation, calculate one chart, then follow the relationships around its day stem.",
    links: [
      {
        title: "Understand the eight characters",
        href: "/bazi/what-is-bazi",
        description: "Read a worked day-pillar example and distinguish the stem from the branch.",
      },
      {
        title: "Build a Four Pillars chart",
        href: "/tools/bazi-calculator",
        description: "Record the input and calendar convention alongside the result.",
      },
      {
        title: "Identify your Day Master",
        href: "/blog/day-master-bazi-complete-guide",
        description: "Find the day stem and use it as the reference point for the other symbols.",
      },
      {
        title: "Read Five Element relationships",
        href: "/bazi/five-elements",
        description:
          "Compare generating and controlling relationships before interpreting a total.",
      },
      {
        title: "Translate the Ten Gods",
        href: "/bazi/ten-gods",
        description: "Connect an element and its polarity to the Day Master.",
      },
      {
        title: "Study Luck Pillars",
        href: "/bazi/luck-pillars",
        description: "Add the timing layer after the natal chart and its assumptions are clear.",
      },
    ],
  },
  "/i-ching": {
    heading: "Choose the next step in your I Ching reading",
    introduction:
      "The casting method, reference directory and interpretation guide answer different parts of the same task.",
    links: [
      {
        title: "Learn the eight trigrams",
        href: "/i-ching/eight-trigrams",
        description: "Identify the lower and upper three-line figures.",
      },
      {
        title: "Cast with three coins",
        href: "/i-ching/how-to-cast",
        description: "Use the 6, 7, 8 and 9 line values and record lines from bottom to top.",
      },
      {
        title: "Find any of the 64 hexagrams",
        href: "/i-ching/sixty-four-hexagrams",
        description: "Browse by number, name and trigram pair in the King Wen sequence.",
      },
      {
        title: "Read a result step by step",
        href: "/blog/i-ching-beginners-reading-guide",
        description: "Keep the question, primary figure and changing lines together.",
      },
      {
        title: "Understand changing lines",
        href: "/i-ching/changing-lines",
        description: "Separate the cast figure from the figure formed by moving lines.",
      },
      {
        title: "Open the I Ching oracle",
        href: "/tools/i-ching-oracle",
        description: "Use a browser casting or enter your own recorded lines.",
      },
    ],
  },
  "/chinese-zodiac": {
    heading: "Use a zodiac sign in context",
    introduction:
      "Identify the year boundary first, then compare the traditional branch relationships with the full calendar framework.",
    links: [
      {
        title: "Read the compatibility chart",
        href: "/blog/chinese-zodiac-compatibility-chart",
        description: "Compare all harmony pairs, triads and clashes in one reference.",
      },
      {
        title: "Compare two animal signs",
        href: "/tools/zodiac-compatibility",
        description: "See the category behind a pair and prompts for discussing it.",
      },
      {
        title: "Understand Earthly Branches",
        href: "/bazi/earthly-branches",
        description: "See how animal labels connect to calendar cycles and seasonal context.",
      },
      {
        title: "Go from a year sign to Four Pillars",
        href: "/bazi/what-is-bazi",
        description: "Distinguish the year animal from the Day Master and the complete chart.",
      },
    ],
  },
  "/feng-shui": {
    heading: "Start with the space you use every day",
    introduction:
      "Choose one room or work surface, record what is difficult to use, and work through its layout before adding symbolic layers.",
    links: [
      {
        title: "Follow the path through a room",
        href: "/feng-shui/qi-flow",
        description: "Observe entrances, obstructions, light and everyday movement.",
      },
      {
        title: "Review a bedroom layout",
        href: "/feng-shui/home/bedroom",
        description: "Consider bed support, privacy and the practical requirements of rest.",
      },
      {
        title: "Position an office desk",
        href: "/feng-shui/office/desk",
        description: "Compare sightlines, support and access around the work surface.",
      },
      {
        title: "Understand the Bagua map",
        href: "/feng-shui/bagua-map",
        description:
          "Identify which mapping convention a guide uses before applying its directions.",
      },
    ],
  },
  "/ziwei": {
    heading: "Build a Ziwei reading in layers",
    introduction:
      "Learn the chart structure before applying star descriptions to a person or a timing period.",
    links: [
      {
        title: "Locate the twelve palaces",
        href: "/ziwei/twelve-palaces",
        description: "Understand the chart's life-area framework and relationships.",
      },
      {
        title: "Identify the major stars",
        href: "/ziwei/major-stars",
        description: "Read a star together with its palace and surrounding configuration.",
      },
      {
        title: "Compare Ziwei with Bazi",
        href: "/ziwei/ziwei-vs-bazi",
        description: "Keep the two calculation systems and reading methods distinct.",
      },
      {
        title: "Check sources and editions",
        href: "/learn/resources",
        description: "Record where a rule comes from and which part is an interpretation.",
      },
    ],
  },
};
