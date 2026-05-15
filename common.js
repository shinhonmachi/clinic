/**
 * common.js
 * ヘッダー・フッターの挿入と、お知らせ（news.json）の動的レンダリングを行う。
 *
 * ── お知らせの更新方法 ──────────────────────────────────
 *  news.json を編集するだけで OK。HTMLは一切触らない。
 *
 *  badge の種類:
 *    "new"     → ピンク「新着」
 *    "holiday" → 緑「休診」
 *    "info"    → 青「お知らせ」
 *
 *  例:
 *  [
 *    { "date": "2025.06.01", "badge": "new",     "text": "6月の診療スケジュールを更新しました。" },
 *    { "date": "2025.05.03", "badge": "holiday",  "text": "5月3日〜6日（GW）は休診です。" },
 *    { "date": "2025.04.01", "badge": "info",     "text": "電子カルテシステムを刷新しました。" }
 *  ]
 * ───────────────────────────────────────────────────────
 */

(async function () {

  // ── ヘッダー読み込み ──────────────────────────────────────
  const headerEl = document.getElementById("header-placeholder");
  if (headerEl) {
    try {
      const res = await fetch("components/header.html");
      headerEl.innerHTML = await res.text();

      const raw = location.pathname.split("/").pop();
      const currentFile = (raw === "" || raw === "/") ? "index.html" : raw || "index.html";
      document.querySelectorAll(".nav-links a, .nav-drawer a").forEach((a) => {
        if (a.getAttribute("href") === currentFile) a.classList.add("active");
      });

      // ── ハンバーガーメニュー ──────────────────────────────
      const btn     = document.querySelector(".nav-hamburger");
      const drawer  = document.querySelector(".nav-drawer");
      const overlay = document.querySelector(".nav-overlay");

      // ドロワーのtopをヘッダー上段の実際の高さに合わせる
      const headerTop = document.querySelector(".header-top");
      const drawerTop = headerTop ? headerTop.offsetHeight : 69;
      if (drawer)  { drawer.style.top  = drawerTop + "px"; drawer.style.height = `calc(100vh - ${drawerTop}px)`; }
      if (overlay) { overlay.style.top = drawerTop + "px"; }

      function openMenu() {
        btn.classList.add("is-open");
        drawer.classList.add("is-open");
        overlay.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        drawer.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
      function closeMenu() {
        btn.classList.remove("is-open");
        drawer.classList.remove("is-open");
        overlay.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        drawer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }

      btn.addEventListener("click", () =>
        btn.classList.contains("is-open") ? closeMenu() : openMenu()
      );
      overlay.addEventListener("click", closeMenu);
      drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
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

  // ── お知らせ読み込み ──────────────────────────────────────
  const newsEl = document.getElementById("news-placeholder");
  if (newsEl) {
    const BADGE = {
      new:     { label: "新着",    cls: "badge-new"     },
      holiday: { label: "休診",    cls: "badge-holiday"  },
      info:    { label: "お知らせ", cls: "badge-info"    },
    };

    try {
      const res  = await fetch("news.json");
      const list = await res.json();

      if (!Array.isArray(list) || list.length === 0) {
        newsEl.innerHTML = '<p style="text-align:center;color:var(--text-muted);font-size:13px;">現在お知らせはありません。</p>';
        return;
      }

      newsEl.innerHTML = list.map(({ date, badge, text }) => {
        const b = BADGE[badge] ?? BADGE.info;
        return `
        <div class="news-item">
          <span class="news-date">${date}</span>
          <span class="news-badge ${b.cls}">${b.label}</span>
          <span class="news-text">${text}</span>
        </div>`;
      }).join("");

    } catch (e) {
      console.error("news.json の読み込みに失敗しました:", e);
    }
  }

})();
