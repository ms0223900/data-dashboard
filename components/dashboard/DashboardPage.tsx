import { ChapterProgressChart } from "@/components/dashboard/ChapterProgressChart";
import { CourseClosingSection } from "@/components/dashboard/CourseClosingSection";
import { DataSourceRoadmapSection } from "@/components/dashboard/DataSourceRoadmapSection";
import { KpiGrid } from "@/components/dashboard/KpiGrid";
import { ProjectStatusChart } from "@/components/dashboard/ProjectStatusChart";
import { ReportSummarySection } from "@/components/dashboard/ReportSummarySection";
import { StudentListEntryCard } from "@/components/dashboard/StudentListEntryCard";
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
        <StudentListEntryCard />
      </section>

      <DataSourceRoadmapSection />

      <CourseClosingSection />
    </main>
  );
}
