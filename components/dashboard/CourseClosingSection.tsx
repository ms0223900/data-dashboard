import Link from "next/link";

import { CHAPTER_NAMES } from "@/lib/types/student";

export function CourseClosingSection() {
  return (
    <section
      aria-label="課程總結展示"
      className="rounded-xl border border-border bg-card p-5 md:p-6"
    >
      <p className="m-0 text-xs font-semibold tracking-wide text-secondary">
        C-1 課程收束｜畢業完成感
      </p>
      <h2 className="mt-1.5 mb-2 text-[18px] font-bold tracking-tight text-on-background md:text-[20px]">
        成效不能只看報名人數
      </h2>
      <p className="m-0 mb-4 max-w-[52rem] text-[13.5px] leading-relaxed text-on-background-muted">
        這份 Dashboard
        示範的是：用同一組資料回答學員有沒有開始學、有沒有跟上章節、有沒有真正做出作品——也就是把想法變成可上線產品的完整旅程。
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-primary-soft px-4 py-3">
          <p className="m-0 text-[12px] font-semibold text-primary">問題 1</p>
          <p className="m-0 mt-1 text-[13.5px] font-bold text-on-background">
            有沒有開始學？
          </p>
          <p className="m-0 mt-1 text-[12px] text-on-background-muted">
            看 KPI：已開始學習、平均完成進度
          </p>
        </div>
        <div className="rounded-lg border border-border bg-primary-soft px-4 py-3">
          <p className="m-0 text-[12px] font-semibold text-primary">問題 2</p>
          <p className="m-0 mt-1 text-[13.5px] font-bold text-on-background">
            有沒有跟上章節？
          </p>
          <p className="m-0 mt-1 text-[12px] text-on-background-muted">
            看章節進度分布與卡點落差
          </p>
        </div>
        <div className="rounded-lg border border-border bg-success-bg px-4 py-3">
          <p className="m-0 text-[12px] font-semibold text-success">問題 3</p>
          <p className="m-0 mt-1 text-[13.5px] font-bold text-on-background">
            有沒有做出作品？
          </p>
          <p className="m-0 mt-1 text-[12px] text-on-background-muted">
            看作品狀態：Build Sprint／MVP／已發布
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="m-0 mb-2 text-[12.5px] font-semibold text-on-background">
          學習旅程回扣
        </p>
        <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
          {CHAPTER_NAMES.map((step, index) => (
            <li key={step} className="flex items-center gap-1.5">
              <span className="rounded-full bg-background-alt px-2.5 py-1 text-[12px] font-semibold text-on-background">
                {step}
              </span>
              {index < CHAPTER_NAMES.length - 1 ? (
                <span className="text-on-background-subtle" aria-hidden>
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-dashed border-border bg-card-muted px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 text-[12.5px] leading-relaxed text-on-background-muted">
          <b className="text-on-background">展示路徑：</b>
          總覽 KPI → 章節／作品圖表 → 報表摘要 →{" "}
          <Link
            href="/students"
            className="font-semibold text-primary hover:underline"
          >
            學員列表篩選
          </Link>
          （可試「已完成 MVP」或「已發布」，對齊報表「已完成或發布」人數）→
          返回總覽看本段收束。從想法到作品，你也走完了。
        </p>
        <p className="m-0 shrink-0 text-[13px] font-bold text-on-background">
          恭喜完成 Build Sprint
        </p>
      </div>
    </section>
  );
}
