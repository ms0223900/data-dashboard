# 課程學員數據儀表板｜MVP Spec

> 來源：Notion《課程學員數據儀表板｜MVP 核心概念與 Spec》  
> 對應 AI 實作規格：[`docs/specs/2026-07-13-course-student-dashboard-mvp.md`](specs/2026-07-13-course-student-dashboard-mvp.md)  
> User Stories：[`docs/user-stories/`](user-stories/)  
> Build Sprint：[`docs/build-sprint/`](build-sprint/)

---

## 1. 產品定位

這是一個以**假資料（mock data）**驗證「課程學員數據儀表板」產品邏輯的展示型 MVP。

目的不是先做完整的課程營運系統，而是確認 Dashboard 能否幫助課程管理者理解學員的學習與作品完成狀態。

### MVP 要回答的三個問題

1. 學員有沒有開始學、整體是否跟上課程？
2. 學員主要完成到哪些章節？
3. 學員是否真的進入 Build Sprint，完成 MVP 或發布作品？

### 背景

課程《聊著聊著，AI 就做完了：不懂程式也能用 AI 做出可上線產品》帶學員走過：

1. 想法收斂 → 2. Spec 撰寫 → 3. User Stories 拆解 → 4. Build Sprint 實作 → 5. 驗收與修正 → 6. 作品完成與發布

若只看報名人數或影片觀看，無法判斷學員是否真正完成作品。本 Dashboard 同時是 C-1 實作案例與課程收束展示。

> 備註：實際不會收集真實報名／觀看數據；此為展示「數據儀表板」情境的加分項目。

---

## 2. 產品目標

用假資料版課程學員數據儀表板，示範如何把學習歷程整理成可觀察、可判斷、可延伸串接真實資料的產品畫面。

1. 管理者快速掌握課程整體完成率。
2. 管理者看到學員主要完成到哪些章節。
3. 管理者知道學員是否真的完成實作作品。
4. 觀眾理解：Dashboard 要回答明確問題，不是單純放圖表。
5. 先用假資料驗證畫面、指標與操作流程。
6. 後續可再規劃 Sprint 串接 Google Sheet 或資料庫。

---

## 3. 技術棧

| 項目 | 選擇 |
| --- | --- |
| Framework | Next.js（App Router）+ TypeScript |
| Styling | Tailwind CSS |
| 資料來源（MVP） | 專案內集中管理的假資料（mock dataset） |
| 部署 | Vercel（可選） |
| 真實 Google Sheet / DB 串接 | **MVP 不做**；假資料格式應對齊未來 Sheet／API 回傳形狀，方便後續替換 |

---

## 4. MVP 範圍

### Must Have（必做）

- Dashboard 首頁與 Demo／假資料標示
- KPI 卡片區：總學員數、已開始學習、平均完成進度、作品完成率
- 章節進度圖表
- 作品完成狀態圖表
- 學員列表
- 篩選：依學習狀態、依作品狀態、依完成進度區間
- 假資料資料集（≥ 20 筆）
- 簡單報表／展示區（畫面截圖或錄影即可）
- Google Sheet／資料庫串接規劃說明區（僅說明，不安裝真實 API）

### Should / Could（可做）

- 單一學員詳細資訊
- 高／低進度學員標記
- 最近更新時間
- 匯出報表按鈕的 UI（不實作真實匯出）
- Demo 版提示文字強化

### Won't Have（第一版刻意不做）

- 真實 Google Sheet API 串接（後續 Sprint；需安排 US）
- 真實資料庫串接
- 登入與權限管理
- Email 自動提醒
- 複雜 BI、複雜資料工程
- 正式 PDF／CSV 匯出
- 多課程管理
- 完整後台管理系統
- 章節卡點深度分析（MVP 只做章節完成分布）

**範圍控制原則：**先以假資料驗證畫面、指標與互動；真實資料串接與營運功能拆進後續 Sprint。

---

## 5. 目標使用者

**主要角色：**課程管理者／課程創作者（線上課程創作者、教學助教、營運人員、產品負責人）。

他們想知道：

- 多少學員開始上課？整體平均完成進度？
- 哪些章節完成率最高？
- 哪些學員已提交作品？多少人完成 MVP？
- 學員是只看課，還是真的做出作品？
- 後續要不要針對某些章節補教學／範例／提醒？

---

## 6. 核心問題與指標對應

### 問題 1：學員整體有沒有跟上課程？

- 總學員數、已開始學習人數、平均完成進度、課程完成率、完成主要章節人數

### 問題 2：學員主要完成到哪些章節？

- 各章節完成比例／完成學生數、章節進度分布
- 主流程階段：想法收斂、Spec、User Stories、Build Sprint、驗收與修正、發布／延伸應用

### 問題 3：學員是否真的做出作品？

- 已提交作品人數、完成 MVP 人數、Build Sprint 中人數、已發布作品人數、作品完成率

---

## 7. 資料模型

### 7.1 Student

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `id` | string | 學員 ID |
| `name` | string | 學員姓名 |
| `email` | string | 學員 Email（假資料，非真實個資） |
| `startedAt` | string | 開始學習日期 |
| `lastActiveAt` | string | 最後活動日期 |
| `progressPercent` | number | 課程完成進度（0–100） |
| `currentChapter` | string | 目前章節 |
| `learningStatus` | string | 學習狀態（見 §8） |
| `projectStatus` | string | 作品狀態（見 §8） |
| `submittedProjectUrl` | string | 作品連結（可空） |
| `notes` | string | 備註（可空） |

### 7.2 ChapterProgress

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `chapterId` | string | 章節 ID |
| `chapterName` | string | 章節名稱 |
| `totalStudents` | number | 總學員數 |
| `completedStudents` | number | 完成人數 |
| `completionRate` | number | 完成率 |

### 7.3 ProjectStatusSummary

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `status` | string | 作品狀態 |
| `count` | number | 人數 |
| `percentage` | number | 比例 |

### 7.4 MVP 資料來源約束

- 假資料集中管理（單一模組／檔案），方便後續替換為 Google Sheet 或 DB。
- 圖表與列表數字必須由同一資料集推算，保持一致。
- 計算時避免除以 0。
- **不寫入真實個資**；不把 secrets 寫進文件或 client。

---

## 8. 狀態定義

### learningStatus

| 值 | 中文 |
| --- | --- |
| `Not started` | 尚未開始 |
| `In progress` | 學習中 |
| `Completed core chapters` | 已完成主要章節 |
| `Completed course` | 已完課 |
| `Inactive` | 近期未活動 |

### projectStatus

| 值 | 中文 |
| --- | --- |
| `Not started` | 尚未開始 |
| `Build Sprint` | Build Sprint 中 |
| `MVP completed` | 已完成 MVP |
| `Published` | 已發布 |

> 本版本**不需要**「規劃中」狀態。

---

## 9. 主要畫面

### 9.1 Dashboard 首頁

第一屏讓使用者快速看出：整體進度、是否開始學、作品完成情況、目前為 Demo／假資料版。

建議區塊順序：

1. 頁面標題與 Demo 標籤
2. KPI 卡片
3. 章節進度圖表
4. 作品完成狀態圖表
5. 學員列表
6. 後續串接說明／報表展示

### 9.2 KPI 卡片（至少）

- 總學員數
- 已開始學習
- 平均完成進度
- 作品完成率

> 註：US-03 另要求顯示「課程完成率」。實作時需確認是否為第 5 張卡片，或與「作品完成率」並列於 KPI 區。見 §12。

### 9.3 章節進度圖表

章節固定為：

1. 想法收斂
2. Spec
3. User Stories
4. Build Sprint
5. 驗收與修正
6. 發布／延伸應用

### 9.4 作品完成狀態圖表

- 尚未開始、Build Sprint 中、已完成 MVP、已發布
- 顯示人數與比例

### 9.5 學員列表欄位

姓名、Email、完成進度、目前章節、學習狀態、作品狀態、最後活動時間、作品連結

### 9.6 篩選

| 篩選 | 選項 |
| --- | --- |
| 學習狀態 | 全部、尚未開始、學習中、已完成主要章節、已完課、近期未活動 |
| 作品狀態 | 全部、尚未開始、Build Sprint 中、已完成 MVP、已發布 |
| 完成進度區間 | 全部、0–25%、26–50%、51–75%、76–100% |

無符合條件時顯示空狀態；可重設篩選。

---

## 10. 使用流程

### Flow 1：查看課程總覽

進入 Dashboard → 看 KPI → 看章節分布 → 看作品狀態。

### Flow 2：篩選學員

切換學習狀態／作品狀態／進度區間 → 列表更新 → 可看空狀態。

### Flow 3：展示未來串接策略

標示假資料版 → 說明驗證畫面與指標 → 展示後續 Google Sheet／DB 串接區 → 說明下一 Sprint 可替換資料來源。

---

## 11. 驗收標準（產品層）

### Dashboard

- [ ] 有 Dashboard 標題
- [ ] 清楚標示 Demo／假資料版
- [ ] KPI 正確顯示數字
- [ ] 章節進度圖表顯示各章節完成率
- [ ] 作品狀態圖表顯示各狀態人數比例
- [ ] 學員列表至少 20 筆假資料
- [ ] 篩選後列表更新
- [ ] 空狀態合理
- [ ] RWD 可閱讀與操作

### 資料邏輯

- [ ] 平均完成進度、課程完成率、作品完成率計算正確
- [ ] 圖表與列表一致
- [ ] 避免除以 0
- [ ] 假資料可集中管理並替換

### 展示與課程收束

- [ ] 可支撐「成效不能只看報名人數」
- [ ] 可回顧 Spec、US、Build Sprint 到作品完成
- [ ] 結尾有畢業完成感
- [ ] 不變完整 BI 工具教學
- [ ] 不深入 Google Sheet API／資料工程細節

---

## 12. 非功能需求

- 畫面清楚、乾淨，適合課程影片展示
- 指標名稱直覺，不過度技術化
- Demo 標籤明確，避免誤以為已串真實資料
- 程式結構方便替換資料來源
- 圖表與列表基本 RWD
- 互動適合錄影展示

---

## 13. 後續延伸（非本 MVP）

後續可拆：

1. **Sprint 4**：真實資料串接與資料同步（US-13、US-14）
2. **Sprint 5**：學員追蹤與助教協作（US-15～US-17）
3. **Sprint 6**：營運決策與課程優化（US-18～US-20）

詳見 Notion 原文與 [`docs/user-stories/README.md`](user-stories/README.md)。即使完整版，仍不做多課程管理、完整權限、學員端、自動提醒、AI 預測、正式 PDF/CSV、複雜 BI 等。

---

## 14. 環境變數與機密

| 變數 | MVP 需求 | 說明 |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_*` | 非必要 | MVP 使用假資料；真實 DB 為後續 |
| `SUPABASE_SERVICE_ROLE_KEY` | 僅 Server | 若未來使用，**不得**暴露到 client |

值不入庫；文件不寫入真實 secrets。

---

## 15. 未決事項 / 待確認

1. **KPI「課程完成率」vs「作品完成率」**：Spec §9.2 卡片列出作品完成率；US-03 要求顯示課程完成率。是否兩者皆顯示？課程完成率定義（完課人數／總學員？完成主要章節／總學員？）需釘死。
2. **篩選是否回寫 KPI／圖表**：US-07 提到「篩選後 KPI 或列表數量顯示合理」；多數描述僅列表更新。建議 MVP：篩選只影響列表，KPI／圖表維持全量；若需聯動請確認。
3. **Scaffold／AGENTS 模板**：現有 `agents/prototype.md` 仍描述「客戶名單收集／leads」；與本 Spec 產品定位不同，是否要以本 Spec 覆寫 Agent 現況敘述？
4. **圖表函式庫**：Notion 未指定（Recharts / Chart.js / CSS 等）；實作時選定即可，不阻塞 Spec。
