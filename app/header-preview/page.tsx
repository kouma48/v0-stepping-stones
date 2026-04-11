export const metadata = {
  title: 'Header Preview - Stepping Stones',
  description: 'Preview of the navigation header with mega menu',
}

export default function HeaderPreview() {
  return (
    <div>
      <HeaderHTML />
    </div>
  )
}

function HeaderHTML() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ── Reset & base ─────────────────────────────── */
        #ss-header *, #ss-megamenu * { box-sizing: border-box; margin: 0; padding: 0; }
        #ss-header a, #ss-megamenu a { text-decoration: none; color: inherit; }
        #ss-header button, #ss-megamenu button { background: none; border: none; cursor: pointer; font-family: inherit; }

        /* ── Fonts ────────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
        
        @font-face {
          font-family: 'Roxborough CF';
          src: url('https://blob.v0.app/YQfLD.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
        }

        :root {
          --font-sans: 'Montserrat', sans-serif;
          --font-display: 'Roxborough CF', 'Georgia', serif;
        }

        body {
          font-family: var(--font-sans);
          line-height: 1.5;
          margin: 0;
          padding: 0;
        }

        /* ── Header bar ───────────────────────────────── */
        #ss-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9999;
          transition: background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, height 0.5s ease;
          border-bottom: 1px solid transparent;
          background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%);
        }
        #ss-header.scrolled {
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(16px);
          border-bottom-color: rgba(0,0,0,0.08);
          box-shadow: 0 2px 20px rgba(0,0,0,0.06);
        }

        .ss-header-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 56px;
          position: relative;
          display: flex;
          align-items: center;
          height: 160px;
          transition: height 0.5s ease;
        }
        #ss-header.scrolled .ss-header-inner { height: 80px; }

        /* Left CTA links */
        .ss-header-left {
          display: flex;
          align-items: center;
          gap: 28px;
          flex: 1;
        }
        .ss-header-left a {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.92);
          position: relative;
          transition: color 0.3s;
        }
        #ss-header.scrolled .ss-header-left a { color: #1a1a2e; }
        .ss-header-left a::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          height: 1.5px; width: 0;
          background: #c11f1e;
          transition: width 0.3s;
        }
        .ss-header-left a:hover::after { width: 100%; }

        /* Centre logo */
        .ss-header-logo {
          position: absolute;
          left: 50%;
          top: 16px;
          transform: translateX(-50%);
          transition: top 0.5s ease, transform 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 160px;
          height: 160px;
        }
        #ss-header.scrolled .ss-header-logo {
          top: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
        }
        .ss-header-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: width 0.5s, height 0.5s, opacity 0.5s;
        }
        .ss-logo-white  { opacity: 1; }
        .ss-logo-colour { opacity: 0; position: absolute; }
        #ss-header.scrolled .ss-logo-white  { opacity: 0; }
        #ss-header.scrolled .ss-logo-colour { opacity: 1; position: relative; }

        /* Right menu button */
        .ss-header-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          flex: 1;
        }
        .ss-menu-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.92);
          transition: color 0.3s;
        }
        #ss-header.scrolled .ss-menu-label { color: #1a1a2e; }
        .ss-hamburger {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 40px; height: 40px;
        }
        .ss-hamburger span {
          display: block;
          height: 1.5px;
          background: #fff;
          transition: background 0.3s;
        }
        .ss-hamburger span:nth-child(1),
        .ss-hamburger span:nth-child(3) { width: 24px; }
        .ss-hamburger span:nth-child(2) { width: 16px; }
        #ss-header.scrolled .ss-hamburger span { background: #1a1a2e; }

        /* ── Mega menu overlay ────────────────────────── */
        #ss-megamenu {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        #ss-megamenu.open {
          opacity: 1;
          pointer-events: all;
        }

        /* Left image panel */
        .ss-menu-image-panel {
          position: relative;
          width: 50%;
          overflow: hidden;
          background: #e5e5e5;
        }
        .ss-menu-img {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .ss-menu-img.active {
          opacity: 1;
        }
        .ss-menu-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Right content panel */
        .ss-menu-content {
          width: 50%;
          height: 100%;
          background: #fff;
          display: flex;
          flex-direction: column;
        }

        /* Utility bar - minimal */
        .ss-menu-util {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 40px;
          border-bottom: 1px solid #e5e5e5;
        }
        .ss-util-links {
          display: flex;
          gap: 40px;
        }
        .ss-util-links a {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #666;
          transition: color 0.2s;
        }
        .ss-util-links a:hover {
          color: #000;
        }
        .ss-close-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          line-height: 1;
          transition: background 0.2s;
          cursor: pointer;
          border: none;
        }
        .ss-close-btn:hover {
          background: #333;
        }

        /* Main navigation */
        .ss-menu-body {
          display: flex;
          flex: 1;
          overflow: hidden;
          flex-direction: row;
          gap: 0;
        }

        .ss-nav-col {
          width: 50%;
          padding: 56px 40px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          overflow-y: auto;
          border-right: 1px solid #e5e5e5;
        }

        .ss-nav-item {
          display: block;
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 400;
          line-height: 1.2;
          color: #000;
          padding: 0 0 8px 0;
          position: relative;
          transition: color 0.2s;
          text-align: left;
          width: 100%;
          cursor: pointer;
          background: none;
          border: none;
        }
        .ss-nav-item:hover,
        .ss-nav-item.active {
          color: #c11f1e;
        }
        .ss-nav-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background: #c11f1e;
          transition: width 0.3s ease;
        }
        .ss-nav-item.active .ss-nav-underline,
        .ss-nav-item:hover .ss-nav-underline {
          width: calc(100% - 80px);
        }

        /* Submenu column */
        .ss-submenu-col {
          width: 50%;
          padding: 56px 40px;
          display: flex !important;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
        }

        .ss-submenu-links {
          display: none !important;
        }
        .ss-submenu-links.visible {
          display: flex !important;
          flex-direction: column;
          gap: 12px;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .ss-submenu-links a {
          display: block;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
          color: #666;
          padding: 0;
          transition: color 0.2s;
        }
        .ss-submenu-links a:hover {
          color: #000;
        }

        /* Hide connector line and other elements */
        .ss-connector-line,
        .ss-nav-underline,
        .ss-mobile-submenu {
          display: none !important;
        }

        /* Bottom red CTA bar */
        .ss-cta-bar {
          display: flex;
          background: #c11f1e;
          margin-top: auto;
        }
        .ss-cta-bar a {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 28px 20px;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border-right: 1px solid rgba(255,255,255,0.15);
          transition: background 0.2s;
        }
        .ss-cta-bar a:last-child {
          border-right: none;
        }
        .ss-cta-bar a:hover {
          background: rgba(0,0,0,0.15);
        }
        .ss-cta-bar svg {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
        }

        /* ── Mobile responsive ────────────────────────── */
        @media (max-width: 768px) {
          .ss-header-inner { padding: 0 20px; }
          .ss-header-left { display: none; }
          .ss-menu-label { display: none; }
          .ss-menu-image-panel { display: none; }
          .ss-menu-content { width: 100%; }
          .ss-menu-util { padding: 16px 20px; }
          .ss-util-links { display: none; }
          .ss-nav-col { width: 100%; border-right: none; padding: 32px 20px 20px; }
          .ss-submenu-col { display: none; }
          .ss-mobile-submenu {
            display: none !important;
            padding-left: 16px;
            flex-direction: column;
            gap: 2px;
          }
          .ss-mobile-submenu.open { display: flex !important; }
          .ss-mobile-submenu a {
            font-size: 15px;
            font-weight: 400;
            line-height: 1.5;
            color: #c11f1e;
            padding: 8px 0;
          }
          .ss-mobile-submenu a:hover {
            color: #111;
          }
          .ss-cta-bar { flex-direction: column; }
          .ss-cta-bar a { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.2); }
          .ss-cta-bar a:last-child { border-bottom: none; }
        }

        /* ── Preview page styles ────────────────────── */
        #preview-content {
          margin-top: 160px;
          padding: 40px;
          background: #f9f9f9;
        }
      `}} />

      <header id="ss-header">
        <div className="ss-header-inner">
          <div className="ss-header-left">
            <a href="#about">Inquire</a>
            <a href="#academics">Visit</a>
            <a href="#apply">Apply</a>
          </div>
          <a href="#home" className="ss-header-logo" aria-label="Stepping Stones School">
            <img className="ss-logo-white" src="https://v0-stepping-stones-gamma.vercel.app/images/logo-white.png" alt="Stepping Stones School" />
            <img className="ss-logo-colour" src="https://v0-stepping-stones-gamma.vercel.app/images/logo-colour.png" alt="Stepping Stones School" />
          </a>
          <div className="ss-header-right">
            <span className="ss-menu-label">Menu</span>
            <button className="ss-hamburger" id="ss-open-btn" aria-label="Open menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <div id="ss-megamenu" role="dialog" aria-modal="true" aria-label="Site navigation">
        <div className="ss-menu-image-panel">
          <div className="ss-menu-img active" id="ss-img-0">
            <img src="https://v0-stepping-stones-gamma.vercel.app/images/about-us.jpg" alt="About Us" loading="lazy" />
          </div>
          <div className="ss-menu-img" id="ss-img-1">
            <img src="https://v0-stepping-stones-gamma.vercel.app/images/academics.jpg" alt="Academics" loading="lazy" />
          </div>
          <div className="ss-menu-img" id="ss-img-2">
            <img src="https://v0-stepping-stones-gamma.vercel.app/images/admissions.jpg" alt="Admissions" loading="lazy" />
          </div>
          <div className="ss-menu-img" id="ss-img-3">
            <img src="https://v0-stepping-stones-gamma.vercel.app/images/school-life.jpg" alt="School Life" loading="lazy" />
          </div>
          <div className="ss-menu-img" id="ss-img-4">
            <img src="https://v0-stepping-stones-gamma.vercel.app/images/academics.jpg" alt="News" loading="lazy" />
          </div>
          <div className="ss-menu-img" id="ss-img-5">
            <img src="https://v0-stepping-stones-gamma.vercel.app/images/school-life.jpg" alt="Events" loading="lazy" />
          </div>
        </div>

        <div className="ss-menu-content">
          <div className="ss-menu-util">
            <nav className="ss-util-links" aria-label="Utility navigation">
              <a href="#news">News</a>
              <a href="#events">Events</a>
              <a href="#careers">Careers</a>
              <a href="#contact">Contact</a>
            </nav>
            <button className="ss-close-btn" id="ss-close-btn" aria-label="Close menu">&#x2715;</button>
          </div>

          <div className="ss-menu-body">
            <nav className="ss-nav-col" id="ss-nav-col" aria-label="Main navigation">
              <button className="ss-nav-item" data-index="0">
                About Us
                <span className="ss-nav-underline"></span>
              </button>
              <div className="ss-mobile-submenu" id="ss-mob-0">
                <a href="#welcome">Welcome Message</a>
                <a href="#story">Our Story</a>
                <a href="#leadership">Our Leadership</a>
                <a href="#campus">Our Campus</a>
                <a href="#careers">Careers</a>
              </div>

              <button className="ss-nav-item" data-index="1">
                Academics
                <span className="ss-nav-underline"></span>
              </button>
              <div className="ss-mobile-submenu" id="ss-mob-1">
                <a href="#kg">Kindergarten</a>
                <a href="#lp">Lower Primary</a>
                <a href="#up">Upper Primary</a>
                <a href="#js">Junior Secondary</a>
                <a href="#support">Learning Support</a>
                <a href="#beyond">Beyond Classroom</a>
              </div>

              <button className="ss-nav-item" data-index="2">
                Admissions
                <span className="ss-nav-underline"></span>
              </button>
              <div className="ss-mobile-submenu" id="ss-mob-2">
                <a href="#why">Why Stepping Stones</a>
                <a href="#process">Admissions Process</a>
                <a href="#apply-now">Apply Now</a>
                <a href="#fees">Fees Structure</a>
                <a href="#visit">Book a Visit</a>
              </div>

              <button className="ss-nav-item" data-index="3">
                School Life
                <span className="ss-nav-underline"></span>
              </button>
              <div className="ss-mobile-submenu" id="ss-mob-3">
                <a href="#daily">Daily Life</a>
                <a href="#cocurr">Co-curricular Programs</a>
                <a href="#dev">Student Development</a>
                <a href="#wellbeing">Student Well Being</a>
              </div>

              <a className="ss-nav-item" href="#news" data-index="4">
                News
                <span className="ss-nav-underline"></span>
              </a>

              <a className="ss-nav-item" href="#events" data-index="5">
                Events
                <span className="ss-nav-underline"></span>
              </a>
            </nav>

            <div className="ss-submenu-col" id="ss-submenu-col">
              <div className="ss-connector-line" id="ss-connector"></div>

              <div className="ss-submenu-links" id="ss-sub-0">
                <a href="#welcome">Welcome Message</a>
                <a href="#story">Our Story</a>
                <a href="#leadership">Our Leadership</a>
                <a href="#campus">Our Campus</a>
                <a href="#careers">Careers</a>
              </div>

              <div className="ss-submenu-links" id="ss-sub-1">
                <a href="#kg">Kindergarten</a>
                <a href="#lp">Lower Primary</a>
                <a href="#up">Upper Primary</a>
                <a href="#js">Junior Secondary</a>
                <a href="#support">Learning Support</a>
                <a href="#beyond">Beyond Classroom</a>
              </div>

              <div className="ss-submenu-links" id="ss-sub-2">
                <a href="#why">Why Stepping Stones</a>
                <a href="#process">Admissions Process</a>
                <a href="#apply-now">Apply Now</a>
                <a href="#fees">Fees Structure</a>
                <a href="#visit">Book a Visit</a>
              </div>

              <div className="ss-submenu-links" id="ss-sub-3">
                <a href="#daily">Daily Life</a>
                <a href="#cocurr">Co-curricular Programs</a>
                <a href="#dev">Student Development</a>
                <a href="#wellbeing">Student Well Being</a>
              </div>
            </div>
          </div>

          <div className="ss-cta-bar">
            <a href="#inquire">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Inquire
            </a>
            <a href="#visit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Visit
            </a>
            <a href="#apply">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Apply
            </a>
          </div>
        </div>
      </div>

      <div id="preview-content">
        <h1>Header Preview - Stepping Stones</h1>
        <p>Scroll down to see the header in action. The header will collapse when you scroll past 50px.</p>
        <div style={{ height: '200px', background: '#fff', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <h2>Sample Content Section</h2>
          <p>This is sample content to demonstrate the header behavior on scroll.</p>
        </div>
        <div style={{ height: '200px', background: '#fff', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <h2>Another Section</h2>
          <p>Scroll up to see the header change appearance. Hover over the menu items in the mega menu to see images change.</p>
        </div>
        <div style={{ height: '200px', background: '#fff', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <h2>More Content</h2>
          <p>The header is fully responsive and works on mobile devices too.</p>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        (function () {
          var header    = document.getElementById('ss-header');
          var megamenu  = document.getElementById('ss-megamenu');
          var openBtn   = document.getElementById('ss-open-btn');
          var closeBtn  = document.getElementById('ss-close-btn');
          var navCol    = document.getElementById('ss-nav-col');

          var images = [
            document.getElementById('ss-img-0'),
            document.getElementById('ss-img-1'),
            document.getElementById('ss-img-2'),
            document.getElementById('ss-img-3'),
            document.getElementById('ss-img-4'),
            document.getElementById('ss-img-5')
          ];

          // Scroll listener
          window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 50);
          });

          // Open menu - set first image active
          openBtn.addEventListener('click', function () {
            megamenu.classList.add('open');
            document.body.style.overflow = 'hidden';
            images.forEach(function (img) { img.classList.remove('active'); });
            if (images[0]) images[0].classList.add('active');
          });

          // Close menu
          closeBtn.addEventListener('click', function () {
            megamenu.classList.remove('open');
            document.body.style.overflow = '';
          });

          // Nav items - hover changes image and shows submenu
          var navItems = navCol.querySelectorAll('.ss-nav-item[data-index]');
          var submenus = [
            document.getElementById('ss-sub-0'),
            document.getElementById('ss-sub-1'),
            document.getElementById('ss-sub-2'),
            document.getElementById('ss-sub-3')
          ];

          navItems.forEach(function (item, i) {
            item.addEventListener('mouseenter', function () {
              // Update active state
              navItems.forEach(function (n) { n.classList.remove('active'); });
              item.classList.add('active');

              // Change image
              images.forEach(function (img) { img.classList.remove('active'); });
              if (images[i]) images[i].classList.add('active');

              // Show submenu
              submenus.forEach(function (sub) { sub.classList.remove('visible'); });
              if (i < submenus.length && submenus[i]) {
                submenus[i].classList.add('visible');
              }
            });
          });

          // Close menu on escape
          document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && megamenu.classList.contains('open')) {
              megamenu.classList.remove('open');
              document.body.style.overflow = '';
            }
          });

          // Initialize - set first item active
          if (navItems.length > 0) {
            navItems[0].classList.add('active');
            if (submenus[0]) submenus[0].classList.add('visible');
          }
      `}} />
    </>
  )
}
