-- Persist public contact form submissions instead of acknowledging and discarding them.
CREATE TABLE "ContactMessage" (
  "id"         TEXT         NOT NULL,
  "name"       TEXT         NOT NULL,
  "email"      TEXT         NOT NULL,
  "message"    TEXT         NOT NULL,
  "status"     TEXT         NOT NULL DEFAULT 'new',
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"  TIMESTAMP(3) NOT NULL,
  "resolvedAt" TIMESTAMP(3),

  CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ContactMessage_email_idx" ON "ContactMessage"("email");
CREATE INDEX "ContactMessage_status_idx" ON "ContactMessage"("status");
CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");
