/**
 * common_ph.js
 * Ginagamit sa lahat ng pahina sa ilalim ng /ph: nagla-load ng header/footer
 * at kumokontrol sa pagbukas/pagsara ng drawer menu (hamburger menu).
 *
 * Ang disenyo at gawain ay pareho sa orihinal (Japanese) na site na common.js /
 * components/header.html · footer.html.
 * Sa pag-edit lang ng header_ph.html / footer_ph.html, maapektuhan
 * ang lahat ng pahina sa ilalim ng /ph.
 */

(async function () {

  // ── I-load ang header ──────────────────────────────────────
  const headerEl = document.getElementById("header-placeholder");
  if (headerEl) {
    try {
      const res = await fetch("header_ph.html");
      headerEl.innerHTML = await res.text();

      const raw = location.pathname.split("/").pop();
      const currentFile = (raw === "" || raw === "/") ? "index.html" : raw || "index.html";
      document.querySelectorAll(".nav-links a, .nav-drawer a").forEach((a) => {
        if (a.getAttribute("href") === currentFile) a.classList.add("active");
      });

      // ── Hamburger menu ──────────────────────────────
      const btn     = document.querySelector(".nav-hamburger");
      const drawer  = document.querySelector(".nav-drawer");
      const overlay = document.querySelector(".nav-overlay");

      // I-align ang top position ng drawer batay sa aktwal na taas ng itaas na bahagi ng header
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
      console.error("Hindi ma-load ang header_ph.html:", e);
    }
  }

  // ── I-load ang footer ──────────────────────────────────────
  const footerEl = document.getElementById("footer-placeholder");
  if (footerEl) {
    try {
      const res = await fetch("footer_ph.html");
      footerEl.innerHTML = await res.text();
    } catch (e) {
      console.error("Hindi ma-load ang footer_ph.html:", e);
    }
  }

})();
