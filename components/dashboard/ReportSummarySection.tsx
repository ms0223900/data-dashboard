import type { ChapterProgress, ProjectStatusSummary } from "@/lib/types/student";
import type { DashboardKpis } from "@/lib/metrics/kpi";

type ReportSummarySectionProps = {
  kpis: DashboardKpis;
  chapters: ChapterProgress[];
  projectStatusSummary: ProjectStatusSummary[];
};

function findChapterRate(
  chapters: ChapterProgress[],
  chapterName: ChapterProgress["chapterName"],
): number | null {
  const found = chapters.find((c) => c.chapterName === chapterName);
  return found ? found.completionRate : null;
}

export function ReportSummarySection({
  kpis,
  chapters,
  projectStatusSummary,
}: ReportSummarySectionProps) {
  const projectDoneCount = projectStatusSummary
    .filter(
      (row) =>
        row.status === "MVP completed" || row.status === "Published",
    )
    .reduce((sum, row) => sum + row.count, 0);

  const specRate = findChapterRate(chapters, "Spec");
  const buildSprintRate = findChapterRate(chapters, "Build Sprint");
  const focusHint =
    specRate !== null &&
    buildSprintRate !== null &&
    buildSprintRate < specRate
      ? "Build Sprint 支援"
      : "章節進度追蹤";

  return (
    <section
      aria-label="報表展示區"
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="m-0 text-xs font-semibold tracking-wide text-on-background-muted uppercase">
            報表展示
          </p>
          <h2 className="mt-1 mb-0 text-[15px] font-bold text-on-background">
            課程學習成效摘要
          </h2>
          <p className="m-0 mt-1 text-[12.5px] text-on-background-muted">
            本週重點摘要｜適合截圖或錄影回顧（Demo 展示用）
          </p>
        </div>
        <button
          type="button"
          disabled
          title="MVP 不實作真實匯出"
          className="min-h-9 cursor-not-allowed rounded-lg border border-border bg-card-muted px-3 text-[12.5px] font-semibold text-on-background-subtle"
        >
          匯出週報（示範）
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-card-muted px-3 py-2.5">
          <p className="m-0 text-[11px] text-on-background-muted">已開始學習</p>
          <p className="m-0 mt-1 text-lg font-bold text-on-background">
            {kpis.startedLearningCount}/{kpis.totalStudents}
          </p>
        </div>
        <div className="rounded-lg bg-card-muted px-3 py-2.5">
          <p className="m-0 text-[11px] text-on-background-muted">平均進度</p>
          <p className="m-0 mt-1 text-lg font-bold text-primary">
            {kpis.averageProgressPercent}%
          </p>
        </div>
        <div className="rounded-lg bg-card-muted px-3 py-2.5">
          <p className="m-0 text-[11px] text-on-background-muted">課程完成率</p>
          <p className="m-0 mt-1 text-lg font-bold text-on-background">
            {kpis.courseCompletionRate}%
          </p>
        </div>
        <div className="rounded-lg bg-card-muted px-3 py-2.5">
          <p className="m-0 text-[11px] text-on-background-muted">作品完成率</p>
          <p className="m-0 mt-1 text-lg font-bold text-success">
            {kpis.projectCompletionRate}%
          </p>
        </div>
      </div>

      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        <li className="relative pl-3.5 text-[13.5px] text-on-background before:absolute before:top-[7px] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
          本週重點：已開始學習{" "}
          <b>
            {kpis.startedLearningCount}／{kpis.totalStudents}
          </b>{" "}
          人，平均完成進度 <b>{kpis.averageProgressPercent}%</b>
        </li>
        <li className="relative pl-3.5 text-[13.5px] text-on-background before:absolute before:top-[7px] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
          已完成或發布作品：<b>{projectDoneCount} 人</b>
          （作品完成率 {kpis.projectCompletionRate}%）
        </li>
        <li className="relative pl-3.5 text-[13.5px] text-on-background before:absolute before:top-[7px] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-secondary">
          建議聚焦：<b>{focusHint}</b>
          {specRate !== null && buildSprintRate !== null ? (
            <span className="text-on-background-muted">
              {" "}
              （Spec {specRate}% → Build Sprint {buildSprintRate}%）
            </span>
          ) : null}
        </li>
      </ul>
    </section>
  );
}
