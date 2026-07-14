import type { LearningStatus, ProjectStatus } from "@/lib/types/student";

export const LEARNING_STATUS_LABELS: Record<LearningStatus, string> = {
  "Not started": "尚未開始",
  "In progress": "學習中",
  "Completed core chapters": "已完成主要章節",
  "Completed course": "已完課",
  Inactive: "近期未活動",
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  "Not started": "尚未開始",
  "Build Sprint": "Build Sprint 中",
  "MVP completed": "已完成 MVP",
  Published: "已發布",
};

export type StatusPillTone = "gray" | "blue" | "green" | "orange";

const PILL_CLASS: Record<StatusPillTone, string> = {
  gray: "bg-background-alt text-on-background-muted",
  blue: "bg-primary-soft text-primary",
  green: "bg-success-bg text-success",
  orange: "bg-secondary-soft text-secondary",
};

export function learningStatusPillTone(
  status: LearningStatus,
): StatusPillTone {
  switch (status) {
    case "Not started":
      return "gray";
    case "In progress":
      return "blue";
    case "Completed core chapters":
    case "Completed course":
      return "green";
    case "Inactive":
      return "orange";
  }
}

export function projectStatusPillTone(status: ProjectStatus): StatusPillTone {
  switch (status) {
    case "Not started":
      return "gray";
    case "Build Sprint":
      return "blue";
    case "MVP completed":
    case "Published":
      return "green";
  }
}

export function statusPillClass(tone: StatusPillTone): string {
  return PILL_CLASS[tone];
}

export function formatDisplayDate(isoDate: string): string {
  return isoDate.replaceAll("-", "/");
}
