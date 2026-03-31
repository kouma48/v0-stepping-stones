/**
 * Stepping Stones Theme - Main JavaScript
 */

(function() {
    'use strict';

    // ============================================
    // HEADER SCROLL BEHAVIOR
    // ============================================
    
    const header = document.getElementById('ss-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // MEGA MENU
    // ============================================
    
    const megamenu = document.getElementById('ss-megamenu');
    const openBtn = document.getElementById('ss-open-btn');
    const closeBtn = document.getElementById('ss-close-btn');
    const navCol = document.getElementById('ss-nav-col');
    const connector = document.getElementById('ss-connector');

    const submenus = [
        document.getElementById('ss-sub-0'),
        document.getElementById('ss-sub-1'),
        document.getElementById('ss-sub-2'),
        document.getElementById('ss-sub-3')
    ];

    const mobileSubmenus = [
        document.getElementById('ss-mob-0'),
        document.getElementById('ss-mob-1'),
        document.getElementById('ss-mob-2'),
        document.getElementById('ss-mob-3')
    ];

    const menuImages = [
        document.getElementById('ss-img-0'),
        document.getElementById('ss-img-1'),
        document.getElementById('ss-img-2'),
        document.getElementById('ss-img-3'),
        document.getElementById('ss-img-4'),
        document.getElementById('ss-img-5')
    ];

    if (openBtn && megamenu) {
        openBtn.addEventListener('click', function() {
            megamenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn && megamenu) {
        closeBtn.addEventListener('click', function() {
            megamenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Navigation item interactions
    if (navCol) {
        const navItems = navCol.querySelectorAll('.ss-nav-item[data-index]');
        
        navItems.forEach(function(item) {
            item.addEventListener('click', function() {
                const idx = parseInt(item.getAttribute('data-index'));
                
                // Update active state
                navItems.forEach(function(n) { n.classList.remove('active'); });
                item.classList.add('active');

                // Show corresponding submenu (desktop)
                submenus.forEach(function(s) { if(s) s.classList.remove('visible'); });
                if (idx < submenus.length && submenus[idx]) {
                    submenus[idx].classList.add('visible');
                    
                    // Position connector line
                    if (connector) {
                        const rect = item.getBoundingClientRect();
                        const navRect = navCol.getBoundingClientRect();
                        connector.style.top = (rect.top - navRect.top + 12) + 'px';
                        connector.style.width = '48px';
                        connector.style.opacity = '1';
                    }
                }

                // Toggle mobile submenu
                mobileSubmenus.forEach(function(m) { if(m) m.classList.remove('open'); });
                if (idx < mobileSubmenus.length && mobileSubmenus[idx]) {
                    mobileSubmenus[idx].classList.add('open');
                }

                // Update background image
                menuImages.forEach(function(img) { if(img) img.classList.remove('active'); });
                if (menuImages[idx]) menuImages[idx].classList.add('active');
            });
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && megamenu && megamenu.classList.contains('open')) {
            megamenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // SCROLL GALLERY
    // ============================================
    
    const gallery = document.querySelector('.scroll-gallery');
    
    if (gallery) {
        const slides = gallery.querySelectorAll('.gallery-slide');
        const dots = gallery.querySelectorAll('.gallery-dot');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        const currentEl = gallery.querySelector('.gallery-current');
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach(function(s, i) {
                s.classList.toggle('active', i === index);
            });
            dots.forEach(function(d, i) {
                d.classList.toggle('active', i === index);
            });
            if (currentEl) {
                currentEl.textContent = index + 1;
            }
            currentIndex = index;
        }

        function nextSlide() {
            showSlide((currentIndex + 1) % slides.length);
        }

        function prevSlide() {
            showSlide((currentIndex - 1 + slides.length) % slides.length);
        }

        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        dots.forEach(function(dot, i) {
            dot.addEventListener('click', function() {
                showSlide(i);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });
    }

    // ============================================
    // BEYOND CLASSROOM TABS
    // ============================================
    
    const beyondSection = document.querySelector('.beyond-section');
    
    if (beyondSection) {
        const tabs = beyondSection.querySelectorAll('.beyond-tab');
        const images = beyondSection.querySelectorAll('.beyond-image');
        const cards = beyondSection.querySelectorAll('.beyond-card');

        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                const tabId = tab.getAttribute('data-tab');
                
                // Update active states
                tabs.forEach(function(t) { t.classList.remove('active'); });
                tab.classList.add('active');

                images.forEach(function(img) { img.classList.remove('active'); });
                beyondSection.querySelector('.beyond-image[data-tab="' + tabId + '"]').classList.add('active');

                cards.forEach(function(card) { card.classList.remove('active'); });
                beyondSection.querySelector('.beyond-card[data-tab="' + tabId + '"]').classList.add('active');
            });
        });
    }

    // ============================================
    // NEWS CAROUSEL
    // ============================================
    
    const newsCarousel = document.querySelector('.news-carousel');
    
    if (newsCarousel) {
        const slides = newsCarousel.querySelectorAll('.news-slide');
        const dots = newsCarousel.querySelectorAll('.news-dot');
        const prevBtn = newsCarousel.querySelector('.news-prev');
        const nextBtn = newsCarousel.querySelector('.news-next');
        let currentSlide = 0;

        function showNewsSlide(index) {
            slides.forEach(function(s, i) {
                s.classList.toggle('active', i === index);
            });
            dots.forEach(function(d, i) {
                d.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        function nextNewsSlide() {
            showNewsSlide((currentSlide + 1) % slides.length);
        }

        function prevNewsSlide() {
            showNewsSlide((currentSlide - 1 + slides.length) % slides.length);
        }

        if (prevBtn) prevBtn.addEventListener('click', prevNewsSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextNewsSlide);
        
        dots.forEach(function(dot, i) {
            dot.addEventListener('click', function() {
                showNewsSlide(i);
            });
        });
    }

})();
