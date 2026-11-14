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

  // Estilos propios del desplegable: evitan que el menú dependa de una
  // versión antigua o cacheada de la hoja de estilos principal.
  if (!document.getElementById('course-dropdown-styles')) {
    const style = document.createElement('style');
    style.id = 'course-dropdown-styles';
    style.textContent = `
      .menu .nav-dropdown{position:relative;display:flex;align-items:center;height:100%;flex:0 0 auto}
      .menu .nav-dropdown-trigger{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;gap:9px;margin:0;padding:0;border:0;background:transparent;color:inherit;font:inherit;font-size:14px;font-weight:650;line-height:1.4;white-space:nowrap;cursor:pointer}
      .menu .nav-dropdown-trigger:after{content:"";width:7px;height:7px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:rotate(45deg);transition:transform .2s}
      .menu .nav-dropdown-trigger:hover,.menu .nav-dropdown-trigger.active{color:var(--red,#c91420)}
      .menu .nav-dropdown.is-open .nav-dropdown-trigger:after{transform:rotate(225deg)}
      .menu .nav-dropdown-panel{display:none;position:absolute;top:calc(100% - 1px);left:0;min-width:290px;max-width:min(360px,90vw);padding:8px;background:#fff;border:1px solid #e3e8f0;border-radius:10px;box-shadow:0 14px 35px rgba(8,37,90,.16);z-index:9999}
      .menu .nav-dropdown.is-open .nav-dropdown-panel{display:block}
      .menu .nav-dropdown-panel a{display:block;width:100%;box-sizing:border-box;padding:11px 12px;border-radius:7px;color:#14213d;text-decoration:none;font-size:13px;line-height:1.4;white-space:normal}
      .menu .nav-dropdown-panel a:hover,.menu .nav-dropdown-panel a.active{background:#f5f8fc;color:#c91420}
      @media(max-width:1000px){
        .menu .nav-dropdown{display:block;width:100%;height:auto}
        .menu .nav-dropdown-trigger{display:flex;width:100%;padding:12px 0;text-align:left}
        .menu .nav-dropdown-panel{position:static;min-width:0;max-width:none;margin:0 0 8px;padding:5px 0 5px 12px;border:0;border-left:2px solid #e3e8f0;border-radius:0;box-shadow:none}
        .menu .nav-dropdown-panel a{padding:10px 8px}
      }
    `;
    document.head.appendChild(style);
  }

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

  levels.forEach(([label, path]) => {
    const item = document.createElement('a');
    item.href = path;
    item.textContent = label;
    if (window.location.pathname.replace(/\/$/, '') === path.replace(/\/$/, '')) {
      item.classList.add('active');
      trigger.classList.add('active');
      item.setAttribute('aria-current', 'page');
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
