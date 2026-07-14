import type { ProjectStatus, ProjectStatusSummary } from "@/lib/types/student";

const PROJECT_STATUS_DOT: Record<ProjectStatus, string> = {
  "Not started": "bg-on-background-muted",
  "Build Sprint": "bg-secondary",
  "MVP completed": "bg-primary",
  Published: "bg-success",
};

type ProjectStatusChartProps = {
  rows: ProjectStatusSummary[];
};

export function ProjectStatusChart({ rows }: ProjectStatusChartProps) {
  return (
    <div
      aria-label="作品完成狀態圖表"
      className="rounded-xl border border-border bg-card p-5"
    >
      <h2 className="mb-4 text-[15px] font-bold text-on-background">
        作品完成狀態
      </h2>
      <div>
        {rows.map((row, index) => (
          <div
            key={row.status}
            className={`flex items-center justify-between py-2.5 ${
              index < rows.length - 1 ? "border-b border-border" : "pb-0"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${PROJECT_STATUS_DOT[row.status]}`}
                aria-hidden
              />
              <span className="text-[13.5px] text-on-background">
                {row.label}
              </span>
            </div>
            <span className="text-sm font-bold text-on-background">
              {row.count}（{row.percentage}%）
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
