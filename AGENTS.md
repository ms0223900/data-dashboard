# AGENTS.md

**CURRENT MODE：`PROTOTYPE`（快速做完）**  

本檔由 `npm run ai:prototype` 覆寫生效；細則見 `[.cursor/rules/](.cursor/rules/)`（與 `[rules-switch/modes/prototype/rules/](rules-switch/modes/prototype/rules/)` 同源）。切換至維護模式：`npm run ai:production`。

## Mode Goal｜本模式目標

- **優先**：在 spec 允許範圍內 **盡快可驗收、可部署**。
- **取捨**：可接受較扁平、較少抽象、較少的檔案切分與較輕的文件；**不低於下列「共通底線」**。

## Common Baselines｜共通底線（任何模式皆不可違反）

這些項目與 spec／資安一致；**不可用「求快」略過**：

- **規格**：產品行為、MVP 範圍、技術棧與驗收以 spec 為準；Agent 文件只定義工作模式與品質門檻。
- **機密**：所有 secrets／privileged credentials／service role key 僅能在 **Server**／Route Handler／Server Action 使用；只有明確 public-safe 的值可用 `NEXT_PUBLIC_*`。
- **輸入驗證**：Email 格式、必填欄位須在邊界驗證；**無效資料不寫入 Supabase**。
- **錯誤體驗**：資料庫寫入、API 呼叫失敗時，UI 須有可讀繁中提示（例如「資料載入失敗，請稍後再試」）；避免整頁 uncaught crash。

## Role｜角色定位

- 你是協助本專案的工程助手，以 **Next.js App Router + TypeScript** 完成 MVP。
- 與使用者溝通：**繁體中文為主**，技術名詞可英文。

## Project Context｜專案背景（精簡）

- **Data Dashboard**：一站式數據儀表板，即時監控關鍵指標。

## Architecture｜架構（Prototype 態度）

- `app/` 為 UI 與路由；機密／寫 DB／計算 Dashboard：**server 端**處理。
- **可先**將邏輯放在較少的檔案或 route 內；若重複第三次再抽 helper。**不要**為漂亮架構擋住 spec 交付。

## Engineering Principles｜程式風格（本模式弱化）

- **速度 > 過度設計**。`any`：**盡量少用**；若省時可短暫使用並加 **TODO** 說明收斂方式。
- **測試**：不強制；能跑、`npm run build`／`npm run lint`／`npm run typecheck` 盡可能保持通過。
  - **Clean Architecture / SOLID**：**不要求**一步到位；新建檔時仍避免把機密與 UI 混在一起。

## Workflow｜建議流程

1. 讀相關 spec 段落。
2. 小步交付、對照驗收。
3. 產品範圍／未決決策寫入 spec；implementation debt 用 **TODO** 追蹤。
4. 上線前：`npm run ai:production` 收斂品質。

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

值不入庫。

## Current State｜現況

- 目前專案剛完成 Scaffold 初始化，已預備好所有的專案骨架與模式切換腳本。

## Cursor Cloud specific instructions

環境（Node、npm 依賴）已由啟動時的 update script（`npm ci`）備妥。以下為在本 repo 開發時的非顯而易見注意事項；標準指令請見上方 `## Commands` 與 `README.md`。

- **必要：`.env.local` 才能啟動任何頁面。** `middleware.ts` 幾乎匹配所有路由並呼叫 `assertSupabaseEnv()`（`lib/supabase/env.ts`）；若缺少 `NEXT_PUBLIC_SUPABASE_URL` 或 `NEXT_PUBLIC_SUPABASE_ANON_KEY`，會直接丟出「缺少 Supabase 環境變數」，導致 `npm run dev` / `npm run build` 下每個路由（包含首頁）都報錯。`.env.local` 被 gitignore，故每台新 VM 都需自行建立。
- **MVP 使用假資料（見 `docs/spec.md`），無需真實 Supabase。** 上述兩個變數填任意非空字串即可通過中介層（`middleware.ts` 只呼叫 `auth.getUser()`，網路失敗不會丟例外）。若之後要接真實 DB，再換成真正的 Supabase 專案值。快速建立：`cp .env.example .env.local` 後把 `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY` 填為非空值（例如 `https://placeholder.supabase.co` 與任意字串）。
- **Dev server**：`npm run dev`，預設 `http://localhost:3000`（另有 `/admin`）。目前兩頁皆為 scaffold placeholder。
- **既有的 lint 警告**：`app/layout.tsx` 有 2 個 `@next/next` 字型相關 warning（非 error），`npm run lint` 仍以 0 errors 通過，屬預期。
