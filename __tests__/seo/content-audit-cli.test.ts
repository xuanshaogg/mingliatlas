import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const script = join(root, "scripts/audit-current-content.mjs");
const trackedAuditDir = join(root, "docs/audit-2026-05");
const trackedArtifacts = [
  "audit-summary.md",
  "content-quality-baseline.csv",
  "entity-coverage.csv",
  "intent-gap-list.csv",
  "priority-action-list.csv",
  "section-quality-summary.csv",
];

async function artifactContents(directory: string): Promise<Map<string, string>> {
  return new Map(
    await Promise.all(
      trackedArtifacts.map(async (name) => [name, await readFile(join(directory, name), "utf8")] as const),
    ),
  );
}

function parseCsvRow(row: string): string[] {
  return [...row.matchAll(/"((?:[^"]|"")*)"(?:,|$)/g)].map((match) =>
    match[1].replace(/""/g, '"'),
  );
}

describe("current-content audit CLI", () => {
  it("is read-only unless write mode is explicit", async () => {
    const before = await artifactContents(trackedAuditDir);
    const output = execFileSync(process.execPath, [script], { cwd: root, encoding: "utf8" });
    const after = await artifactContents(trackedAuditDir);

    expect(output).toContain("Content audit (read-only)");
    expect(output).toContain("No files written");
    expect(after).toEqual(before);
  });

  it("writes a complete report set to an explicit output directory", async () => {
    const outputDir = await mkdtemp(join(tmpdir(), "mingliatlas-content-audit-"));

    try {
      const output = execFileSync(
        process.execPath,
        [script, "--write", "--output-dir", outputDir],
        { cwd: root, encoding: "utf8" },
      );
      const names = (await readdir(outputDir)).sort();
      const qualityBaseline = await readFile(join(outputDir, "content-quality-baseline.csv"), "utf8");
      const qualityLines = qualityBaseline.split("\n");
      const qualityHeader = parseCsvRow(qualityLines[0]);
      const qualityByPath = new Map(
        qualityLines.slice(1).map((row) => {
          const values = parseCsvRow(row);
          return [
            values[qualityHeader.indexOf("path")],
            Object.fromEntries(qualityHeader.map((field, index) => [field, values[index]])),
          ] as const;
        }),
      );
      const learnRow = qualityBaseline
        .split("\n")
        .find((row) => row.startsWith('"/learn","Learn"'));
      const learnRows = qualityBaseline.split("\n").filter((row) => row.startsWith('"/learn'));

      expect(output).toContain("audit-summary.md updated");
      expect(names).toEqual([...trackedArtifacts].sort());
      expect(learnRow).toContain('"/learn","Learn","hub","no"');
      expect(learnRows).toHaveLength(6);
      expect(learnRows.every((row) => row.endsWith('"92","A","monitor"'))).toBe(true);
      expect(qualityByPath.get("/chinese-zodiac")).toMatchObject({
        indexable: "yes",
        faqs: "5",
        citations: "4",
        score: "92",
        grade: "A",
        action: "monitor",
      });
      expect(qualityByPath.get("/blog/i-ching-beginners-reading-guide")).toMatchObject({
        indexable: "yes",
        faqs: "4",
        citations: "2",
        score: "88",
        grade: "A",
      });
      const summary = await readFile(join(outputDir, "audit-summary.md"), "utf8");
      expect(summary).toContain("# Audit Summary — Content Quality Baseline");
      expect(summary).toContain("| Indexable content pages | 15 |");
      expect(summary).toContain("| Indexable average quality score | 87 |");
      expect(summary).toContain("| Indexable pages below A | 3 |");
    } finally {
      await rm(outputDir, { recursive: true, force: true });
    }
  });
});
