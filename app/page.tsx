export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-on-background">
          Data Dashboard
        </h1>
        <p className="mt-4 text-lg text-on-background-muted">
          數據儀表板 — Coming Soon
        </p>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-on-background-muted">
          <span className="inline-block h-2 w-2 rounded-full bg-success" />
          專案初始化完成，準備開始開發
        </div>
      </div>
    </main>
  );
}
