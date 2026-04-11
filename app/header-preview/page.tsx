'use client';

import { useState, useEffect } from 'react';

export default function HeaderPreview() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const menuItems = [
    { title: 'About Us', submenu: ['Welcome Message', 'Our Story', 'Our Leadership', 'Our Campus', 'Careers'], image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4219-PjvUy4VQ7yQrEJF9T1NTuIlxjnKzrp.jpg' },
    { title: 'Academics', submenu: ['Kindergarten', 'Lower Primary', 'Upper Primary', 'Junior Secondary', 'Learning Support', 'Beyond Classroom'], image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4754-AhfjvtchhsLEcDDAb3gKneB8EhVPRW.jpg' },
    { title: 'Admissions', submenu: ['Why Stepping Stones', 'Admissions Process', 'Apply Now', 'Fees Structure', 'Book a Visit'], image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4801-1fqYCvYi05mWOyhCtnQTVINJLeFbHV.jpg' },
    { title: 'School Life', submenu: ['Daily Life', 'Co-curricular Programs', 'Student Development', 'Student Well Being'], image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_3729-p7kXtNozwyiIYyDW9N3Ns06ZwoV8kA.jpg' },
    { title: 'News', submenu: [], image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4673-KIiKnUrkK5Hu00YfKWLA3D5olxwI6Y.jpg' },
    { title: 'Events', submenu: [], image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4219-PjvUy4VQ7yQrEJF9T1NTuIlxjnKzrp.jpg' }
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  return (
    <div>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
        
        @font-face {
          font-family: 'Roxborough CF';
          src: url('https://blob.v0.app/YQfLD.ttf') format('truetype');
        }
        
        body {
          font-family: 'Montserrat', sans-serif;
        }
        
        /* Header */
        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(8px);
          padding: 24px 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 160px;
          transition: height 0.5s ease, background 0.5s ease;
        }
        
        header.scrolled {
          height: 80px;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(16px);
        }
        
        .header-left {
          display: flex;
          gap: 28px;
          flex: 1;
        }
        
        .header-left a {
          color: rgba(255,255,255,0.9);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s;
          position: relative;
        }
        
        .header-left a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #c11f1e;
          transition: width 0.3s;
        }
        
        .header-left a:hover::after {
          width: 100%;
        }
        
        header.scrolled .header-left a {
          color: #1a1a2e;
        }
        
        .header-logo {
          position: absolute;
          left: 50%;
          top: 16px;
          transform: translateX(-50%);
          transition: top 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        header.scrolled .header-logo {
          top: 50%;
          transform: translate(-50%, -50%);
        }
        
        .header-logo img {
          width: 120px;
          height: 120px;
          object-fit: contain;
          transition: width 0.5s, height 0.5s;
        }
        
        header.scrolled .header-logo img {
          width: 50px;
          height: 50px;
        }
        
        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          justify-content: flex-end;
        }
        
        .header-right span {
          color: rgba(255,255,255,0.9);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        
        header.scrolled .header-right span {
          color: #1a1a2e;
        }
        
        .menu-btn {
          background: none;
          border: none;
          color: rgba(255,255,255,0.9);
          font-size: 24px;
          cursor: pointer;
          padding: 8px;
          transition: color 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        
        .menu-btn span {
          display: block;
          width: 24px;
          height: 1.5px;
          background: currentColor;
          margin: 2px 0;
        }
        
        .menu-btn span:nth-child(2) {
          width: 16px;
        }
        
        header.scrolled .menu-btn {
          color: #1a1a2e;
        }
        
        /* Mega menu modal */
        .megamenu {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: #fff;
          display: flex;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s, visibility 0.3s;
        }
        
        .megamenu.open {
          opacity: 1;
          visibility: visible;
        }
        
        /* Left image panel */
        .menu-image {
          width: 50%;
          overflow: hidden;
          background: #e5e5e5;
        }
        
        .menu-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Right content panel */
        .menu-content {
          width: 50%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        /* Utility bar */
        .menu-util {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 40px;
          border-bottom: 1px solid #e5e5e5;
        }
        
        .menu-util nav {
          display: flex;
          gap: 40px;
        }
        
        .menu-util a {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #666;
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .menu-util a:hover {
          color: #000;
        }
        
        .close-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #000;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .close-btn:hover {
          background: #333;
        }
        
        /* Navigation body */
        .menu-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        
        .menu-nav {
          width: 50%;
          padding: 56px 40px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          border-right: 1px solid #e5e5e5;
          overflow-y: auto;
        }
        
        .menu-nav button {
          background: none;
          border: none;
          font-family: 'Roxborough CF', serif;
          font-size: 36px;
          font-weight: 400;
          color: #000;
          text-align: left;
          cursor: pointer;
          padding: 0 0 8px 0;
          position: relative;
          transition: color 0.2s;
        }
        
        .menu-nav button:hover {
          color: #c11f1e;
        }
        
        .menu-nav button.active {
          color: #c11f1e;
        }
        
        .menu-nav button.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: calc(100% - 80px);
          height: 2px;
          background: #c11f1e;
        }
        
        /* Submenu */
        .menu-submenu {
          width: 50%;
          padding: 56px 40px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
          position: relative;
        }
        
        .menu-submenu::before {
          content: '';
          position: absolute;
          top: 56px;
          left: 0;
          width: 2px;
          height: 0;
          background: #c11f1e;
          transition: height 0.3s ease;
        }
        
        .menu-submenu.has-items::before {
          height: 24px;
        }
        
        .menu-submenu a {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #666;
          text-decoration: none;
          transition: color 0.2s;
          position: relative;
          padding-left: 16px;
        }
        
        .menu-submenu a::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 0;
          background: #c11f1e;
          transition: height 0.2s;
        }
        
        .menu-submenu a:hover {
          color: #c11f1e;
        }
        
        .menu-submenu a:hover::before {
          height: 14px;
        }
        
        /* CTA bar */
        .menu-cta {
          display: flex;
          background: #c11f1e;
          margin-top: auto;
        }
        
        .menu-cta a {
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
          text-decoration: none;
          border-right: 1px solid rgba(255,255,255,0.15);
          transition: background 0.2s;
        }
        
        .menu-cta a:last-child {
          border-right: none;
        }
        
        .menu-cta a:hover {
          background: rgba(0,0,0,0.15);
        }
        
        /* Preview content */
        .preview-content {
          margin-top: 160px;
          padding: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: calc(100vh - 160px);
          color: #fff;
          transition: margin-top 0.5s ease;
        }
        
        header.scrolled ~ .preview-content {
          margin-top: 80px;
        }
        
        .preview-content h2 {
          font-size: 48px;
          font-weight: 300;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .preview-content p {
          text-align: center;
          font-size: 16px;
          opacity: 0.9;
        }
      `}</style>

      {/* Header */}
      <header>
        <div className="header-left">
          <a href="#">INQUIRE</a>
          <a href="#">VISIT</a>
          <a href="#">APPLY</a>
        </div>

        <div className="header-logo">
          <img src="https://v0-stepping-stones-gamma.vercel.app/images/logo-white.png" alt="Stepping Stones" />
        </div>

        <div className="header-right">
          <span>MENU</span>
          <button className="menu-btn" onClick={() => setMenuOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mega Menu */}
      <div className={`megamenu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-image">
          <img src={menuItems[activeItem].image} alt={menuItems[activeItem].title} />
        </div>

        <div className="menu-content">
          {/* Utility bar */}
          <div className="menu-util">
            <nav>
              <a href="#">NEWS</a>
              <a href="#">EVENTS</a>
              <a href="#">CAREERS</a>
              <a href="#">CONTACT</a>
            </nav>
            <button className="close-btn" onClick={() => setMenuOpen(false)}>✕</button>
          </div>

          {/* Navigation and submenu */}
          <div className="menu-body">
            <nav className="menu-nav">
              {menuItems.map((item, i) => (
                <button
                  key={i}
                  className={activeItem === i ? 'active' : ''}
                  onClick={() => setActiveItem(i)}
                  onMouseEnter={() => setActiveItem(i)}
                >
                  {item.title}
                </button>
              ))}
            </nav>

            <div className={`menu-submenu ${menuItems[activeItem].submenu.length > 0 ? 'has-items' : ''}`}>
              {menuItems[activeItem].submenu.map((item, i) => (
                <a key={i} href="#">{item}</a>
              ))}
            </div>
          </div>

          {/* CTA bar */}
          <div className="menu-cta">
            <a href="#">📞 INQUIRE</a>
            <a href="#">📍 VISIT</a>
            <a href="#">✈ APPLY</a>
          </div>
        </div>
      </div>

      {/* Preview content */}
      <div className="preview-content">
        <h2>Header Preview</h2>
        <p>Click the MENU button in the top-left to see the mega menu in action.</p>
      </div>
    </div>
  );
}
