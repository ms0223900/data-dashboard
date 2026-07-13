# AI Dev Spec：課程學員數據儀表板 MVP

> 來源 Ticket／Notion：課程學員數據儀表板｜MVP Spec + US 設計 + Build Sprint  
> 日期：2026-07-13  
> 產品 Spec：[`docs/spec.md`](../spec.md)

## Context 摘要

| 項目 | 內容 |
| --- | --- |
| **Problem** | 課程收束時若只看報名／觀看，無法判斷學員是否跟上章節、是否完成作品。 |
| **Goal** | 以假資料版 Dashboard 驗證指標、畫面與篩選互動，並可作為 C-1 影片收束展示。 |
| **Impacted Areas** | `app/` Dashboard 頁、假資料模組、KPI／圖表／列表／篩選 UI；MVP 不碰真實 Sheet／DB／Auth。 |
| **Stakeholders** | 課程管理者、課程創作者、助教（後續）、影片觀眾。 |

---

## 1. 核心 User Stories (Core User Stories)

### MVP（Sprint 1–3）

- As a 課程管理者, I want 看到課程學員數據 Dashboard（含 Demo 標示）, so that 我能快速理解學習成效。
- As a 開發者, I want 內建 ≥20 筆集中管理的假資料, so that 不需真實串接即可驗證畫面與指標。
- As a 課程管理者, I want 看到完成率相關 KPI, so that 我知道學員整體是否跟上課程。
- As a 課程管理者, I want 看到章節進度分布圖表, so that 我知道學員完成到哪些階段。
- As a 課程管理者, I want 看到作品完成狀態分布, so that 我知道是否真的做出產品。
- As a 課程管理者, I want 查看學員列表, so that 我能對到具體學員進度與作品狀態。
- As a 課程管理者, I want 依學習狀態／作品狀態／進度區間篩選, so that 我能快速分群查看。
- As a 課程管理者, I want 看到報表展示區與後續串接規劃, so that 我能做課程回顧並理解下一步可換成真實資料。
- As a 課程創作者, I want 用 Dashboard 做課程總結展示, so that 學員理解「從想法到產品」的完整流程。

### 後續（Sprint 4–6，非本 MVP）

- As a 課程管理者, I want 串接 Google Sheet 並看到更新狀態（US-13、US-14）。
- As a 課程管理者／助教, I want 週報、學員詳情、備註追蹤（US-15～US-17）。
- As a 課程管理者／創作者, I want 高風險提醒、章節卡點、課程復盤（US-18～US-20）。

詳細任務檔：[`docs/user-stories/`](../user-stories/)。

---

## 2. 功能細節 (Functional Specs)

### Story 群組 A：基礎 Dashboard + 假資料（US-01～US-05）

**前端**

- 建立 Dashboard 主頁：標題、Demo／假資料標籤、KPI 區、章節圖表、作品狀態圖表、學員列表區塊入口。
- RWD：桌機與手機皆可閱讀；圖表文字適合錄影。

**資料**

- 集中管理 mock `Student[]`（≥20），欄位對齊 `docs/spec.md` §7。
- 狀態枚舉對齊 `learningStatus` / `projectStatus`（無「規劃中」）。
- 由同一資料集計算：總學員數、已開始學習、平均完成進度、課程完成率、作品完成率、ChapterProgress、ProjectStatusSummary。
- 除法運算：分母為 0 時回傳 0（或明確 N/A），不得 NaN／Infinity。

**後端／API**

- MVP 可不開 API；Server Component 或 client 直接讀 mock 模組即可。
- 禁止為了 MVP 把 service role 暴露到 client。

### Story 群組 B：列表與篩選（US-06～US-09）

**前端**

- 學員表格欄位：姓名、Email、完成進度、目前章節、學習狀態、作品狀態、最後活動時間、作品連結（有則可開）。
- 三組篩選器；可組合；顯示目前篩選狀態；可重設。
- 無結果時空狀態文案（繁中）。

**資料流程**

- 篩選在記憶體對 `Student[]` 過濾；結果與圖表全量數據的一致性規則見 §6 風險。

### Story 群組 C：報表展示與串接規劃（US-10～US-12）

**前端**

- 「本週課程數據摘要／課程學習成效摘要」展示區：關鍵指標摘要，適合截圖／錄影。
- 「後續串接」說明：目前 mock → 可換 Google Sheet 或資料庫；結構不需重做；不安裝真實 API、不講資料工程細節。
- 課程總結段落：回扣報名人數不足、三個核心問題、Spec／US／Build Sprint 旅程、畢業完成感。

**明確不做**

- PDF／CSV 真實匯出、登入權限、真實 Sheet API、完整 BI。

---

## 3. 驗收標準 (Acceptance Criteria, AC)

### Happy Path

- Given 使用者開啟 Dashboard, When 頁面載入完成, Then 可見標題、Demo 標籤、KPI、兩張圖表與學員列表區，且數字來自假資料。
- Given 假資料含多種 learningStatus／projectStatus／progressPercent, When 管理者切換任一篩選, Then 列表即時更新；無結果時顯示空狀態。
- Given 管理者查看報表與串接區, When 閱讀內容, Then 可理解目前為假資料，下一步可換 Sheet／DB，且不會誤以為已串真實 API。

### Error / Edge

- Given 總學員數為 0（或測試空陣列）, When 計算完成率／平均進度, Then 不出現除以 0 錯誤，UI 顯示合理 0 或占位。
- Given 學員無 `submittedProjectUrl`, When 渲染列表, Then 不崩潰，連結欄為空或「無」。
- Given 手機寬度, When 瀏覽 KPI／圖表／列表／篩選, Then 可閱讀與操作、不嚴重破版。

完整 checklist 見各 `US-*.md` 與 [`docs/build-sprint/`](../build-sprint/)。

---

## 4. 技術邊界 (Technical Boundaries)

### DB Schema

- **MVP：無 DB 寫入需求。** 使用 TypeScript 型別模擬 Student／ChapterProgress／ProjectStatusSummary。
- 後續 Sheet／DB 欄位需對齊同一模型（見 `docs/spec.md` §13）。

### API & Permissions

- MVP 無登入、無權限。
- 若未來讀 Sheet：credentials 僅 Server；錯誤需繁中可讀提示。

### External Services

- MVP：無。
- 後續：Google Sheet API 或 Supabase（規格已預留，非本階段實作）。

### Performance / SLO

- Notion **未定義**具體 ms／P95。缺少效能數字；實作以本機流暢與錄影可用為準，不杜撰 SLO。

---

## 5. MVP 判定 (MVP vs Later)

| Story | MVP | 說明 |
| --- | --- | --- |
| US-01～US-12 | true | Sprint 1–3，C-1 展示最低成功路線 |
| US-13～US-14 | false | Sprint 4 真實資料 |
| US-15～US-17 | false | Sprint 5 追蹤協作 |
| US-18～US-20 | false | Sprint 6 營運復盤 |
| 單一學員詳情／高風險標記等「可做」 | false（可選） | Spec 列為 Could；不阻塞 MVP |

---

## 6. 資訊缺失與風險 / 注意事項

### 一、開發實作時應注意 (Implementation-time Concerns)

- Demo／假資料標籤必須一眼可見，避免觀眾誤判已串真實資料。
- 假資料狀態分布要多樣（不要全相同），以利錄影展示篩選。
- 圖表與列表必須同源計算；改 mock 時兩邊一起變。
- 指標命名用產品語言（完成率、Build Sprint），避免過度工程術語。
- Email 僅假資料展示；若未來有表單寫入，仍須邊界驗證（專案共通底線）。

### 二、規格與需求灰區 (Spec-level Gaps / Pre-dev Questions)

- KPI 是否同時顯示「課程完成率」與「作品完成率」？兩者公式為何？
- 篩選是否連動 KPI／圖表，或僅連動列表？
- 圖表函式庫未指定。
- Agent 模板（leads／名單收集）與本產品 Spec 不一致，是否更新 `AGENTS.md`／mode 檔敘述？

### 三、動態詢問與邊界調整 (Runtime/Dynamic Clarifications)

- 長姓名／長 URL 在表格與手機的截斷規則。
- `Inactive` 的「近期」天數（Notion 後續 Sprint 舉例 14 天；MVP 假資料可直接給狀態字串）。
- 進度區間邊界：25% 算 0–25% 還是 26–50%？（建議：0–25 含 25；26–50 含 50，以此類推；100 歸 76–100。）
