import type { ChapterProgress } from "@/lib/types/student";

type ChapterProgressChartProps = {
  chapters: ChapterProgress[];
};

export function ChapterProgressChart({ chapters }: ChapterProgressChartProps) {
  return (
    <div
      aria-label="章節進度圖表"
      className="rounded-xl border border-border bg-card p-5"
    >
      <h2 className="mb-4 text-[15px] font-bold text-on-background">
        章節進度分布
      </h2>
      <div className="flex flex-col gap-3">
        {chapters.map((chapter) => (
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
  );
}
