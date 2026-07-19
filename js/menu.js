/* menu.js — loads menu.json and renders into #menu */

(function () {
  "use strict";

  const CONTAINER_ID = "menu";

  function tagHTML(tags) {
    if (!tags || !tags.length) return "";
    return `<span class="tags">${tags.map(t => `<span class="tag" data-tag="${t}">${t}</span>`).join("")}</span>`;
  }

  function priceHTML(item, currency) {
    let html = `${currency}${item.price.toFixed(2)}`;
    if (item.price2 != null) {
      html += ` <span class="alt">/ ${currency}${item.price2.toFixed(2)}</span>`;
    }
    return html;
  }

  function render(data) {
    const el = document.getElementById(CONTAINER_ID);
    if (!el) return;

    const c = data.currency || "€";
    let html = "";

    html += `<header>`;
    html += `<h1>${esc(data.restaurant)}</h1>`;
    if (data.tagline) html += `<p class="tagline">${esc(data.tagline)}</p>`;
    html += `</header>`;

    for (const section of data.sections) {
      html += `<section class="section">`;
      html += `<h2 class="section-title">${esc(section.name)}</h2>`;
      for (const item of section.items) {
        html += `<div class="item">`;
        html += `<div class="item-info">`;
        html += `<span class="item-name">${esc(item.name)}</span>`;
        html += tagHTML(item.tags);
        if (item.description) html += `<div class="item-desc">${esc(item.description)}</div>`;
        html += `</div>`;
        html += `<div class="item-price">${priceHTML(item, c)}</div>`;
        html += `</div>`;
      }
      html += `</section>`;
    }

    html += `<footer>${esc(data.restaurant)} &mdash; ${esc(data.tagline || "")}</footer>`;

    el.innerHTML = html;
  }

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  fetch("menu.json")
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(render)
    .catch(err => {
      const el = document.getElementById(CONTAINER_ID);
      if (el) el.innerHTML = `<p style="color:red;padding:2rem;">Failed to load menu: ${err.message}</p>`;
    });
})();
