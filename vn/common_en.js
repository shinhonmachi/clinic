/**
 * common_en.js
 * Dùng chung cho tất cả các trang trong thư mục /vt: tải header/footer
 * và điều khiển đóng/mở menu ngăn kéo (hamburger menu).
 *
 * Thiết kế và hoạt động được đồng bộ với trang gốc (tiếng Nhật) common.js /
 * components/header.html · footer.html.
 * Chỉ cần chỉnh sửa header_en.html / footer_en.html là sẽ áp dụng
 * cho toàn bộ các trang trong thư mục /vt.
 */

(async function () {

  // ── Tải header ──────────────────────────────────────
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

      // ── Menu hamburger ──────────────────────────────
      const btn     = document.querySelector(".nav-hamburger");
      const drawer  = document.querySelector(".nav-drawer");
      const overlay = document.querySelector(".nav-overlay");

      // Căn vị trí top của drawer theo chiều cao thực tế của phần trên header
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
      console.error("Không thể tải header_en.html:", e);
    }
  }

  // ── Tải footer ──────────────────────────────────────
  const footerEl = document.getElementById("footer-placeholder");
  if (footerEl) {
    try {
      const res = await fetch("footer_en.html");
      footerEl.innerHTML = await res.text();
    } catch (e) {
      console.error("Không thể tải footer_en.html:", e);
    }
  }

})();
