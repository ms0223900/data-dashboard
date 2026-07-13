### US-13：串接 Google Sheet 真實資料

**作為** 課程管理者
**我想要** 讓 Dashboard 讀取 Google Sheet 資料
**以便** 不需要手動更新假資料

**輸入格式**：
- Google Sheet 欄位對齊 Student 模型
- Server 端讀取設定（secrets 不進 client）

**輸出格式**：
- 可切換／使用 Sheet 資料來源的 Dashboard
- 欄位缺漏或格式錯誤時的可讀錯誤提示

**驗收條件**：
- [ ] Dashboard 可以改用 Google Sheet 作為資料來源
- [ ] Google Sheet 欄位至少包含姓名、Email、完成進度、目前章節、學習狀態、作品狀態、最後活動時間、作品連結
- [ ] 當 Google Sheet 資料更新後，Dashboard 可以重新整理並反映最新數據
- [ ] 若欄位缺漏或格式錯誤，畫面需顯示可理解的錯誤提示
- [ ] 假資料與真實資料來源可以清楚切換，避免 Demo 時混淆
- [ ] 不需要在本階段建立完整後台，只要完成穩定讀取與顯示

**依賴關係**：
- MVP US-01～US-12 完成；假資料模組可替換

**優先級**：P2
**相關功能**：Sprint 4｜真實資料串接（非本 MVP）

**備註**：
- 把假資料驗證版推進到真實營運的第一步。
