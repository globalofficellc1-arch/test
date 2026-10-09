/* GlobalOffice LLC — sitio v2: idioma ES/EN, pestañas de precios, plan elegido en el formulario. */
(function () {
  var root = document.documentElement;
  var cfg = window.GO_CONFIG || {};

  // Mostrar u ocultar la referencia de precios de mercado (solo en pruebas).
  if (cfg.showMarketRef) root.classList.add("show-ref");

  // ---------- Idioma ----------
  function getSaved() { try { return localStorage.getItem("go_lang"); } catch (e) { return null; } }
  function save(l) { try { localStorage.setItem("go_lang", l); } catch (e) {} }

  function setLang(l) {
    root.setAttribute("lang", l);
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === l));
    });
    // Placeholders, opciones y atributos traducibles
    document.querySelectorAll("[data-ph-es]").forEach(function (el) {
      el.placeholder = el.getAttribute("data-ph-" + l) || "";
    });
    document.querySelectorAll("option[data-es]").forEach(function (o) {
      o.textContent = o.getAttribute("data-" + l);
    });
    document.querySelectorAll("[data-aria-es]").forEach(function (el) {
      el.setAttribute("aria-label", el.getAttribute("data-aria-" + l));
    });
    var t = document.querySelector("meta[name=title-" + l + "]");
    if (t) document.title = t.content;
    var langField = document.getElementById("idioma");
    if (langField) langField.value = l;
    // Mensaje de WhatsApp en el idioma activo
    document.querySelectorAll("[data-wa-es]").forEach(function (a) {
      a.href = "https://wa.me/" + (cfg.whatsapp || "") + "?text=" + encodeURIComponent(a.getAttribute("data-wa-" + l));
      a.target = "_blank"; a.rel = "noopener";
    });
  }

  var q = new URLSearchParams(location.search).get("lang");
  var initial = (q === "en" || q === "es") ? q : (getSaved() || ((navigator.language || "es").toLowerCase().indexOf("en") === 0 ? "en" : "es"));
  setLang(initial);

  document.querySelectorAll("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      var l = b.getAttribute("data-set-lang");
      save(l); setLang(l);
    });
  });

  // ---------- Pestañas de precios ----------
  var tabs = document.querySelectorAll("[role=tab]");
  function openTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { openTab(t); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        openTab(n); n.focus();
      }
    });
  });
  document.querySelectorAll("[data-open-tab]").forEach(function (a) {
    a.addEventListener("click", function () {
      var t = document.getElementById(a.getAttribute("data-open-tab"));
      if (t) openTab(t);
    });
  });

  // ---------- Plan elegido → formulario ----------
  var planSel = document.getElementById("plan");
  document.querySelectorAll("[data-plan]").forEach(function (a) {
    a.addEventListener("click", function () {
      if (planSel) planSel.value = a.getAttribute("data-plan");
    });
  });
  var qp = new URLSearchParams(location.search).get("plan");
  if (qp && planSel) planSel.value = qp;
})();
