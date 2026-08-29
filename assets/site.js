const toggle=document.querySelector('.mobile-toggle');
const menu=document.querySelector('.menu');
if(toggle&&menu){
  toggle.addEventListener('click',()=>{
    const open=menu.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded',open?'true':'false');
  });
}

/* =========================
   CONSENTIMIENTO DE COOKIES
   ========================= */

(function () {
  const CONSENT_KEY = 'ecole_cookie_consent';

  function loadGoogleAnalytics() {
    if (window.ecoleGA_loaded) return;
    window.ecoleGA_loaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-3QLVRV8MDZ';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', 'G-3QLVRV8MDZ');
  }

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
          <button id="cookie-reject" type="button">Rechazar</button>
          <button id="cookie-accept" type="button">Aceptar</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    document
      .getElementById('cookie-accept')
      .addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        loadGoogleAnalytics();
        banner.remove();
      });

    document
      .getElementById('cookie-reject')
      .addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'rejected');
        banner.remove();
      });
  }

  const consent = localStorage.getItem(CONSENT_KEY);

  if (consent === 'accepted') {
    loadGoogleAnalytics();
  } else if (!consent) {
    createCookieBanner();
  }
})();
