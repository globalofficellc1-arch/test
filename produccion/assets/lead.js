/* Captura de leads compartida.
   - Completa los links de WhatsApp (atributo data-wa="mensaje").
   - Envía los formularios con data-lead-form al endpoint de GO_CONFIG,
     sumando la landing de origen y los parámetros UTM / fbclid / gclid. */
(function () {
  var cfg = window.GO_CONFIG || {};

  function waLink(msg) {
    return "https://wa.me/" + (cfg.whatsapp || "") + "?text=" + encodeURIComponent(msg || "Hola, quiero información sobre GlobalOffice LLC.");
  }

  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = waLink(a.getAttribute("data-wa"));
    a.target = "_blank";
    a.rel = "noopener";
  });

  var params = new URLSearchParams(location.search);
  var tracking = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"].forEach(function (k) {
    if (params.get(k)) tracking[k] = params.get(k);
  });

  document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var data = Object.fromEntries(new FormData(form).entries());
      data.landing = form.getAttribute("data-lead-form");
      data.page_url = location.href;
      data.submitted_at = new Date().toISOString();
      Object.assign(data, tracking);

      var btn = form.querySelector("button[type=submit]");
      if (btn) { btn.disabled = true; btn.textContent = "Enviando…"; }

      var send = cfg.leadEndpoint
        ? fetch(cfg.leadEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        : Promise.resolve(console.info("[GlobalOffice · modo prueba] Lead capturado (no enviado):", data));

      send.catch(function (err) { console.error("Error enviando lead", err); }).then(function () {
        form.style.display = "none";
        var ok = form.parentElement.querySelector(".ok");
        if (ok) ok.style.display = "block";
        if (cfg.openWhatsAppAfterSubmit) {
          window.open(waLink("Hola, soy " + (data.nombre || "") + ". Acabo de dejar mis datos en la web y quiero avanzar con mi LLC."), "_blank");
        }
      });
    });
  });
})();
