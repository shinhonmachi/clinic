/**
 * common_en.js
 * /en 配下の全ページ共通：ヘッダー・フッターの読み込みを行う。
 *
 * header_en.html / footer_en.html を fetch して、それぞれ
 * #header-placeholder / #footer-placeholder に挿入する。
 * このファイルと同じ /en フォルダ内に header_en.html / footer_en.html を
 * 置いておけば、どのページからも相対パスだけで読み込める。
 *
 * 注意: innerHTML で挿入した <script> はブラウザ標準の仕様上そのままでは
 * 実行されないため、挿入後に <script> タグを作り直して実行している。
 * header_en.html / footer_en.html の中身（ナビ・ハンバーガーメニューの
 * 開閉・現在地ハイライトなど）を編集するだけで、全ページに反映される。
 */

(async function () {

  // innerHTML で挿入された <script> を実行し直す
  function runScripts(container) {
    container.querySelectorAll("script").forEach((oldScript) => {
      const newScript = document.createElement("script");
      for (const attr of oldScript.attributes) {
        newScript.setAttribute(attr.name, attr.value);
      }
      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });
  }

  // ── ヘッダー読み込み ──────────────────────────────────────
  const headerEl = document.getElementById("header-placeholder");
  if (headerEl) {
    try {
      const res = await fetch("header_en.html");
      headerEl.innerHTML = await res.text();
      runScripts(headerEl);
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
      runScripts(footerEl);
    } catch (e) {
      console.error("footer_en.html の読み込みに失敗しました:", e);
    }
  }

})();
