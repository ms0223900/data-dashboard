const STEPS = [
  {
    title: "現在：Mock data",
    body: "用假資料驗證畫面、指標與篩選流程，確認 Dashboard 能回答「有沒有開始學、跟上章節、做出作品」。",
  },
  {
    title: "下一步：Google Sheet",
    body: "把同一組欄位改由試算表維護；Dashboard 讀取格式不變，即可換成真實學員進度。",
  },
  {
    title: "也可以：資料庫",
    body: "之後若改接資料庫或 API，只要回傳相同學員資料形狀，KPI、圖表與列表結構不必重做。",
  },
] as const;

export function DataSourceRoadmapSection() {
  return (
    <section
      aria-label="後續串接說明區"
      className="mb-4 rounded-xl border border-border bg-card p-5"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h2 className="m-0 text-[15px] font-bold text-on-background">
          後續資料串接規劃
        </h2>
        <span className="inline-flex items-center rounded-full bg-secondary-soft px-2.5 py-1 text-[11px] font-semibold text-secondary">
          僅說明｜未串真實 API
        </span>
      </div>

      <p className="m-0 mb-4 text-[13px] leading-relaxed text-on-background-muted">
        先確認畫面與指標是否好用；資料來源可以之後再換。目前是 Demo／假資料版，不是已完成
        Google Sheet 或資料庫串接的成品。
      </p>

      <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="rounded-lg border border-border bg-card-muted p-4"
          >
            <p className="m-0 text-[11px] font-semibold tracking-wide text-primary">
              STEP {index + 1}
            </p>
            <h3 className="mt-1.5 mb-1.5 text-[13.5px] font-bold text-on-background">
              {step.title}
            </h3>
            <p className="m-0 text-[12.5px] leading-relaxed text-on-background-muted">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
