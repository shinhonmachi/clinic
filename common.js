/**
 * common.js
 * ヘッダー・フッターを外部ファイルから読み込んで挿入する。
 * C言語の #include に相当するイメージ。
 *
 * 使い方：
 *   <div id="header-placeholder"></div>
 *   ...コンテンツ...
 *   <div id="footer-placeholder"></div>
 *   <script src="common.js"></script>
 */

(async function () {
  // ── ヘッダー読み込み ──────────────────────────────────────
  const headerEl = document.getElementById("header-placeholder");
  if (headerEl) {
    try {
      const res = await fetch("components/header.html");
      headerEl.innerHTML = await res.text();

      // 現在のページのナビリンクに .active を付ける
      const currentFile = location.pathname.split("/").pop() || "index.html";
      document.querySelectorAll(".nav-links a").forEach((a) => {
        if (a.getAttribute("href") === currentFile) {
          a.classList.add("active");
        }
      });
    } catch (e) {
      console.error("header の読み込みに失敗しました:", e);
    }
  }

  // ── フッター読み込み ──────────────────────────────────────
  const footerEl = document.getElementById("footer-placeholder");
  if (footerEl) {
    try {
      const res = await fetch("components/footer.html");
      footerEl.innerHTML = await res.text();
    } catch (e) {
      console.error("footer の読み込みに失敗しました:", e);
    }
  }
})();
