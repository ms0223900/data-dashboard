import {
  CHAPTER_NAMES,
  type ChapterName,
  type ChapterProgress,
  type Student,
} from "@/lib/types/student";

function chapterIndex(name: ChapterName): number {
  return CHAPTER_NAMES.indexOf(name);
}

/**
 * A student counts as having completed a chapter if their current chapter
 * is at or past that chapter in the course sequence.
 */
export function computeChapterProgress(
  students: Student[],
): ChapterProgress[] {
  const totalStudents = students.length;

  return CHAPTER_NAMES.map((chapterName, index) => {
    const completedStudents = students.filter(
      (s) => chapterIndex(s.currentChapter) >= index,
    ).length;
    const completionRate =
      totalStudents === 0
        ? 0
        : Math.round((completedStudents / totalStudents) * 100);

    return {
      chapterId: `ch-${index + 1}`,
      chapterName,
      totalStudents,
      completedStudents,
      completionRate,
    };
  });
}
