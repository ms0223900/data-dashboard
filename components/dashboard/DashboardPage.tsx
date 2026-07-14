import Link from "next/link";

import { ChapterProgressChart } from "@/components/dashboard/ChapterProgressChart";
import { KpiGrid } from "@/components/dashboard/KpiGrid";
import { ProjectStatusChart } from "@/components/dashboard/ProjectStatusChart";
import { ReportSummarySection } from "@/components/dashboard/ReportSummarySection";
import { DataSourceRoadmapSection } from "@/components/dashboard/DataSourceRoadmapSection";
import { mockStudents } from "@/lib/data/mock-students";
import { computeChapterProgress } from "@/lib/metrics/chapter-progress";
import { computeKpis } from "@/lib/metrics/kpi";
import { computeProjectStatusSummary } from "@/lib/metrics/project-status";

export function DashboardPage() {
  const kpis = computeKpis(mockStudents);
  const chapterProgress = computeChapterProgress(mockStudents);
  const projectStatusSummary = computeProjectStatusSummary(mockStudents);

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

      <KpiGrid kpis={kpis} />

      <section className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-[1.3fr_1fr]">
        <ChapterProgressChart chapters={chapterProgress} />
        <ProjectStatusChart rows={projectStatusSummary} />
      </section>

      <section className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ReportSummarySection
          kpis={kpis}
          chapters={chapterProgress}
          projectStatusSummary={projectStatusSummary}
        />

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
          <Link
            href="/students"
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-primary px-[18px] py-[11px] text-sm font-semibold text-white hover:bg-primary-hover"
          >
            查看與篩選學員 →
          </Link>
        </div>
      </section>

      <DataSourceRoadmapSection />

      <footer className="rounded-xl border border-border bg-card px-5 py-4 text-[12.5px] leading-relaxed text-on-background-muted">
        <b className="text-on-background">教學展示重點：</b>
        首頁先回答三個問題──有沒有開始學、完成到哪裡、有沒有做出作品；KPI、章節進度與作品狀態皆來自同一組假資料計算；「Demo／假資料版」標示清楚可見，避免觀眾誤以為已完成真實資料串接。
      </footer>
    </main>
  );
}
