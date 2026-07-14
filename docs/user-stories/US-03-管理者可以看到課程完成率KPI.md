### US-03：管理者可以看到課程完成率 KPI

**作為** 課程管理者
**我想要** 看到課程完成率等 KPI
**以便** 知道目前有多少學員完成主要學習路線、整體是否跟上課程

**輸入格式**：
- US-02 假資料 Student[]
- KPI 計算規則（總學員數、已開始學習、平均完成進度、課程完成率；Spec 另列作品完成率）

**輸出格式**：
- KPI 卡片區顯示計算後數字
- 數字與假資料一致；除以 0 安全

**驗收條件**：
- [x] KPI 顯示總學員數
- [x] KPI 顯示已開始學習人數
- [x] KPI 顯示平均完成進度
- [x] KPI 顯示課程完成率
- [x] 指標數字由假資料計算而來
- [x] 避免除以 0

#### 驗收說明

**整體結論**：PASS ✅

> KPI 由 `computeKpis(mockStudents)` 計算；四卡對齊設計稿（含作品完成率），課程完成率另列於 KPI 區下方與摘要（Spec §15 未決之落地）。

---

**AC-1：KPI 顯示總學員數**

狀態：✅ 通過

- `lib/metrics/kpi.ts` 的 `computeKpis()` 回傳 `totalStudents`
- `DashboardPage.tsx` KPI 第一卡顯示該值

---

**AC-2：KPI 顯示已開始學習人數**

狀態：✅ 通過

- `startedLearningCount` = `learningStatus !== "Not started"` 人數
- 第二張 KPI 卡顯示

---

**AC-3：KPI 顯示平均完成進度**

狀態：✅ 通過

- `averageProgressPercent` = 各學員 `progressPercent` 平均（四捨五入）
- 第三張 KPI 卡顯示為百分比

---

**AC-4：KPI 顯示課程完成率**

狀態：✅ 通過

- `courseCompletionRate` = `Completed course`／總學員
- 顯示於 KPI 區下方 `aria-label="課程完成率"` 與摘要列表（四卡結構維持設計稿「作品完成率」）

---

**AC-5：指標數字由假資料計算而來**

狀態：✅ 通過

- `DashboardPage` 呼叫 `computeKpis(mockStudents)`，來源為 `lib/data/mock-students.ts`

---

**AC-6：避免除以 0**

狀態：✅ 通過

- `computeKpis` 在 `totalStudents === 0` 時回傳全 0；`safeRate` 分母為 0 時回傳 0

---

**依賴關係**：
- US-02；版面容器建議 US-01

**優先級**：P0
**相關功能**：Sprint 1｜KPI

**設計稿來源**：
- Pencil：[`designs/dashboard-screen-1.pen`](../../designs/dashboard-screen-1.pen)
- HTML 參考：[`docs/design/ref/dashboard-screen-1.html`](../design/ref/dashboard-screen-1.html)
- 對應區塊：Desktop `KPI Grid`（總學員數／已開始學習／平均完成進度／作品完成率）；Mobile `KPI 2x2`
- 實作約束：四張 KPI 卡片的標籤、數值層級與卡片樣式對齊設計稿；數字由假資料計算，不自行增減 KPI 種類（課程完成率若另顯示，須對齊 Spec §15／§12，勿改動既有四卡版面結構）。

**備註**：
- 回答「學員目前整體有沒有跟上課程？」。與 Spec KPI 卡片「作品完成率」並列時，定義見 docs/spec.md §15。
