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
      const learnRow = qualityBaseline
        .split("\n")
        .find((row) => row.startsWith('"/learn","Learn"'));

      expect(output).toContain("audit-summary.md updated");
      expect(names).toEqual([...trackedArtifacts].sort());
      expect(learnRow).toContain('"/learn","Learn","hub","no"');
      expect(await readFile(join(outputDir, "audit-summary.md"), "utf8")).toContain(
        "# Audit Summary — Content Quality Baseline",
      );
    } finally {
      await rm(outputDir, { recursive: true, force: true });
    }
  });
});
