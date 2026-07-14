type FilterOption = {
  value: string;
  label: string;
};

type StudentFilterSelectProps = {
  id: string;
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
};

const SELECT_CLASS =
  "min-h-10 w-full appearance-none rounded-lg border border-border bg-card-muted bg-[length:10px_6px] bg-[position:right_12px_center] bg-no-repeat px-3 py-2.5 pr-8 text-sm text-on-background";

const SELECT_CHEVRON = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='%237D7A75' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>")`;

export function StudentFilterSelect({
  id,
  label,
  value,
  options,
  onChange,
}: StudentFilterSelectProps) {
  return (
    <div className="flex min-w-[150px] flex-1 flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-on-background-muted"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={SELECT_CLASS}
        style={{ backgroundImage: SELECT_CHEVRON }}
      >
        <option value="all">全部</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
