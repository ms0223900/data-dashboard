import type { Student } from "@/lib/types/student";

export type DashboardKpis = {
  totalStudents: number;
  startedLearningCount: number;
  averageProgressPercent: number;
  /** 完課人數／總學員（%） */
  courseCompletionRate: number;
  /** MVP completed + Published／總學員（%） */
  projectCompletionRate: number;
};

function safeRate(numerator: number, denominator: number): number {
  if (denominator === 0) return 0;
  return Math.round((numerator / denominator) * 100);
}

export function computeKpis(students: Student[]): DashboardKpis {
  const totalStudents = students.length;

  if (totalStudents === 0) {
    return {
      totalStudents: 0,
      startedLearningCount: 0,
      averageProgressPercent: 0,
      courseCompletionRate: 0,
      projectCompletionRate: 0,
    };
  }

  const startedLearningCount = students.filter(
    (s) => s.learningStatus !== "Not started",
  ).length;

  const progressSum = students.reduce((sum, s) => sum + s.progressPercent, 0);
  const averageProgressPercent = Math.round(progressSum / totalStudents);

  const completedCourseCount = students.filter(
    (s) => s.learningStatus === "Completed course",
  ).length;

  const projectDoneCount = students.filter(
    (s) =>
      s.projectStatus === "MVP completed" || s.projectStatus === "Published",
  ).length;

  return {
    totalStudents,
    startedLearningCount,
    averageProgressPercent,
    courseCompletionRate: safeRate(completedCourseCount, totalStudents),
    projectCompletionRate: safeRate(projectDoneCount, totalStudents),
  };
}
