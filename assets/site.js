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

  // Estilos encapsulados y prioritarios para que reglas antiguas del menú
  // no puedan mostrar los enlaces permanentemente ni alterar el botón.
  if (!document.getElementById('course-dropdown-styles')) {
    const style = document.createElement('style');
    style.id = 'course-dropdown-styles';
    style.textContent = `
      .menu .nav-dropdown{position:relative!important;display:flex!important;align-items:center!important;height:100%!important;flex:0 0 auto!important;min-width:max-content!important}
      .menu .nav-dropdown-trigger{appearance:none!important;-webkit-appearance:none!important;display:inline-flex!important;align-items:center!important;gap:9px!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;color:inherit!important;font:inherit!important;font-size:14px!important;font-weight:650!important;line-height:1.4!important;white-space:nowrap!important;cursor:pointer!important}
      .menu .nav-dropdown-trigger:after{content:""!important;display:inline-block!important;flex:0 0 7px!important;width:7px!important;height:7px!important;border:0!important;border-right:1.5px solid currentColor!important;border-bottom:1.5px solid currentColor!important;background:transparent!important;transform:rotate(45deg)!important;transition:transform .2s!important}
      .menu .nav-dropdown-trigger:hover,.menu .nav-dropdown-trigger.active{color:var(--red,#c91420)!important}
      .menu .nav-dropdown.is-open .nav-dropdown-trigger:after{transform:rotate(225deg)!important}
      .menu .nav-dropdown-panel{display:none!important;position:absolute!important;top:100%!important;left:0!important;right:auto!important;min-width:290px!important;max-width:min(360px,90vw)!important;margin:0!important;padding:8px!important;flex-direction:column!important;align-items:stretch!important;gap:2px!important;background:#fff!important;border:1px solid #e3e8f0!important;border-radius:10px!important;box-shadow:0 14px 35px rgba(8,37,90,.16)!important;z-index:99999!important}
      .menu .nav-dropdown.is-open .nav-dropdown-panel{display:flex!important}
      .menu .nav-dropdown-panel a{display:block!important;position:static!important;width:100%!important;box-sizing:border-box!important;margin:0!important;padding:11px 12px!important;border:0!important;border-radius:7px!important;background:transparent!important;color:#14213d!important;text-decoration:none!important;font-size:13px!important;font-weight:500!important;line-height:1.4!important;white-space:normal!important}
      .menu .nav-dropdown-panel a:hover,.menu .nav-dropdown-panel a.active{background:#f5f8fc!important;color:#c91420!important}
      @media(max-width:1000px){
        .menu .nav-dropdown{display:block!important;width:100%!important;height:auto!important;min-width:0!important}
        .menu .nav-dropdown-trigger{display:flex!important;width:100%!important;padding:12px 0!important;text-align:left!important}
        .menu .nav-dropdown-panel{position:static!important;left:auto!important;right:auto!important;min-width:0!important;max-width:none!important;margin:0 0 8px!important;padding:5px 0 5px 12px!important;border:0!important;border-left:2px solid #e3e8f0!important;border-radius:0!important;box-shadow:none!important}
        .menu .nav-dropdown-panel a{padding:10px 8px!important}
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
  trigger.setAttribute('aria-haspopup', 'true');

  const panel = document.createElement('div');
  panel.className = 'nav-dropdown-panel';
  panel.id = 'course-level-menu';
  trigger.setAttribute('aria-controls', panel.id);

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

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && wrapper.classList.contains('is-open')) {
      wrapper.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }
  });
})();
