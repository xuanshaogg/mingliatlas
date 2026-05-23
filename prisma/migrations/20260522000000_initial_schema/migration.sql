-- Migration: 20260522000000_initial_schema
-- Chinese Metaphysics GEO Site — initial database schema
-- Generated manually (prisma migrate dev requires a live DATABASE_URL;
-- run `pnpm prisma migrate dev` once Supabase credentials are set in .env.local)

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

CREATE TYPE "Category" AS ENUM (
  'BAZI',
  'ZIWEI',
  'ICHING',
  'FENGSHUI',
  'ZODIAC',
  'LEARN',
  'BLOG',
  'TOOLS',
  'GENERAL'
);

CREATE TYPE "SchemaType" AS ENUM (
  'ARTICLE',
  'FAQ',
  'HOWTO',
  'WEBAPP',
  'GLOSSARY'
);

CREATE TYPE "BlogCategory" AS ENUM (
  'BAZI_GUIDE',
  'ZIWEI_GUIDE',
  'ICHING_GUIDE',
  'FENGSHUI_GUIDE',
  'ZODIAC_FORECAST',
  'CELEBRITY_ANALYSIS',
  'CULTURE_COMPARISON',
  'LIFESTYLE'
);

CREATE TYPE "ChartType" AS ENUM (
  'BAZI',
  'ZIWEI'
);

CREATE TYPE "ToolType" AS ENUM (
  'BAZI_CALCULATOR',
  'ZIWEI_CALCULATOR',
  'ICHING_ORACLE',
  'COMPATIBILITY',
  'AI_CHAT'
);

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

-- Knowledge / landing pages for GEO content strategy
CREATE TABLE "Page" (
  "id"          TEXT         NOT NULL,
  "slug"        TEXT         NOT NULL,
  "title"       TEXT         NOT NULL,
  "description" TEXT         NOT NULL,
  "content"     TEXT         NOT NULL,
  "category"    "Category"   NOT NULL,
  "subCategory" TEXT,
  "schemaType"  "SchemaType" NOT NULL,
  "wordCount"   INTEGER,
  "seoTitle"    TEXT,
  "seoDesc"     TEXT,
  "ogImage"     TEXT,
  "published"   BOOLEAN      NOT NULL DEFAULT false,
  "publishedAt" TIMESTAMP(3),
  "updatedAt"   TIMESTAMP(3) NOT NULL,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "authorId"    TEXT,
  "views"       INTEGER      NOT NULL DEFAULT 0,

  CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- Blog articles for content marketing
CREATE TABLE "BlogPost" (
  "id"          TEXT           NOT NULL,
  "slug"        TEXT           NOT NULL,
  "title"       TEXT           NOT NULL,
  "excerpt"     TEXT           NOT NULL,
  "content"     TEXT           NOT NULL,
  "coverImage"  TEXT,
  "tags"        TEXT[]         NOT NULL DEFAULT ARRAY[]::TEXT[],
  "category"    "BlogCategory" NOT NULL,
  "published"   BOOLEAN        NOT NULL DEFAULT false,
  "publishedAt" TIMESTAMP(3),
  "updatedAt"   TIMESTAMP(3)   NOT NULL,
  "createdAt"   TIMESTAMP(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "views"       INTEGER        NOT NULL DEFAULT 0,

  CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- Email subscribers
CREATE TABLE "Subscriber" (
  "id"             TEXT         NOT NULL,
  "email"          TEXT         NOT NULL,
  "zodiacSign"     TEXT,
  "birthDate"      TIMESTAMP(3),
  "preferences"    JSONB,
  "verified"       BOOLEAN      NOT NULL DEFAULT false,
  "subscribedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "unsubscribedAt" TIMESTAMP(3),

  CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- Registered users (reserved for Phase 2 auth)
CREATE TABLE "User" (
  "id"         TEXT         NOT NULL,
  "email"      TEXT,
  "name"       TEXT,
  "avatarUrl"  TEXT,
  "birthDate"  TIMESTAMP(3),
  "birthTime"  TEXT,
  "birthPlace" TEXT,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Saved natal charts linked to a user
CREATE TABLE "Chart" (
  "id"        TEXT         NOT NULL,
  "userId"    TEXT         NOT NULL,
  "chartType" "ChartType"  NOT NULL,
  "chartData" JSONB        NOT NULL,
  "name"      TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- Anonymous AI-tool usage telemetry
CREATE TABLE "ToolUsage" (
  "id"        TEXT         NOT NULL,
  "toolType"  "ToolType"   NOT NULL,
  "input"     JSONB,
  "success"   BOOLEAN      NOT NULL,
  "duration"  INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ToolUsage_pkey" PRIMARY KEY ("id")
);

-- ---------------------------------------------------------------------------
-- Unique constraints
-- ---------------------------------------------------------------------------

CREATE UNIQUE INDEX "Page_slug_key"       ON "Page"("slug");
CREATE UNIQUE INDEX "BlogPost_slug_key"   ON "BlogPost"("slug");
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");
CREATE UNIQUE INDEX "User_email_key"      ON "User"("email");

-- ---------------------------------------------------------------------------
-- Foreign keys
-- ---------------------------------------------------------------------------

ALTER TABLE "Chart"
  ADD CONSTRAINT "Chart_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

-- ---------------------------------------------------------------------------
-- B-tree indexes
-- ---------------------------------------------------------------------------

CREATE INDEX "Page_slug_idx"        ON "Page"("slug");
CREATE INDEX "Page_category_idx"    ON "Page"("category");
CREATE INDEX "Page_published_idx"   ON "Page"("published");
CREATE INDEX "Page_publishedAt_idx" ON "Page"("publishedAt");

CREATE INDEX "BlogPost_slug_idx"        ON "BlogPost"("slug");
CREATE INDEX "BlogPost_publishedAt_idx" ON "BlogPost"("publishedAt");
CREATE INDEX "BlogPost_category_idx"    ON "BlogPost"("category");

CREATE INDEX "Subscriber_email_idx"   ON "Subscriber"("email");
CREATE INDEX "Subscriber_verified_idx" ON "Subscriber"("verified");

CREATE INDEX "User_email_idx" ON "User"("email");

CREATE INDEX "Chart_userId_idx"    ON "Chart"("userId");
CREATE INDEX "Chart_chartType_idx" ON "Chart"("chartType");

CREATE INDEX "ToolUsage_toolType_idx"  ON "ToolUsage"("toolType");
CREATE INDEX "ToolUsage_createdAt_idx" ON "ToolUsage"("createdAt");

-- ---------------------------------------------------------------------------
-- Full-text search (GIN) indexes on Page
-- ---------------------------------------------------------------------------

CREATE INDEX "idx_page_title_fts"
  ON "Page" USING gin(to_tsvector('english', "title"));

CREATE INDEX "idx_page_content_fts"
  ON "Page" USING gin(to_tsvector('english', "content"));
