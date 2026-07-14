/** Course student domain types — aligned with docs/spec.md §7–§8 */

export const LEARNING_STATUSES = [
  "Not started",
  "In progress",
  "Completed core chapters",
  "Completed course",
  "Inactive",
] as const;

export type LearningStatus = (typeof LEARNING_STATUSES)[number];

export const PROJECT_STATUSES = [
  "Not started",
  "Build Sprint",
  "MVP completed",
  "Published",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const CHAPTER_NAMES = [
  "想法收斂",
  "Spec",
  "User Stories",
  "Build Sprint",
  "驗收與修正",
  "發布／延伸應用",
] as const;

export type ChapterName = (typeof CHAPTER_NAMES)[number];

export type Student = {
  id: string;
  name: string;
  email: string;
  startedAt: string;
  lastActiveAt: string;
  progressPercent: number;
  currentChapter: ChapterName;
  learningStatus: LearningStatus;
  projectStatus: ProjectStatus;
  submittedProjectUrl: string;
  notes: string;
};

export type ChapterProgress = {
  chapterId: string;
  chapterName: ChapterName;
  totalStudents: number;
  completedStudents: number;
  completionRate: number;
};

export type ProjectStatusSummary = {
  status: ProjectStatus;
  label: string;
  count: number;
  percentage: number;
};
