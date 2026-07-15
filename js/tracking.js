/* ============================================================
   GREAT BAY PRESSURE WASH — Tracking loader
   Reads /data/tracking.json (edited via /admin -> Site Settings ->
   Tracking & Pixels) and installs whatever is configured.

   Blank field = that tag is simply not installed.
   Wrapped in try/catch throughout: a bad tag must never take the
   site down.
   ============================================================ */
(function () {
  'use strict';

  function injectRaw(html, target) {
    if (!html || !html.trim() || !target) return;
    var tpl = document.createElement('template');
    tpl.innerHTML = html;
    // Scripts parsed via innerHTML are inert; rebuild them so they run.
    Array.prototype.forEach.call(tpl.content.querySelectorAll('script'), function (old) {
      var s = document.createElement('script');
      Array.prototype.forEach.call(old.attributes, function (a) { s.setAttribute(a.name, a.value); });
      s.text = old.textContent;
      old.parentNode.replaceChild(s, old);
    });
    target.appendChild(tpl.content);
  }

  function metaPixel(id) {
    /* Standard Meta Pixel base code, per Meta Events Manager. */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', id);
    window.fbq('track', 'PageView');

    onBody(function (body) {
      var ns = document.createElement('noscript');
      var img = document.createElement('img');
      img.height = 1; img.width = 1; img.style.display = 'none';
      img.src = 'https://www.facebook.com/tr?id=' + encodeURIComponent(id) + '&ev=PageView&noscript=1';
      ns.appendChild(img);
      body.insertBefore(ns, body.firstChild);
    });
  }

  function gtagBootstrap(id) {
    if (!window.__gtagLoaded) {
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.__gtagLoaded = true;
    }
    window.gtag('config', id);
  }

  function onBody(fn) {
    if (document.body) { fn(document.body); return; }
    document.addEventListener('DOMContentLoaded', function () { fn(document.body); });
  }

  fetch('/data/tracking.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (cfg) {
      if (!cfg) return;

      if (cfg.meta_pixel_id && cfg.meta_pixel_id.trim()) {
        try { metaPixel(cfg.meta_pixel_id.trim()); } catch (e) {}
      }
      if (cfg.ga4_id && cfg.ga4_id.trim()) {
        try { gtagBootstrap(cfg.ga4_id.trim()); } catch (e) {}
      }
      if (cfg.google_ads_id && cfg.google_ads_id.trim()) {
        try { gtagBootstrap(cfg.google_ads_id.trim()); } catch (e) {}
      }
      if (cfg.head_code) {
        try { injectRaw(cfg.head_code, document.head); } catch (e) {}
      }
      if (cfg.body_code) {
        try { onBody(function (b) { injectRaw(cfg.body_code, b); }); } catch (e) {}
      }
    })
    .catch(function () { /* tracking must never break the page */ });
})();
