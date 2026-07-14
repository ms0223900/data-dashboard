"use client";

import { useState } from "react";

import { StudentFilterSelect } from "@/components/dashboard/StudentFilterSelect";
import { StudentListEmpty } from "@/components/dashboard/StudentListEmpty";
import { StudentTable } from "@/components/dashboard/StudentTable";
import {
  DEFAULT_STUDENT_FILTERS,
  PROGRESS_RANGE_OPTIONS,
  filterStudents,
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

const LEARNING_OPTIONS = LEARNING_STATUSES.map((status) => ({
  value: status,
  label: LEARNING_STATUS_LABELS[status],
}));

const PROJECT_OPTIONS = PROJECT_STATUSES.map((status) => ({
  value: status,
  label: PROJECT_STATUS_LABELS[status],
}));

export function StudentListClient({ students }: StudentListClientProps) {
  const [filters, setFilters] = useState<StudentListFilters>(
    DEFAULT_STUDENT_FILTERS,
  );

  const filtered = filterStudents(students, filters);

  function updateFilter<K extends keyof StudentListFilters>(
    key: K,
    value: StudentListFilters[K],
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters(DEFAULT_STUDENT_FILTERS);
  }

  return (
    <div>
      <div className="mb-5 rounded-xl border border-border bg-card p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <StudentFilterSelect
            id="filter-learn"
            label="學習狀態"
            value={filters.learningStatus}
            options={LEARNING_OPTIONS}
            onChange={(value) =>
              updateFilter(
                "learningStatus",
                value as StudentListFilters["learningStatus"],
              )
            }
          />
          <StudentFilterSelect
            id="filter-work"
            label="作品狀態"
            value={filters.projectStatus}
            options={PROJECT_OPTIONS}
            onChange={(value) =>
              updateFilter(
                "projectStatus",
                value as StudentListFilters["projectStatus"],
              )
            }
          />
          <StudentFilterSelect
            id="filter-progress"
            label="完成進度"
            value={filters.progressRange}
            options={PROGRESS_RANGE_OPTIONS}
            onChange={(value) =>
              updateFilter(
                "progressRange",
                value as StudentListFilters["progressRange"],
              )
            }
          />

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
