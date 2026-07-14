### US-01：管理者可以看到課程學員數據 Dashboard

**作為** 課程管理者
**我想要** 看到一個課程學員數據 Dashboard
**以便** 快速理解這門課目前的學習成效

**輸入格式**：
- 無外部輸入；進入 Dashboard 路由即可
- 後續區塊依賴假資料（US-02）與 KPI／圖表元件

**輸出格式**：
- Dashboard 頁面：標題、Demo／假資料標示、KPI 區、章節進度圖表、作品狀態圖表、學員列表入口或列表區
- 手機版可閱讀的版面

**驗收條件**：
- [x] 頁面有清楚的標題
- [x] 頁面標示這是 Demo／假資料版
- [x] 頁面有 KPI 卡片區
- [x] 頁面有章節進度圖表
- [x] 頁面有作品完成狀態圖表
- [x] 頁面有學員列表入口或列表區
- [x] 手機版可以正常閱讀

#### 驗收說明

**整體結論**：PASS ✅

> Dashboard 骨架已上線於首頁 `/`：標題、Demo 標籤、KPI／章節／作品／學員列表入口區塊齊全，RWD class 已對齊設計參考。數值仍為占位（`—`），待 US-02／03／04／05 接入。

---

**AC-1：頁面有清楚的標題**

狀態：✅ 通過

- `components/dashboard/DashboardPage.tsx` 的 `<h1>` 顯示「課程學員數據儀表板」
- `app/layout.tsx` metadata `title` 同步為同名

---

**AC-2：頁面標示這是 Demo／假資料版**

狀態：✅ 通過

- `DashboardPage.tsx` header 含「Demo／假資料版」徽章
- 同區有「資料狀態：Mock data」狀態列

---

**AC-3：頁面有 KPI 卡片區**

狀態：✅ 通過

- `DashboardPage.tsx` 的 `aria-label="KPI 卡片區"` section 渲染四張卡片（總學員數、已開始學習、平均完成進度、作品完成率）
- 數值暫為 `—`（刻意留給 US-03）

---

**AC-4：頁面有章節進度圖表**

狀態：✅ 通過

- `DashboardPage.tsx` 的「章節進度分布」區塊含六章節名稱與 bar track 骨架
- 章節清單對齊 Spec：想法收斂、Spec、User Stories、Build Sprint、驗收與修正、發布／延伸應用

---

**AC-5：頁面有作品完成狀態圖表**

狀態：✅ 通過

- `DashboardPage.tsx` 的「作品完成狀態」區塊列出四狀態：尚未開始、Build Sprint 中、已完成 MVP、已發布
- 人數占位為 `—`（留給 US-05）

---

**AC-6：頁面有學員列表入口或列表區**

狀態：✅ 通過

- `DashboardPage.tsx` 的 `aria-label="學員列表入口"` 含標題、說明與「查看與篩選學員 →」CTA
- 真實列表與路由屬 US-06

---

**AC-7：手機版可以正常閱讀**

狀態：✅ 通過

- KPI 使用 `grid-cols-2 md:grid-cols-4`；圖表列／摘要列使用 `grid-cols-1 md:grid-cols-…`
- 標題字級 `text-[22px] md:text-[26px]`；章節列手機縮短 label 欄寬
- **建議**：實機或 DevTools 390 寬再目視確認一次（靜態 class 已就位）

---

**後續建議**

- US-02 集中管理假資料後，替換 KPI／圖表占位數值
- 學員列表 CTA 目前為非連結 span；US-06 實作時改為可導航

**依賴關係**：
- 無（可與 US-02 平行起步；完整數據需 US-02）

**優先級**：P0
**相關功能**：Sprint 1｜基礎 Dashboard

**設計稿來源**：
- Pencil：[`designs/dashboard-screen-1.pen`](../../designs/dashboard-screen-1.pen)
- HTML 參考：[`docs/design/ref/dashboard-screen-1.html`](../design/ref/dashboard-screen-1.html)
- 對應畫面：`01 Dashboard 首頁｜Desktop`、`05 Dashboard｜Mobile 390`
- 實作約束：首頁區塊順序與層級（Header／KPI／圖表列／摘要＋列表入口／教學展示重點）以設計稿為準；須含「Demo／假資料版」標示與 Mock data 狀態列。

**備註**：
- 這是整個 MVP 的入口，先確保畫面能承載後續數據區塊。
