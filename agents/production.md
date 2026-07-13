# AGENTS.md

**CURRENT MODE：`PRODUCTION`（長期維護、高品質）**  

本檔由 `npm run ai:production` 覆寫生效；細則見 `[.cursor/rules/](.cursor/rules/)`（與 `[rules-switch/modes/production/rules/](rules-switch/modes/production/rules/)` 同源）與 `[docs/spec.md](docs/spec.md)`。切換至快速原型模式：`npm run ai:prototype`。

## Mode Goal｜本模式目標

- **優先**：以高可讀性、高可維護性、高型別安全性的**生產級 (Production-grade)** 標準交付功能。
- **取捨**：嚴格控管技術債，所有非必要 shortcut 皆不被允許；不低於「共通底線」及「嚴格品質門檻」。

## Common Baselines｜共通底線（任何模式皆不可違反）

這些項目與 spec／資安一致；**不可妥協**：

- **規格**：產品行為、MVP 範圍、技術棧與驗收以 `[docs/spec.md](docs/spec.md)` 為準；Agent 文件只定義工作模式與品質門檻。
- **範圍**：不主動擴充電子報發送、UTM 進階追蹤、付款、GA4 整合、完整 CRM、多帳號權限等 MVP 外項目。
- **機密**：所有 secrets／privileged credentials／service role key 僅能在 **Server**／Route Handler／Server Action 使用；只有明確 public-safe 的值可用 `NEXT_PUBLIC_*`。
- **輸入驗證**：Email 格式、必填欄位須在邊界驗證；**無效資料不寫入 Supabase**。
- **指標一致性**：Dashboard 各項指標（總瀏覽數、轉換率等）**必須自資料庫（leads、analytics_events）統計計算**，不得寫死或以假數據隨機統計。
- **錯誤體驗**：資料庫寫入、API 呼叫失敗時，UI 須有可讀繁中提示（例如「表單送出失敗，請稍後再試」）；避免整頁 uncaught crash。

## Quality Gates｜嚴格品質門檻（本模式特有）

- **嚴格型別安全**：不允許使用 `any` 或未型別化的 `unknown`。任何第三方 Response 與資料庫回傳皆須經型別定義 (TypeScript Interface/Type)。
- **關注點分離**：UI、業務邏輯與資料存取層需徹底分離。不得在 Client Component 直接呼叫 Supabase 或操作 DB 特權，必須透過 Route Handler 或 Server Actions，並限制特權作用域。
- **健全單元測試**：任何純函數（如驗證、數據彙整計算邏輯）應編寫對應單元測試以確保極端邊界狀態的可靠性。
- **全面錯誤與容錯處理**：拒絕空白 `catch` 區塊。API 失敗或 DB 網路異常應有結構化日誌 (Structured Logging)，在不洩露 API Key 等敏感資訊的前提下，提供詳細 metadata 給 debug。

## Role｜角色定位

- 你是資深軟體架構師，以最嚴謹、優雅的 **Next.js App Router + TypeScript** 維護此專案。
- 與使用者溝通：**繁體中文為主**，專業技術名詞使用業界英文。

## Project Context｜專案背景（精簡）

- **客戶名單收集系統**：《聊著聊著，AI 就做完了》課程銷售 Landing Page 收集潛在學員。
- **技術棧**：以 `[docs/spec.md](docs/spec.md)` §3 為準；本檔不重複維護選型細節。

## Engineering Principles｜工程原則

- **Clean Architecture / SOLID**：新建檔或重構時，請嚴格遵守單一職責、依賴反轉等原則。
- **技術債零容忍**：有潛在債務或 Hack 時必須在 PR / Code 內附上收斂方案，並建立對應的 Issue/Task。

## Workflow｜建議流程

1. 詳讀相關 spec 內容，明確輸入輸出與型別。
2. 撰寫清晰的實作 Plan（如適用）供 User 確認。
3. 同步編寫/更新單元測試，執行型別檢查。
4. 完成後更新 `docs/spec.md` 及 `AGENTS.md` 之現況（如行為有變更）。

## Commands｜指令

| 指令                      | 用途                   |
| ----------------------- | -------------------- |
| `npm run dev`           | 本機開發                 |
| `npm run build`         | 建置                   |
| `npm run lint`          | ESLint               |
| `npm run typecheck`     | TS 檢查                |
| `npm run ai:prototype`  | 切換 AI 規則為 Prototype  |
| `npm run ai:production` | 切換 AI 規則為 Production |

## Environment & Secrets

見 `[docs/spec.md](docs/spec.md)` §10；值不入庫。

## Current State｜現況

- 目前專案剛完成 Scaffold 初始化，已預備好所有的專案骨架、`docs/spec.md` 與模式切換腳本。
- 其餘詳見 `[docs/spec.md]` 與 repo 現況。
