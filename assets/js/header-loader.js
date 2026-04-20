// Header Loader - Fügt den globalen Header in alle Seiten ein
(function() {
  // Nicht auf der index.html laden
  if (window.location.pathname.includes('index.html') || 
      window.location.pathname.endsWith('/') ||
      window.location.pathname === '') {
    return;
  }
  
  // Body Layout CSS für sticky footer
  const bodyCSS = `
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding-top: 60px;
    }
    .page-content {
      flex: 1;
    }
  `;
  const bodyStyleEl = document.createElement('style');
  bodyStyleEl.textContent = bodyCSS;
  document.head.appendChild(bodyStyleEl);

  // Hauptinhalt in Wrapper packen
  const mainContent = document.body.innerHTML;
  document.body.innerHTML = `<div class="page-content">${mainContent}</div>`;

  // CSS direkt einfügen - EXAKT wie in index.html
  const css = `
    .global-header {
      background: linear-gradient(135deg, #172033 0%, #22304a 100%);
      color: #fff;
      padding: 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.15);
    }
    
    .header-container {
      width: 100%;
      height: 60px;
      position: relative;
      box-sizing: border-box;
    }

    .header-logo {
      position: absolute;
      left: 24px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      white-space: nowrap;
    }

    .logo-icon { font-size: 24px; }

    .header-nav {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      gap: 4px;
      align-items: center;
    }
    
    .nav-dropdown {
      position: relative;
    }
    
    .nav-btn {
      background: transparent;
      border: none;
      color: rgba(255,255,255,0.85);
      padding: 10px 14px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      border-radius: 8px;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    
    .nav-btn:hover {
      background: rgba(255,255,255,0.1);
      color: #fff;
    }
    
    .dropdown-content {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background: #fff;
      min-width: 220px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(15, 23, 42, 0.15);
      padding: 8px;
      padding-top: 12px;
      margin-top: 0;
    }
    
    .dropdown-content::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 20px;
      width: 12px;
      height: 12px;
      background: #fff;
      transform: rotate(45deg);
    }
    
    .nav-dropdown:hover .dropdown-content {
      display: block;
    }

    /* Alle Dropdowns nach links ausrichten */
    .nav-dropdown .dropdown-content {
      left: auto;
      right: 0;
    }

    .nav-dropdown .dropdown-content::before {
      left: auto;
      right: 20px;
    }
    
    .dropdown-content a {
      display: block;
      padding: 10px 14px;
      color: #172033;
      text-decoration: none;
      font-size: 14px;
      border-radius: 8px;
      transition: all 0.15s ease;
    }
    
    .dropdown-content a:hover {
      background: #f1f5f9;
      color: #225ea8;
    }
    
    .header-search {
      margin-right: 16px;
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .search-icon {
      position: absolute;
      left: 10px;
      font-size: 14px;
      opacity: 0.7;
      pointer-events: none;
    }
    
    .header-search .search-input {
      width: 200px;
      min-height: 36px;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 8px;
      padding: 8px 12px 8px 32px;
      font-size: 14px;
      background: rgba(255,255,255,0.1);
      color: #fff;
      transition: all 0.2s ease;
    }
    
    .header-search .search-input::placeholder {
      color: rgba(255,255,255,0.6);
    }
    
    .header-search .search-input:focus {
      outline: none;
      border-color: rgba(255,255,255,0.5);
      background: rgba(255,255,255,0.15);
      width: 260px;
    }
    
    /* Such-Icon - Standard: neben Logo */
    .search-toggle {
      position: absolute;
      left: 240px;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 8px;
      padding: 10px 12px;
      color: #fff;
      cursor: pointer;
      font-size: 18px;
      transition: all 0.2s ease;
      z-index: 1001;
    }

    .search-toggle:hover {
      background: rgba(255,255,255,0.2);
    }

    /* Such-Overlay */
    .search-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(23, 32, 51, 0.98);
      z-index: 2000;
      justify-content: center;
      align-items: flex-start;
      padding-top: 100px;
    }

    .search-overlay.active {
      display: flex;
    }

    .search-overlay-content {
      width: 90%;
      max-width: 600px;
      position: relative;
    }

    .search-overlay-input {
      width: 100%;
      padding: 16px 24px;
      font-size: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 12px;
      background: rgba(255,255,255,0.1);
      color: #fff;
      outline: none;
    }

    .search-overlay-input::placeholder {
      color: rgba(255,255,255,0.6);
    }

    .search-overlay-input:focus {
      border-color: rgba(255,255,255,0.6);
      background: rgba(255,255,255,0.15);
    }

    .search-overlay-close {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
      opacity: 0.7;
    }

    .search-overlay-close:hover {
      opacity: 1;
    }

    /* Hamburger Menü */
    .hamburger-menu {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      display: none;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 8px;
      padding: 10px 12px;
      color: #fff;
      cursor: pointer;
      font-size: 18px;
      z-index: 1002;
    }

    .hamburger-menu:hover {
      background: rgba(255,255,255,0.2);
    }

    /* Mobile Navigation Overlay */
    .mobile-nav-overlay {
      display: none;
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      background: #172033;
      z-index: 999;
      padding: 20px;
      overflow-y: auto;
    }

    .mobile-nav-overlay.active {
      display: block;
    }

    .mobile-nav-section {
      margin-bottom: 24px;
    }

    .mobile-nav-title {
      color: rgba(255,255,255,0.6);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .mobile-nav-links {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mobile-nav-links a {
      color: #fff;
      text-decoration: none;
      padding: 12px 16px;
      border-radius: 8px;
      background: rgba(255,255,255,0.05);
      transition: all 0.2s ease;
    }

    .mobile-nav-links a:hover {
      background: rgba(255,255,255,0.1);
    }

    @media (max-width: 1100px) {
      .header-nav { display: none; }
      .hamburger-menu { display: block; }
      .search-toggle { right: 62px; left: auto; }
    }
  `;
  
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  
  // Header HTML erstellen - EXAKT wie in index.html
  const headerHTML = `
    <header class="global-header">
      <div class="header-container">
        <a href="index.html" class="header-logo">
          <span class="logo-icon">📊</span>
          <span class="logo-text">Analyse Tools</span>
        </a>
        
        <button class="search-toggle" id="searchToggle" title="Suche öffnen">🔍</button>
        <button class="hamburger-menu" id="hamburgerMenu" title="Menü öffnen">☰</button>

        <nav class="header-nav">
          <div class="header-search">
            <span class="search-icon">🔍</span>
            <input id="searchInput" class="search-input" type="text" placeholder="Tool suchen..." />
          </div>
          <div class="nav-dropdown">
            <button class="nav-btn">Strategie ▼</button>
            <div class="dropdown-content">
              <a href="SWOT-Analyse.html">SWOT Analyse</a>
              <a href="PESTEL-Analyse.html">PESTEL Analyse</a>
              <a href="Five Forces Analyse.html">Five Forces</a>
              <a href="BCG Matrix.html">BCG Matrix</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">Marketing ▼</button>
            <div class="dropdown-content">
              <a href="Customer Journey Map.html">Customer Journey</a>
              <a href="Buyer Persona Tool.html">Buyer Persona</a>
              <a href="Marketing-ROI Rechner.html">Marketing-ROI</a>
              <a href="AB-Test Rechner.html">A/B-Test</a>
              <a href="4P Marketing-Mix.html">4P Marketing-Mix</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">E-Commerce ▼</button>
            <div class="dropdown-content">
              <a href="Customer Lifetime Value Rechner.html">CLV Rechner</a>
              <a href="Customer Acquisition Cost Analyse.html">CAC Analyse</a>
              <a href="Retourenanalyse.html">Retourenanalyse</a>
              <a href="Preisgestaltungs-Analyse.html">Preisgestaltung</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">Entscheidung ▼</button>
            <div class="dropdown-content">
              <a href="Cost-Benefit Analyse.html">Cost-Benefit</a>
              <a href="Nutzwertanalyse.html">Nutzwertanalyse</a>
              <a href="Feature-Scoring.html">Feature Scoring</a>
              <a href="Projektbewertung.html">Projektbewertung</a>
              <a href="Maßnahmenbewertung.html">Maßnahmenbewertung</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">Performance ▼</button>
            <div class="dropdown-content">
              <a href="KPI Analyse.html">KPI Analyse</a>
              <a href="Funnel Analyse.html">Funnel Analyse</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">Risiko ▼</button>
            <div class="dropdown-content">
              <a href="Risikoanalyse.html">Risikoanalyse</a>
              <a href="Priorisierungstool.html">Priorisierung</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">Intern ▼</button>
            <div class="dropdown-content">
              <a href="Stakeholder-Analyse.html">Stakeholder</a>
              <a href="Prozessanalyse.html">Prozessanalyse</a>
              <a href="Ressourcen-Planung.html">Ressourcen</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">Extern ▼</button>
            <div class="dropdown-content">
              <a href="Wettbewerbsanalyse.html">Wettbewerb</a>
              <a href="Marktsegmentierung.html">Marktsegmentierung</a>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <!-- Such-Overlay -->
    <div class="search-overlay" id="searchOverlay">
      <div class="search-overlay-content">
        <input type="text" class="search-overlay-input" id="overlaySearchInput" placeholder="Tool suchen..." />
        <button class="search-overlay-close" id="searchOverlayClose">✕</button>
      </div>
    </div>

    <!-- Mobile Navigation Overlay -->
    <div class="mobile-nav-overlay" id="mobileNavOverlay">
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Strategie</div>
        <div class="mobile-nav-links">
          <a href="SWOT-Analyse.html">SWOT Analyse</a>
          <a href="PESTEL-Analyse.html">PESTEL Analyse</a>
          <a href="Five Forces Analyse.html">Five Forces</a>
          <a href="BCG Matrix.html">BCG Matrix</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Marketing</div>
        <div class="mobile-nav-links">
          <a href="Customer Journey Map.html">Customer Journey</a>
          <a href="Buyer Persona Tool.html">Buyer Persona</a>
          <a href="Marketing-ROI Rechner.html">Marketing-ROI</a>
          <a href="AB-Test Rechner.html">A/B-Test</a>
          <a href="4P Marketing-Mix.html">4P Marketing-Mix</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">E-Commerce</div>
        <div class="mobile-nav-links">
          <a href="Customer Lifetime Value Rechner.html">CLV Rechner</a>
          <a href="Customer Acquisition Cost Analyse.html">CAC Analyse</a>
          <a href="Retourenanalyse.html">Retourenanalyse</a>
          <a href="Preisgestaltungs-Analyse.html">Preisgestaltung</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Entscheidung</div>
        <div class="mobile-nav-links">
          <a href="Cost-Benefit Analyse.html">Cost-Benefit</a>
          <a href="Nutzwertanalyse.html">Nutzwertanalyse</a>
          <a href="Feature-Scoring.html">Feature Scoring</a>
          <a href="Projektbewertung.html">Projektbewertung</a>
          <a href="Maßnahmenbewertung.html">Maßnahmenbewertung</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Performance</div>
        <div class="mobile-nav-links">
          <a href="KPI Analyse.html">KPI Analyse</a>
          <a href="Funnel Analyse.html">Funnel Analyse</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Risiko</div>
        <div class="mobile-nav-links">
          <a href="Risikoanalyse.html">Risikoanalyse</a>
          <a href="Priorisierungstool.html">Priorisierung</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Intern</div>
        <div class="mobile-nav-links">
          <a href="Stakeholder-Analyse.html">Stakeholder</a>
          <a href="Prozessanalyse.html">Prozessanalyse</a>
          <a href="Ressourcen-Planung.html">Ressourcen</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Extern</div>
        <div class="mobile-nav-links">
          <a href="Wettbewerbsanalyse.html">Wettbewerb</a>
          <a href="Marktsegmentierung.html">Marktsegmentierung</a>
        </div>
      </div>
    </div>
  `;
  
  // Header einfügen
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  
  // Footer CSS - EXAKT wie in index.html
  const footerCSS = `
    .global-footer {
      background: #172033;
      color: rgba(255,255,255,0.7);
      padding: 20px;
    }
    
    .footer-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .footer-left {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
    }

    .footer-left a {
      color: rgba(255,255,255,0.7);
      text-decoration: none;
    }

    .footer-left a:hover { color: #fff; }

    .footer-separator {
      opacity: 0.3;
    }

    .footer-right {
      font-size: 13px;
      opacity: 0.8;
    }

    @media (max-width: 960px) {
      .footer-container {
        flex-direction: column;
        text-align: center;
      }

      .footer-left {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `;
  
  const footerStyleEl = document.createElement('style');
  footerStyleEl.textContent = footerCSS;
  document.head.appendChild(footerStyleEl);
  
  // Footer HTML - EXAKT wie in index.html
  const footerHTML = `
    <footer class="global-footer">
      <div class="footer-container">
        <div class="footer-left">
          <span>© 2026 SK Analyse Tools</span>
          <span class="footer-separator">|</span>
          <a href="impressum.html">Impressum</a>
          <span class="footer-separator">|</span>
          <a href="datenschutz.html">Datenschutz</a>
        </div>
        <div class="footer-right">
          <span>🔒 Daten nur lokal im Browser gespeichert – Keine Server-Speicherung</span>
        </div>
      </div>
    </footer>
  `;
  
  // Footer einfügen
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  
  // Cookie/LocalStorage Hinweis
  if (!localStorage.getItem('cookie_consent')) {
    const banner = document.createElement('div');
    banner.innerHTML = `
      <div class="cookie-banner" style="
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #172033;
        color: #fff;
        padding: 16px 20px;
        font-size: 14px;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
      ">
        <span>🔒 Diese Seite speichert Daten lokal in deinem Browser (LocalStorage), um die Eingaben zu sichern. Keine Daten werden an Server übertragen.</span>
        <button class="cookie-btn" style="
          background: #fff;
          color: #172033;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          white-space: nowrap;
        ">Verstanden</button>
      </div>
    `;
    document.body.appendChild(banner);
    
    banner.querySelector('.cookie-btn').addEventListener('click', () => {
      localStorage.setItem('cookie_consent', 'true');
      banner.remove();
    });
  }
  
  // Such-Overlay Toggle
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchOverlayClose = document.getElementById('searchOverlayClose');
  const overlaySearchInput = document.getElementById('overlaySearchInput');

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      if (overlaySearchInput) overlaySearchInput.focus();
    });

    if (searchOverlayClose) {
      searchOverlayClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
      });
    }

    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchOverlay.classList.remove('active');
      }
    });
  }

  // Mobile Navigation Toggle
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');

  if (hamburgerMenu && mobileNavOverlay) {
    hamburgerMenu.addEventListener('click', () => {
      mobileNavOverlay.classList.toggle('active');
    });

    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileNavOverlay.classList.remove('active');
      }
    });
  }
  
  // Click handler für Dropdowns
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dropdown = btn.nextElementSibling;
      const isOpen = dropdown.style.display === 'block';
      
      // Alle schließen
      document.querySelectorAll('.dropdown-content').forEach(d => {
        d.style.display = 'none';
      });
      
      // Diesen öffnen wenn er zu war
      if (!isOpen) {
        dropdown.style.display = 'block';
      }
    });
  });
  
  // Außerhalb klicken schließt Dropdowns
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.dropdown-content').forEach(d => {
        d.style.display = 'none';
      });
    }
  });
})();
