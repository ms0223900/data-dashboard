import {
  PROJECT_STATUSES,
  type ProjectStatus,
  type ProjectStatusSummary,
  type Student,
} from "@/lib/types/student";

const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  "Not started": "尚未開始",
  "Build Sprint": "Build Sprint 中",
  "MVP completed": "已完成 MVP",
  Published: "已發布",
};

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
