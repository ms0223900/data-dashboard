import Link from "next/link";

import { StudentListClient } from "@/components/dashboard/StudentListClient";
import { mockStudents } from "@/lib/data/mock-students";

export function StudentsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[1080px] px-6 py-8 pb-12">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2">
            <Link
              href="/"
              className="text-[13px] font-semibold text-primary hover:underline"
            >
              ← 返回總覽
            </Link>
          </p>
          <h1 className="m-0 text-[22px] font-bold tracking-tight text-on-background md:text-[26px]">
            學員列表與篩選
          </h1>
          <p className="m-0 mt-1 text-[14px] text-on-background-muted">
            從整體數字回到個別學員，快速查看不同學習與作品狀態的群組
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-secondary-soft px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-secondary">
          Demo／假資料版
        </span>
      </header>

      <StudentListClient students={mockStudents} />

      <p className="mt-2.5 text-xs text-on-background-muted">
        第一版僅提供顯示與篩選，不包含學員備註編輯、權限管理或完整 CRM。
      </p>
    </main>
  );
}
