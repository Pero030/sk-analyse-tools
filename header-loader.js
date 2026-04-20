// Header und Footer Loader für Analyse Tools
// Dieses Script lädt den Header und Footer dynamisch in alle Tool-Seiten

(function() {
  // Header HTML
  const headerHTML = `
  <header style="background: #ffffff; border-bottom: 1px solid #d8e1ec; padding: 12px 0; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);">
    <div style="max-width: 1400px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; gap: 24px;">
      
      <!-- Logo -->
      <a href="../../index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #172033; font-weight: 700; font-size: 20px; white-space: nowrap;">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style="flex-shrink: 0;">
          <rect width="32" height="32" rx="8" fill="#172033"/>
          <path d="M8 12h16M8 16h12M8 20h8" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Analyse Tools
      </a>
      
      <!-- Desktop Navigation -->
      <nav style="display: flex; align-items: center; gap: 8px; flex: 1; justify-content: center;">
        
        <!-- Strategie Dropdown -->
        <div class="nav-dropdown" style="position: relative;">
          <button class="nav-btn" style="background: transparent; border: none; padding: 10px 16px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 500; color: #5b6678; transition: all 0.2s; display: flex; align-items: center; gap: 6px;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">
            Strategie ▼
          </button>
          <div class="dropdown-content" style="display: none; position: absolute; top: 100%; left: 0; background: #ffffff; border: 1px solid #d8e1ec; border-radius: 12px; padding: 8px; min-width: 200px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12); margin-top: 8px;">
            <a href="../../tools/swot-analyse/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">SWOT Analyse</a>
            <a href="../../tools/pestel-analyse/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">PESTEL Analyse</a>
            <a href="../../tools/five-forces/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">Five Forces</a>
            <a href="../../tools/bcg-matrix/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">BCG Matrix</a>
          </div>
        </div>
        
        <!-- Marketing Dropdown -->
        <div class="nav-dropdown" style="position: relative;">
          <button class="nav-btn" style="background: transparent; border: none; padding: 10px 16px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 500; color: #5b6678; transition: all 0.2s; display: flex; align-items: center; gap: 6px;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">
            Marketing ▼
          </button>
          <div class="dropdown-content" style="display: none; position: absolute; top: 100%; left: 0; background: #ffffff; border: 1px solid #d8e1ec; border-radius: 12px; padding: 8px; min-width: 200px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12); margin-top: 8px;">
            <a href="../../tools/customer-journey/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">Customer Journey</a>
            <a href="../../tools/buyer-persona/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">Buyer Persona</a>
            <a href="../../tools/marketing-roi/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">Marketing-ROI</a>
            <a href="../../tools/ab-test/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">A/B-Test</a>
            <a href="../../tools/marketing-mix/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">4P Marketing-Mix</a>
          </div>
        </div>
        
        <!-- E-Commerce Dropdown -->
        <div class="nav-dropdown" style="position: relative;">
          <button class="nav-btn" style="background: transparent; border: none; padding: 10px 16px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 500; color: #5b6678; transition: all 0.2s; display: flex; align-items: center; gap: 6px;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">
            E-Commerce ▼
          </button>
          <div class="dropdown-content" style="display: none; position: absolute; top: 100%; left: 0; background: #ffffff; border: 1px solid #d8e1ec; border-radius: 12px; padding: 8px; min-width: 200px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12); margin-top: 8px;">
            <a href="../../tools/clv-rechner/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">CLV Rechner</a>
            <a href="../../tools/cac-analyse/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">CAC Analyse</a>
            <a href="../../tools/retourenanalyse/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">Retourenanalyse</a>
            <a href="../../tools/preisgestaltung/" style="display: block; padding: 10px 14px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9';this.style.color='#172033'" onmouseout="this.style.background='transparent';this.style.color='#5b6678'">Preisgestaltung</a>
          </div>
        </div>
        
      </nav>
      
      <!-- Mobile Menu Button -->
      <button id="mobileMenuBtn" style="display: none; background: transparent; border: none; padding: 8px; cursor: pointer; border-radius: 8px;" onclick="toggleMobileMenu()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#172033" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    <div id="mobileMenu" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: #ffffff; border-top: 1px solid #d8e1ec; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12); padding: 16px 24px;">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="font-weight: 600; color: #172033; padding: 8px 0;">Strategie</div>
        <a href="../../tools/swot-analyse/" style="padding: 8px 16px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 6px;">SWOT Analyse</a>
        <a href="../../tools/pestel-analyse/" style="padding: 8px 16px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 6px;">PESTEL Analyse</a>
        <a href="../../tools/five-forces/" style="padding: 8px 16px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 6px;">Five Forces</a>
        <a href="../../tools/bcg-matrix/" style="padding: 8px 16px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 6px;">BCG Matrix</a>
        
        <div style="font-weight: 600; color: #172033; padding: 8px 0; margin-top: 8px;">Marketing</div>
        <a href="../../tools/customer-journey/" style="padding: 8px 16px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 6px;">Customer Journey</a>
        <a href="../../tools/buyer-persona/" style="padding: 8px 16px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 6px;">Buyer Persona</a>
        <a href="../../tools/marketing-roi/" style="padding: 8px 16px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 6px;">Marketing-ROI</a>
        
        <div style="font-weight: 600; color: #172033; padding: 8px 0; margin-top: 8px;">E-Commerce</div>
        <a href="../../tools/clv-rechner/" style="padding: 8px 16px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 6px;">CLV Rechner</a>
        <a href="../../tools/cac-analyse/" style="padding: 8px 16px; text-decoration: none; color: #5b6678; font-size: 14px; border-radius: 6px;">CAC Analyse</a>
      </div>
    </div>
  </header>
  
  <style>
    @media (max-width: 1024px) {
      #mobileMenuBtn { display: block !important; }
      nav { display: none !important; }
    }
    
    .nav-dropdown:hover .dropdown-content { display: block !important; }
  </style>
  
  <script>
    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
  </script>
  `;

  // Footer HTML
  const footerHTML = `
  <footer style="background: #ffffff; border-top: 1px solid #d8e1ec; padding: 40px 0 24px; margin-top: auto;">
    <div style="max-width: 1400px; margin: 0 auto; padding: 0 24px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px; margin-bottom: 32px;">
        
        <!-- Logo & Beschreibung -->
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: #172033; font-weight: 700; font-size: 18px;">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#172033"/>
              <path d="M8 12h16M8 16h12M8 20h8" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Analyse Tools
          </div>
          <p style="color: #5b6678; font-size: 14px; line-height: 1.6; margin: 0;">
            Professionelle Analyse-Tools für strategische Entscheidungen, Marketing und E-Commerce.
          </p>
        </div>
        
        <!-- Links -->
        <div>
          <h4 style="color: #172033; font-size: 14px; font-weight: 600; margin: 0 0 16px 0;">Kategorien</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <a href="../../index.html#strategie" style="color: #5b6678; text-decoration: none; font-size: 14px;">Strategie</a>
            <a href="../../index.html#marketing" style="color: #5b6678; text-decoration: none; font-size: 14px;">Marketing</a>
            <a href="../../index.html#ecommerce" style="color: #5b6678; text-decoration: none; font-size: 14px;">E-Commerce</a>
          </div>
        </div>
        
        <!-- Rechtliches -->
        <div>
          <h4 style="color: #172033; font-size: 14px; font-weight: 600; margin: 0 0 16px 0;">Rechtliches</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <a href="../../impressum.html" style="color: #5b6678; text-decoration: none; font-size: 14px;">Impressum</a>
            <a href="../../datenschutz.html" style="color: #5b6678; text-decoration: none; font-size: 14px;">Datenschutz</a>
          </div>
        </div>
        
      </div>
      
      <!-- Copyright -->
      <div style="border-top: 1px solid #d8e1ec; padding-top: 24px; text-align: center;">
        <p style="color: #5b6678; font-size: 13px; margin: 0;">
          © 2026 Analyse Tools. Alle Rechte vorbehalten.
        </p>
      </div>
    </div>
  </footer>
  `;

  // Header und Footer einfügen
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  
  // Body Styling
  document.body.style.minHeight = '100vh';
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
  
})();
