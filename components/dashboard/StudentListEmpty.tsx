type StudentListEmptyProps = {
  onClear: () => void;
};

export function StudentListEmpty({ onClear }: StudentListEmptyProps) {
  return (
    <div
      aria-label="篩選空狀態"
      className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card px-6 py-14 text-center"
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-full bg-background-alt text-lg"
        aria-hidden
      >
        🔍
      </div>
      <p className="m-0 text-sm text-on-background-muted">
        沒有符合目前篩選條件的學員
      </p>
      <button
        type="button"
        onClick={onClear}
        className="min-h-10 rounded-lg border border-border bg-card-muted px-4 text-sm font-semibold text-on-background hover:bg-background-alt"
      >
        清除篩選
      </button>
    </div>
  );
}
