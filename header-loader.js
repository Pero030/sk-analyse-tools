// Global Header and Footer Loader for Analyse Tools
(function() {
  'use strict';

  // Detect if we're on a tool page or index page
  const path = window.location.pathname;
  const isToolPage = path.includes('/tools/');
  const basePath = isToolPage ? '../../' : './';

  // CSS Styles - EXACT copy from index.html
  const styles = `
    <style>
      /* Global Header Styles - Dark Theme */
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
      
      .search-toggle {
        position: absolute;
        left: 240px;
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
      
      /* Hamburger Menu */
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
        transition: all 0.2s ease;
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
        background: rgba(23, 32, 51, 0.98);
        z-index: 999;
        padding: 20px;
        overflow-y: auto;
      }
      
      .mobile-nav-overlay.active {
        display: block;
      }
      
      .mobile-nav-section {
        margin-bottom: 20px;
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
        padding: 10px 0;
        font-size: 16px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }
      
      .mobile-nav-links a:hover {
        color: rgba(255,255,255,0.8);
      }
      
      @media (max-width: 1100px) {
        .header-nav { display: none; }
        .hamburger-menu { display: block; }
        .search-toggle {
          left: auto;
          right: 70px;
          display: block;
        }
      }
      
      /* Footer Styles */
      .global-footer {
        background: #172033;
        color: rgba(255,255,255,0.7);
        padding: 20px;
      }
      
      .footer-container {
        max-width: 1400px;
        margin: 0 auto;
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
      
      .footer-left a:hover {
        color: #fff;
      }
      
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
      }
    </style>
  `;

  // Header HTML - EXACT copy from index.html with dynamic paths
  const headerHTML = `
    <header class="global-header">
      <div class="header-container">
        <a href="${basePath}index.html" class="header-logo">
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
              <a href="${basePath}tools/swot-analyse/">SWOT Analyse</a>
              <a href="${basePath}tools/pestel-analyse/">PESTEL Analyse</a>
              <a href="${basePath}tools/five-forces/">Five Forces</a>
              <a href="${basePath}tools/bcg-matrix/">BCG Matrix</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">Marketing ▼</button>
            <div class="dropdown-content">
              <a href="${basePath}tools/customer-journey/">Customer Journey</a>
              <a href="${basePath}tools/buyer-persona/">Buyer Persona</a>
              <a href="${basePath}tools/marketing-roi/">Marketing-ROI</a>
              <a href="${basePath}tools/ab-test/">A/B-Test</a>
              <a href="${basePath}tools/marketing-mix/">4P Marketing-Mix</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">E-Commerce ▼</button>
            <div class="dropdown-content">
              <a href="${basePath}tools/clv-rechner/">CLV Rechner</a>
              <a href="${basePath}tools/cac-analyse/">CAC Analyse</a>
              <a href="${basePath}tools/retourenanalyse/">Retourenanalyse</a>
              <a href="${basePath}tools/preisgestaltung/">Preisgestaltung</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">Entscheidung ▼</button>
            <div class="dropdown-content">
              <a href="${basePath}tools/cost-benefit/">Cost-Benefit</a>
              <a href="${basePath}tools/nutzwertanalyse/">Nutzwertanalyse</a>
              <a href="${basePath}tools/feature-scoring/">Feature Scoring</a>
              <a href="${basePath}tools/projektbewertung/">Projektbewertung</a>
              <a href="${basePath}tools/massnahmenbewertung/">Maßnahmenbewertung</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">Performance ▼</button>
            <div class="dropdown-content">
              <a href="${basePath}tools/kpi-analyse/">KPI Analyse</a>
              <a href="${basePath}tools/funnel-analyse/">Funnel Analyse</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">Risiko ▼</button>
            <div class="dropdown-content">
              <a href="${basePath}tools/risikoanalyse/">Risikoanalyse</a>
              <a href="${basePath}tools/priorisierung/">Priorisierung</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">Intern ▼</button>
            <div class="dropdown-content">
              <a href="${basePath}tools/stakeholder-analyse/">Stakeholder</a>
              <a href="${basePath}tools/prozessanalyse/">Prozessanalyse</a>
              <a href="${basePath}tools/ressourcen-planung/">Ressourcen</a>
            </div>
          </div>
          
          <div class="nav-dropdown">
            <button class="nav-btn">Extern ▼</button>
            <div class="dropdown-content">
              <a href="${basePath}tools/wettbewerbsanalyse/">Wettbewerb</a>
              <a href="${basePath}tools/marktsegmentierung/">Marktsegmentierung</a>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <!-- Mobile Navigation Overlay -->
    <div class="mobile-nav-overlay" id="mobileNavOverlay">
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Strategie</div>
        <div class="mobile-nav-links">
          <a href="${basePath}tools/swot-analyse/">SWOT Analyse</a>
          <a href="${basePath}tools/pestel-analyse/">PESTEL Analyse</a>
          <a href="${basePath}tools/five-forces/">Five Forces</a>
          <a href="${basePath}tools/bcg-matrix/">BCG Matrix</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Marketing</div>
        <div class="mobile-nav-links">
          <a href="${basePath}tools/customer-journey/">Customer Journey</a>
          <a href="${basePath}tools/buyer-persona/">Buyer Persona</a>
          <a href="${basePath}tools/marketing-roi/">Marketing-ROI</a>
          <a href="${basePath}tools/ab-test/">A/B-Test</a>
          <a href="${basePath}tools/marketing-mix/">4P Marketing-Mix</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">E-Commerce</div>
        <div class="mobile-nav-links">
          <a href="${basePath}tools/clv-rechner/">CLV Rechner</a>
          <a href="${basePath}tools/cac-analyse/">CAC Analyse</a>
          <a href="${basePath}tools/retourenanalyse/">Retourenanalyse</a>
          <a href="${basePath}tools/preisgestaltung/">Preisgestaltung</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Entscheidung</div>
        <div class="mobile-nav-links">
          <a href="${basePath}tools/cost-benefit/">Cost-Benefit</a>
          <a href="${basePath}tools/nutzwertanalyse/">Nutzwertanalyse</a>
          <a href="${basePath}tools/feature-scoring/">Feature Scoring</a>
          <a href="${basePath}tools/projektbewertung/">Projektbewertung</a>
          <a href="${basePath}tools/massnahmenbewertung/">Maßnahmenbewertung</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Performance</div>
        <div class="mobile-nav-links">
          <a href="${basePath}tools/kpi-analyse/">KPI Analyse</a>
          <a href="${basePath}tools/funnel-analyse/">Funnel Analyse</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Risiko</div>
        <div class="mobile-nav-links">
          <a href="${basePath}tools/risikoanalyse/">Risikoanalyse</a>
          <a href="${basePath}tools/priorisierung/">Priorisierung</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Intern</div>
        <div class="mobile-nav-links">
          <a href="${basePath}tools/stakeholder-analyse/">Stakeholder</a>
          <a href="${basePath}tools/prozessanalyse/">Prozessanalyse</a>
          <a href="${basePath}tools/ressourcen-planung/">Ressourcen</a>
        </div>
      </div>
      <div class="mobile-nav-section">
        <div class="mobile-nav-title">Extern</div>
        <div class="mobile-nav-links">
          <a href="${basePath}tools/wettbewerbsanalyse/">Wettbewerb</a>
          <a href="${basePath}tools/marktsegmentierung/">Marktsegmentierung</a>
        </div>
      </div>
    </div>

    <!-- Search Overlay -->
    <div class="search-overlay" id="searchOverlay">
      <div class="search-overlay-content">
        <input type="text" class="search-overlay-input" placeholder="Tool suchen..." id="overlaySearchInput" />
        <button class="search-overlay-close" id="searchOverlayClose">×</button>
      </div>
    </div>
  `;

  // Footer HTML - EXACT copy from index.html with dynamic paths
  const footerHTML = `
    <footer class="global-footer">
      <div class="footer-container">
        <div class="footer-left">
          <span>© 2026 SK Analyse Tools</span>
          <span class="footer-separator">|</span>
          <a href="${basePath}impressum.html">Impressum</a>
          <span class="footer-separator">|</span>
          <a href="${basePath}datenschutz.html">Datenschutz</a>
        </div>
        <div class="footer-right">
          <span>🔒 Daten nur lokal im Browser gespeichert – Keine Server-Speicherung</span>
        </div>
      </div>
    </footer>
  `;

  // JavaScript for functionality
  const script = `
    <script>
      (function() {
        // Hamburger Menu Toggle
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        
        if (hamburgerMenu && mobileNavOverlay) {
          hamburgerMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.toggle('active');
          });
        }
        
        // Search functionality
        const searchToggle = document.getElementById('searchToggle');
        const searchOverlay = document.getElementById('searchOverlay');
        const searchOverlayClose = document.getElementById('searchOverlayClose');
        const overlaySearchInput = document.getElementById('overlaySearchInput');
        const searchInput = document.getElementById('searchInput');
        
        if (searchToggle && searchOverlay) {
          searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            if (overlaySearchInput) overlaySearchInput.focus();
          });
        }
        
        if (searchOverlayClose && searchOverlay) {
          searchOverlayClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
          });
        }
        
        if (searchOverlay) {
          searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
              searchOverlay.classList.remove('active');
            }
          });
        }
        
        // Desktop search input
        if (searchInput) {
          searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              const query = searchInput.value.toLowerCase();
              if (query) {
                window.location.href = '${basePath}index.html?search=' + encodeURIComponent(query);
              }
            }
          });
        }
        
        // Overlay search input
        if (overlaySearchInput) {
          overlaySearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              const query = overlaySearchInput.value.toLowerCase();
              if (query) {
                window.location.href = '${basePath}index.html?search=' + encodeURIComponent(query);
              }
            }
          });
        }
      })();
    </script>
  `;

  // Insert everything
  document.head.insertAdjacentHTML('beforeend', styles);
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML + script);
  
  // Body padding for fixed header
  document.body.style.paddingTop = '60px';
})();
