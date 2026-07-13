/**
 * common_fr.js
 * /fr 配下の全ページ共通：ヘッダー・フッターの読み込みと、
 * ドロワーメニュー（ハンバーガー）の開閉を行う。
 *
 * デザイン・挙動はルート（日本語）サイトの common.js /
 * components/header.html・footer.html と統一している。
 * header_en.html / footer_en.html を編集するだけで、
 * fr 配下の全ページに反映される。
 */

(async function () {

  // ── ヘッダー読み込み ──────────────────────────────────────
  const headerEl = document.getElementById("header-placeholder");
  if (headerEl) {
    try {
      const res = await fetch("header_en.html");
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
      console.error("header_en.html の読み込みに失敗しました:", e);
    }
  }

  // ── フッター読み込み ──────────────────────────────────────
  const footerEl = document.getElementById("footer-placeholder");
  if (footerEl) {
    try {
      const res = await fetch("footer_en.html");
      footerEl.innerHTML = await res.text();
    } catch (e) {
      console.error("footer_en.html の読み込みに失敗しました:", e);
    }
  }

})();
