const toggle = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}


/* =========================
   CONSENTIMIENTO DE COOKIES
   ========================= */

(function () {

  const CONSENT_KEY = 'ecole_cookie_consent_v2';

  function loadGoogleAnalytics(eventName, eventParams) {

    if (window.ecoleGA_loaded) {

      if (eventName && window.gtag) {
        window.gtag('event', eventName, eventParams || {});
      }

      return;
    }

    window.dataLayer = window.dataLayer || [];

    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', 'G-3QLVRV8MDZ');

    const script = document.createElement('script');

    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-3QLVRV8MDZ';

    document.head.appendChild(script);

    window.ecoleGA_loaded = true;

    if (eventName) {
      window.gtag('event', eventName, eventParams || {});
    }
  }


  /* =========================
     EVENTO FORMULARIO
     ========================= */

  function trackLeadIfNeeded() {
  if (window.location.pathname.includes('/contacto/gracias/')) {

    if (sessionStorage.getItem('ecole_lead_tracked') === 'true') {
      return;
    }

    loadGoogleAnalytics('generate_lead', {
      method: 'formulario_prueba_nivel'
    });

    sessionStorage.setItem('ecole_lead_tracked', 'true');
  }
}


  /* =========================
     BANNER DE COOKIES
     ========================= */

  function createCookieBanner() {

    if (document.getElementById('cookie-banner')) return;

    const banner = document.createElement('div');

    banner.id = 'cookie-banner';
    banner.className = 'cookie-notice';

    banner.innerHTML = `
      <div class="cookie-content">

        <div class="cookie-text">

          <strong>Cookies y privacidad</strong>

          <p>
            Utilizamos cookies de analítica, como Google Analytics,
            para conocer cómo se utiliza nuestra web y mejorar nuestros contenidos.
            Puedes aceptar o rechazar estas cookies.
            <a href="/politica-cookies/">Política de cookies</a>
          </p>

        </div>

        <div class="cookie-actions">

          <button id="cookie-reject" type="button">
            Rechazar
          </button>

          <button id="cookie-accept" type="button">
            Aceptar
          </button>

        </div>

      </div>
    `;

    document.body.appendChild(banner);


    /* =========================
       ACEPTAR COOKIES
       ========================= */

    document
      .getElementById('cookie-accept')
      .addEventListener('click', function () {

        localStorage.setItem(CONSENT_KEY, 'accepted');

        loadGoogleAnalytics();

        trackLeadIfNeeded();

        banner.remove();

      });


    /* =========================
       RECHAZAR COOKIES
       ========================= */

    document
      .getElementById('cookie-reject')
      .addEventListener('click', function () {

        localStorage.setItem(CONSENT_KEY, 'rejected');

        banner.remove();

      });

  }


  /* =========================
     COMPROBAR CONSENTIMIENTO
     ========================= */

  const consent = localStorage.getItem(CONSENT_KEY);


  /* Usuario ya aceptó */
  if (consent === 'accepted') {

    loadGoogleAnalytics();

    trackLeadIfNeeded();

  }


  /* Usuario todavía no ha elegido */
  else if (!consent) {

    createCookieBanner();

  }

})();

// Menú común de niveles: se inserta en todas las páginas que tengan el enlace «Clases».
(function () {
  const menu = document.querySelector('.menu');
  if (!menu) return;

  const classesLink = Array.from(menu.querySelectorAll('a'))
    .find(link => /^(clases|clases online)$/i.test(link.textContent.trim()) ||
      /clases-frances-(online|a1-online|a2-online|b1-online|b2-online)\/?$/.test(link.getAttribute('href') || ''));

  if (!classesLink || classesLink.parentElement.classList.contains('nav-dropdown')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-dropdown';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'nav-dropdown-trigger';
  trigger.textContent = 'Clases online';
  trigger.setAttribute('aria-expanded', 'false');

  const panel = document.createElement('div');
  panel.className = 'nav-dropdown-panel';

  const levels = [
    ['A1 · Francés para principiantes', '/clases-frances-a1-online/'],
    ['A2 · Francés elemental', '/clases-frances-a2-online/'],
    ['B1 · Francés intermedio', '/clases-frances-b1-online/'],
    ['B2 · Francés intermedio avanzado', '/clases-frances-b2-online/']
  ];

  levels.forEach(([label, path], index) => {
    const item = document.createElement('a');
    item.href = path;
    item.textContent = label;
    if (window.location.pathname.replace(/\/$/, '') === path.replace(/\/$/, '')) {
      item.classList.add('active');
      trigger.classList.add('active');
      item.setAttribute('aria-current', 'page');
    }
    if (index === 0) {
      const status = document.createElement('small');
      status.className = 'nav-dropdown-available';
      status.textContent = 'Disponible';
      item.appendChild(status);
    }
    panel.appendChild(item);
  });

  wrapper.append(trigger, panel);
  classesLink.replaceWith(wrapper);

  trigger.addEventListener('click', () => {
    const open = wrapper.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('click', event => {
    if (!wrapper.contains(event.target)) {
      wrapper.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
})();
