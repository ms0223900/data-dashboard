import { mockStudents } from "@/lib/data/mock-students";
import { computeChapterProgress } from "@/lib/metrics/chapter-progress";
import { computeKpis } from "@/lib/metrics/kpi";

const PROJECT_STATUS_ROWS: { name: string; dotClass: string }[] = [
  { name: "尚未開始", dotClass: "bg-on-background-muted" },
  { name: "Build Sprint 中", dotClass: "bg-secondary" },
  { name: "已完成 MVP", dotClass: "bg-primary" },
  { name: "已發布", dotClass: "bg-success" },
];

export function DashboardPage() {
  const kpis = computeKpis(mockStudents);
  const chapterProgress = computeChapterProgress(mockStudents);

  const kpiCards = [
    { label: "總學員數", value: String(kpis.totalStudents), valueClass: "" },
    {
      label: "已開始學習",
      value: String(kpis.startedLearningCount),
      valueClass: "text-primary",
    },
    {
      label: "平均完成進度",
      value: `${kpis.averageProgressPercent}%`,
      valueClass: "text-primary",
    },
    {
      label: "作品完成率",
      value: `${kpis.projectCompletionRate}%`,
      valueClass: "text-success",
    },
  ] as const;

  return (
    <main className="mx-auto min-h-screen max-w-[1120px] px-6 py-8 pb-12">
      <header className="mb-7 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-[22px] font-bold tracking-tight text-on-background md:text-[26px]">
            課程學員數據儀表板
          </h1>
          <span className="inline-flex items-center rounded-full bg-secondary-soft px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-secondary">
            Demo／假資料版
          </span>
        </div>
        <p className="m-0 text-[15px] text-on-background">
          觀察學員是否跟上課程，並完成自己的 MVP
        </p>
        <p className="m-0 text-[13px] text-on-background-muted">
          資料狀態：Mock data（{kpis.totalStudents} 筆）｜最後更新：展示用假資料
        </p>
      </header>

      <section
        aria-label="KPI 卡片區"
        className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className="flex flex-col gap-1.5 rounded-xl border border-border bg-card px-4 py-[18px]"
          >
            <span className="text-[13px] font-medium text-on-background-muted">
              {card.label}
            </span>
            <span
              className={`text-[30px] font-bold tracking-tight text-on-background ${card.valueClass}`}
            >
              {card.value}
            </span>
          </div>
        ))}
      </section>

      <p className="mb-4 text-[13px] text-on-background-muted" aria-label="課程完成率">
        課程完成率（完課／總學員）：
        <b className="text-on-background">{kpis.courseCompletionRate}%</b>
        <span className="text-on-background-subtle">
          {" "}
          — Spec §15：四卡對齊設計稿「作品完成率」，課程完成率另列於此
        </span>
      </p>

      <section className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-[1.3fr_1fr]">
        <div
          aria-label="章節進度圖表"
          className="rounded-xl border border-border bg-card p-5"
        >
          <h2 className="mb-4 text-[15px] font-bold text-on-background">
            章節進度分布
          </h2>
          <div className="flex flex-col gap-3">
            {chapterProgress.map((chapter) => (
              <div
                key={chapter.chapterId}
                className="grid grid-cols-[84px_1fr_40px] items-center gap-2.5 md:grid-cols-[96px_1fr_44px]"
              >
                <span className="truncate text-[13px] text-on-background">
                  {chapter.chapterName}
                </span>
                <div className="h-2.5 overflow-hidden rounded-full bg-background-alt">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${chapter.completionRate}%` }}
                    aria-hidden
                  />
                </div>
                <span className="text-right text-[13px] font-semibold text-on-background">
                  {chapter.completionRate}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          aria-label="作品完成狀態圖表"
          className="rounded-xl border border-border bg-card p-5"
        >
          <h2 className="mb-4 text-[15px] font-bold text-on-background">
            作品完成狀態
          </h2>
          <div>
            {PROJECT_STATUS_ROWS.map((status, index) => (
              <div
                key={status.name}
                className={`flex items-center justify-between py-2.5 ${
                  index < PROJECT_STATUS_ROWS.length - 1
                    ? "border-b border-border"
                    : "pb-0"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${status.dotClass}`}
                    aria-hidden
                  />
                  <span className="text-[13.5px] text-on-background">
                    {status.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-on-background-muted">
                  —
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 text-[15px] font-bold text-on-background">
            課程學習成效摘要
          </h2>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            <li className="relative pl-3.5 text-[13.5px] text-on-background before:absolute before:top-[7px] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
              已開始學習：
              <b>
                {kpis.startedLearningCount}／{kpis.totalStudents} 人
              </b>
            </li>
            <li className="relative pl-3.5 text-[13.5px] text-on-background before:absolute before:top-[7px] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
              平均完成進度：<b>{kpis.averageProgressPercent}%</b>
            </li>
            <li className="relative pl-3.5 text-[13.5px] text-on-background before:absolute before:top-[7px] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
              課程完成率：<b>{kpis.courseCompletionRate}%</b>
            </li>
            <li className="relative pl-3.5 text-[13.5px] text-on-background before:absolute before:top-[7px] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-secondary">
              作品完成率：<b>{kpis.projectCompletionRate}%</b>
            </li>
          </ul>
        </div>

        <div
          aria-label="學員列表入口"
          className="flex flex-col justify-between rounded-xl border border-border bg-primary-soft p-5"
        >
          <div>
            <h2 className="mb-2 text-[15px] font-bold text-on-background">
              學員列表
            </h2>
            <p className="mb-4 text-[13px] leading-relaxed text-on-background-muted">
              從整體數字回到個別學員，篩選學習狀態、作品狀態與完成進度。
            </p>
          </div>
          <span className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-primary px-[18px] py-[11px] text-sm font-semibold text-white">
            查看與篩選學員 →
          </span>
        </div>
      </section>

      <footer className="rounded-xl border border-border bg-card px-5 py-4 text-[12.5px] leading-relaxed text-on-background-muted">
        <b className="text-on-background">教學展示重點：</b>
        首頁先回答三個問題──有沒有開始學、完成到哪裡、有沒有做出作品；KPI、章節進度與作品狀態皆來自同一組假資料計算；「Demo／假資料版」標示清楚可見，避免觀眾誤以為已完成真實資料串接。
      </footer>
    </main>
  );
}
