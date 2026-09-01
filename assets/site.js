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
  window.location

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

    banner.innerHTML = `
      <div class="cookie-content">

        <div class="cookie-text">

          <strong>Cookies y privacidad</strong>

          <p>
            Utilizamos cookies de analítica, como Google Analytics,
            para conocer cómo se utiliza nuestra web y mejorar nuestros contenidos.
            Puedes aceptar o rechazar estas cookies.
            <a href="/politica-cookies/">Más información</a>
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
