import {
  LEARNING_STATUS_LABELS,
  PROJECT_STATUS_LABELS,
  formatDisplayDate,
  learningStatusPillTone,
  projectStatusPillTone,
  statusPillClass,
} from "@/lib/labels/student-status";
import type { Student } from "@/lib/types/student";

type StudentTableProps = {
  students: Student[];
};

function StatusPill({
  label,
  toneClass,
}: {
  label: string;
  toneClass: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${toneClass}`}
    >
      {label}
    </span>
  );
}

function ProgressCell({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="min-w-[34px] text-[13px] font-semibold text-on-background">
        {percent}%
      </span>
      <span className="h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-background-alt">
        <span
          className="block h-full rounded-full bg-primary"
          style={{ width: `${percent}%` }}
        />
      </span>
    </div>
  );
}

function ProjectLink({ url }: { url: string }) {
  if (!url) {
    return <span className="text-on-background-muted">—</span>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary hover:underline"
    >
      查看作品
    </a>
  );
}

export function StudentTable({ students }: StudentTableProps) {
  return (
    <>
      {/* Desktop table */}
      <div
        aria-label="學員列表"
        className="hidden overflow-x-auto rounded-xl border border-border md:block"
      >
        <table className="w-full min-w-[760px] border-collapse text-[13px]">
          <thead>
            <tr>
              {[
                "姓名",
                "Email",
                "進度",
                "目前章節",
                "學習狀態",
                "作品狀態",
                "最後活動",
                "作品連結",
              ].map((heading) => (
                <th
                  key={heading}
                  className="border-b border-border bg-card-muted px-3.5 py-2.5 text-left text-xs font-semibold whitespace-nowrap text-on-background-muted"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-card-muted"
              >
                <td className="border-b border-border px-3.5 py-3 font-semibold whitespace-nowrap text-on-background">
                  {student.name}
                </td>
                <td className="border-b border-border px-3.5 py-3 whitespace-nowrap text-on-background-muted">
                  {student.email}
                </td>
                <td className="border-b border-border px-3.5 py-3 whitespace-nowrap">
                  <ProgressCell percent={student.progressPercent} />
                </td>
                <td className="border-b border-border px-3.5 py-3 whitespace-nowrap text-on-background">
                  {student.currentChapter}
                </td>
                <td className="border-b border-border px-3.5 py-3 whitespace-nowrap">
                  <StatusPill
                    label={LEARNING_STATUS_LABELS[student.learningStatus]}
                    toneClass={statusPillClass(
                      learningStatusPillTone(student.learningStatus),
                    )}
                  />
                </td>
                <td className="border-b border-border px-3.5 py-3 whitespace-nowrap">
                  <StatusPill
                    label={PROJECT_STATUS_LABELS[student.projectStatus]}
                    toneClass={statusPillClass(
                      projectStatusPillTone(student.projectStatus),
                    )}
                  />
                </td>
                <td className="border-b border-border px-3.5 py-3 whitespace-nowrap text-on-background">
                  {formatDisplayDate(student.lastActiveAt)}
                </td>
                <td className="border-b border-border px-3.5 py-3 whitespace-nowrap">
                  <ProjectLink url={student.submittedProjectUrl} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul
        aria-label="學員列表"
        className="m-0 flex list-none flex-col gap-3 p-0 md:hidden"
      >
        {students.map((student) => (
          <li
            key={student.id}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="m-0 text-[15px] font-semibold text-on-background">
                  {student.name}
                </p>
                <p className="m-0 mt-0.5 text-[12.5px] text-on-background-muted">
                  {student.email}
                </p>
              </div>
              <ProgressCell percent={student.progressPercent} />
            </div>
            <dl className="m-0 grid grid-cols-1 gap-2 text-[13px]">
              <div className="flex justify-between gap-2">
                <dt className="text-on-background-muted">目前章節</dt>
                <dd className="m-0 font-medium text-on-background">
                  {student.currentChapter}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-on-background-muted">學習狀態</dt>
                <dd className="m-0">
                  <StatusPill
                    label={LEARNING_STATUS_LABELS[student.learningStatus]}
                    toneClass={statusPillClass(
                      learningStatusPillTone(student.learningStatus),
                    )}
                  />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-on-background-muted">作品狀態</dt>
                <dd className="m-0">
                  <StatusPill
                    label={PROJECT_STATUS_LABELS[student.projectStatus]}
                    toneClass={statusPillClass(
                      projectStatusPillTone(student.projectStatus),
                    )}
                  />
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-on-background-muted">最後活動</dt>
                <dd className="m-0 text-on-background">
                  {formatDisplayDate(student.lastActiveAt)}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-on-background-muted">作品連結</dt>
                <dd className="m-0">
                  <ProjectLink url={student.submittedProjectUrl} />
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
