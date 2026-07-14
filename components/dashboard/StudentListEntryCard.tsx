import Link from "next/link";

export function StudentListEntryCard() {
  return (
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
  );
}
