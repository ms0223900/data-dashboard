import type {
  LearningStatus,
  ProjectStatus,
  Student,
} from "@/lib/types/student";

export type ProgressRangeId = "0-25" | "26-50" | "51-75" | "76-100";

export type StudentListFilters = {
  learningStatus: LearningStatus | "all";
  projectStatus: ProjectStatus | "all";
  progressRange: ProgressRangeId | "all";
};

export const DEFAULT_STUDENT_FILTERS: StudentListFilters = {
  learningStatus: "all",
  projectStatus: "all",
  progressRange: "all",
};

export const PROGRESS_RANGE_OPTIONS: {
  value: ProgressRangeId;
  label: string;
}[] = [
  { value: "0-25", label: "0–25%" },
  { value: "26-50", label: "26–50%" },
  { value: "51-75", label: "51–75%" },
  { value: "76-100", label: "76–100%" },
];

export function progressRangeId(
  progressPercent: number,
): ProgressRangeId {
  if (progressPercent <= 25) return "0-25";
  if (progressPercent <= 50) return "26-50";
  if (progressPercent <= 75) return "51-75";
  return "76-100";
}

export function filterStudents(
  students: Student[],
  filters: StudentListFilters,
): Student[] {
  return students.filter((student) => {
    if (
      filters.learningStatus !== "all" &&
      student.learningStatus !== filters.learningStatus
    ) {
      return false;
    }
    if (
      filters.projectStatus !== "all" &&
      student.projectStatus !== filters.projectStatus
    ) {
      return false;
    }
    if (
      filters.progressRange !== "all" &&
      progressRangeId(student.progressPercent) !== filters.progressRange
    ) {
      return false;
    }
    return true;
  });
}

export function hasActiveFilters(filters: StudentListFilters): boolean {
  return (
    filters.learningStatus !== "all" ||
    filters.projectStatus !== "all" ||
    filters.progressRange !== "all"
  );
}
