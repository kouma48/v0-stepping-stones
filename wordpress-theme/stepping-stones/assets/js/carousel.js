/**
 * Stepping Stones Theme - Hero Carousel
 */

(function() {
    'use strict';

    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.hero-slide');
    const dots = carousel.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    const playPauseBtn = document.getElementById('hero-playpause');
    const iconPause = playPauseBtn ? playPauseBtn.querySelector('.icon-pause') : null;
    const iconPlay = playPauseBtn ? playPauseBtn.querySelector('.icon-play') : null;

    const AUTOPLAY_INTERVAL = 7000;
    const TRANSITION_DURATION = 1200;
    const kenBurnsClasses = ['animate-ken-burns-1', 'animate-ken-burns-2', 'animate-ken-burns-3', 'animate-ken-burns-4'];

    let currentIndex = 0;
    let isPlaying = true;
    let isTransitioning = false;
    let autoplayTimer = null;

    // Apply Ken Burns animation to active slide image
    function applyKenBurns(index) {
        const slide = slides[index];
        if (!slide) return;
        
        const img = slide.querySelector('img');
        if (!img) return;

        // Remove all Ken Burns classes
        kenBurnsClasses.forEach(function(cls) {
            img.classList.remove(cls);
        });

        // Add appropriate class based on index
        const kenBurnsClass = kenBurnsClasses[index % kenBurnsClasses.length];
        img.classList.add(kenBurnsClass);
    }

    function goToSlide(index) {
        if (isTransitioning) return;
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        isTransitioning = true;

        // Update slides
        slides.forEach(function(slide, i) {
            slide.classList.toggle('active', i === index);
        });

        // Update dots
        dots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === index);
        });

        // Apply Ken Burns effect
        applyKenBurns(index);

        currentIndex = index;

        // Reset transition lock
        setTimeout(function() {
            isTransitioning = false;
        }, TRANSITION_DURATION);

        // Restart autoplay timer
        if (isPlaying) {
            startAutoplay();
        }
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
        if (autoplayTimer) {
            clearTimeout(autoplayTimer);
        }
        autoplayTimer = setTimeout(nextSlide, AUTOPLAY_INTERVAL);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearTimeout(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function togglePlayPause() {
        isPlaying = !isPlaying;
        
        if (iconPause && iconPlay) {
            iconPause.style.display = isPlaying ? 'block' : 'none';
            iconPlay.style.display = isPlaying ? 'none' : 'block';
        }

        if (playPauseBtn) {
            playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause autoplay' : 'Resume autoplay');
        }

        if (isPlaying) {
            startAutoplay();
        } else {
            stopAutoplay();
        }
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    dots.forEach(function(dot, i) {
        dot.addEventListener('click', function() {
            goToSlide(i);
        });
    });

    // Randomize starting slide
    const randomStart = Math.floor(Math.random() * slides.length);
    goToSlide(randomStart);

    // Start autoplay
    startAutoplay();

})();
