### US-12：管理者可以用 Dashboard 做課程總結展示

**作為** 課程創作者
**我想要** 用這個 Dashboard 作為課程總結展示
**以便** 讓學員理解這門課真正教的是一套把想法變成產品的流程

**輸入格式**：
- Sprint 1–3 已完成的 Dashboard 畫面與文案區塊

**輸出格式**：
- 可用於 C-1 影片收束的完整展示路徑與收束文案
- 回扣 Spec／US／Build Sprint 學習旅程

**驗收條件**：
- [x] Dashboard 可以支撐「課程成效不能只看報名人數」的說法
- [x] Dashboard 可以支撐「要看學員是否開始學、是否跟上章節、是否完成作品」的說法
- [x] Dashboard 可以回扣 Spec、US、Build Sprint 的學習旅程
- [x] Dashboard 可以作為 C-1 影片的收束畫面
- [x] 結尾可以帶出畢業完成感
- [x] 展示路徑順序與首頁區塊一致（報表在離頁列表之前），篩選示範語意對齊報表「已完成或發布」
- [x] 學習旅程章節名稱與系統 `CHAPTER_NAMES`／章節圖一致

**測試策略**：Exploratory（純文案／常數對齊，不寫自動化測試）

#### 驗收說明

**整體結論**：PASS ✅

> `CourseClosingSection` 旅程改用 `CHAPTER_NAMES`；展示路徑改為「KPI → 圖表 → 報表 → 列表篩選（MVP 或已發布）→ 返回收束」，避免離頁後才講報表、以及 5 人／8 人話術錯位。

---

**AC-1～5**：收束敘事、三問題、畢業完成感仍在（見元件本體）。

**AC-6：展示路徑與報表語意**

狀態：✅ 通過

- 路徑文案先報表後列表，並註明返回總覽看收束
- 篩選示範對齊報表「已完成或發布」（MVP completed + Published）

**AC-7：旅程名稱一致**

狀態：✅ 通過

- `CHAPTER_NAMES` 直接渲染，末項為「發布／延伸應用」

**依賴關係**：
- US-01～US-11（至少 Sprint 1–3 主路徑完成）

**優先級**：P0
**相關功能**：Sprint 3｜課程總結展示

**設計稿來源**：
- 首頁收束文案：[`designs/dashboard-screen-1.pen`](../../designs/dashboard-screen-1.pen) → `教學展示重點`
- 圖表解讀／教學說明：[`designs/dashboard-screen-2.pen`](../../designs/dashboard-screen-2.pen) → `資料解讀提示`、`作品完成面板` teaching
- HTML 參考：[`dashboard-screen-1.html`](../design/ref/dashboard-screen-1.html)、[`dashboard-screen-2.html`](../design/ref/dashboard-screen-2.html)
- 實作約束：收束敘事須回扣「開始學／跟上章節／做出作品」與 Spec→US→Build Sprint 旅程；展示路徑對齊首頁區塊順序（總覽 → 圖表 → 報表 → 列表篩選 → 收束）。

**備註**：
- 同時是產品案例與課程收束工具。
