import type { DashboardKpis } from "@/lib/metrics/kpi";

type KpiGridProps = {
  kpis: DashboardKpis;
};

export function KpiGrid({ kpis }: KpiGridProps) {
  const cards = [
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
    <>
      <section
        aria-label="KPI 卡片區"
        className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {cards.map((card) => (
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

      <p
        className="mb-4 text-[13px] text-on-background-muted"
        aria-label="課程完成率"
      >
        課程完成率（完課／總學員）：
        <b className="text-on-background">{kpis.courseCompletionRate}%</b>
        <span className="text-on-background-subtle">
          {" "}
          — Spec §15：四卡對齊設計稿「作品完成率」，課程完成率另列於此
        </span>
      </p>
    </>
  );
}
