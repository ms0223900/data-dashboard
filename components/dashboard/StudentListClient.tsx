"use client";

import { useState } from "react";

import { StudentListEmpty } from "@/components/dashboard/StudentListEmpty";
import { StudentTable } from "@/components/dashboard/StudentTable";
import {
  DEFAULT_STUDENT_FILTERS,
  filterStudents,
  type ProgressRangeId,
  type StudentListFilters,
} from "@/lib/filters/students";
import {
  LEARNING_STATUS_LABELS,
  PROJECT_STATUS_LABELS,
} from "@/lib/labels/student-status";
import {
  LEARNING_STATUSES,
  PROJECT_STATUSES,
  type Student,
} from "@/lib/types/student";

type StudentListClientProps = {
  students: Student[];
};

const selectClassName =
  "min-h-10 w-full appearance-none rounded-lg border border-border bg-card-muted bg-[length:10px_6px] bg-[position:right_12px_center] bg-no-repeat px-3 py-2.5 pr-8 text-sm text-on-background";

const selectBackgroundImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='%237D7A75' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>")`;

const PROGRESS_RANGE_OPTIONS: { value: ProgressRangeId; label: string }[] = [
  { value: "0-25", label: "0–25%" },
  { value: "26-50", label: "26–50%" },
  { value: "51-75", label: "51–75%" },
  { value: "76-100", label: "76–100%" },
];

export function StudentListClient({ students }: StudentListClientProps) {
  const [filters, setFilters] = useState<StudentListFilters>(
    DEFAULT_STUDENT_FILTERS,
  );

  const filtered = filterStudents(students, filters);

  function resetFilters() {
    setFilters(DEFAULT_STUDENT_FILTERS);
  }

  return (
    <div>
      <div className="mb-5 rounded-xl border border-border bg-card p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="flex min-w-[150px] flex-1 flex-col gap-1.5">
            <label
              htmlFor="filter-learn"
              className="text-xs font-semibold text-on-background-muted"
            >
              學習狀態
            </label>
            <select
              id="filter-learn"
              value={filters.learningStatus}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  learningStatus: event.target
                    .value as StudentListFilters["learningStatus"],
                }))
              }
              className={selectClassName}
              style={{ backgroundImage: selectBackgroundImage }}
            >
              <option value="all">全部</option>
              {LEARNING_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {LEARNING_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex min-w-[150px] flex-1 flex-col gap-1.5">
            <label
              htmlFor="filter-work"
              className="text-xs font-semibold text-on-background-muted"
            >
              作品狀態
            </label>
            <select
              id="filter-work"
              value={filters.projectStatus}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  projectStatus: event.target
                    .value as StudentListFilters["projectStatus"],
                }))
              }
              className={selectClassName}
              style={{ backgroundImage: selectBackgroundImage }}
            >
              <option value="all">全部</option>
              {PROJECT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {PROJECT_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex min-w-[150px] flex-1 flex-col gap-1.5">
            <label
              htmlFor="filter-progress"
              className="text-xs font-semibold text-on-background-muted"
            >
              完成進度
            </label>
            <select
              id="filter-progress"
              value={filters.progressRange}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  progressRange: event.target
                    .value as StudentListFilters["progressRange"],
                }))
              }
              className={selectClassName}
              style={{ backgroundImage: selectBackgroundImage }}
            >
              <option value="all">全部</option>
              {PROGRESS_RANGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="min-h-10 w-full rounded-lg border border-border bg-card-muted px-4 text-sm font-semibold text-on-background hover:bg-background-alt sm:w-auto"
          >
            重設
          </button>
        </div>
      </div>

      <p className="mb-3 text-[13px] text-on-background-muted">
        目前顯示：
        <strong className="text-on-background">{filtered.length}</strong>{" "}
        位學員
      </p>

      {filtered.length === 0 ? (
        <StudentListEmpty onClear={resetFilters} />
      ) : (
        <StudentTable students={filtered} />
      )}
    </div>
  );
}
