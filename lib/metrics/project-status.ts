import { PROJECT_STATUS_LABELS } from "@/lib/labels/student-status";
import {
  PROJECT_STATUSES,
  type ProjectStatusSummary,
  type Student,
} from "@/lib/types/student";

export function computeProjectStatusSummary(
  students: Student[],
): ProjectStatusSummary[] {
  const total = students.length;

  return PROJECT_STATUSES.map((status) => {
    const count = students.filter((s) => s.projectStatus === status).length;
    const percentage =
      total === 0 ? 0 : Math.round((count / total) * 100);

    return {
      status,
      label: PROJECT_STATUS_LABELS[status],
      count,
      percentage,
    };
  });
}
