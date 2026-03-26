<?php
/**
 * Hero Carousel Section
 *
 * @package Stepping_Stones
 */

// Hero slides data - can be made dynamic via Customizer or ACF
$hero_slides = array(
    array(
        'image'   => get_template_directory_uri() . '/assets/images/hero-1.jpg',
        'heading' => 'Nurturing Principled Hearts',
    ),
    array(
        'image'   => get_template_directory_uri() . '/assets/images/hero-2.jpg',
        'heading' => 'Brilliant Minds in the Making',
    ),
    array(
        'image'   => get_template_directory_uri() . '/assets/images/hero-3.jpg',
        'heading' => 'Every Child Finds Their Stage',
    ),
    array(
        'image'   => get_template_directory_uri() . '/assets/images/hero-4.jpg',
        'heading' => 'Hands-On Learning Experience',
    ),
    array(
        'image'   => get_template_directory_uri() . '/assets/images/hero-5.jpg',
        'heading' => 'Community & Leadership',
    ),
    array(
        'image'   => get_template_directory_uri() . '/assets/images/hero-6.jpg',
        'heading' => 'Technology & Innovation',
    ),
);
?>

<section class="hero-carousel" aria-label="Hero carousel">
    <!-- Slides Container -->
    <div class="hero-slides">
        <?php foreach ($hero_slides as $index => $slide) : ?>
        <div class="hero-slide <?php echo $index === 0 ? 'active' : ''; ?>" data-index="<?php echo esc_attr($index); ?>">
            <div class="hero-slide-image">
                <img 
                    src="<?php echo esc_url($slide['image']); ?>" 
                    alt="<?php echo esc_attr($slide['heading']); ?>"
                    loading="<?php echo $index === 0 ? 'eager' : 'lazy'; ?>"
                >
            </div>
            <!-- Gradient overlays -->
            <div class="hero-overlay-bottom"></div>
            <div class="hero-overlay-top"></div>
        </div>
        <?php endforeach; ?>
    </div>

    <!-- Centered Text Content -->
    <div class="hero-content">
        <h1 class="hero-heading font-serif">Impact Starts Here</h1>
        <div class="hero-arrow animate-bounce">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="8 12 16 20 24 12"></polyline>
            </svg>
        </div>
    </div>

    <!-- Right Edge Dot Indicators -->
    <div class="hero-dots">
        <?php foreach ($hero_slides as $index => $slide) : ?>
        <button 
            class="hero-dot <?php echo $index === 0 ? 'active' : ''; ?>" 
            data-index="<?php echo esc_attr($index); ?>"
            aria-label="Go to slide <?php echo esc_attr($index + 1); ?>"
        ></button>
        <?php endforeach; ?>
    </div>

    <!-- Bottom Right Controls -->
    <div class="hero-controls">
        <button class="hero-control-btn" id="hero-prev" aria-label="Previous slide">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>
        <button class="hero-control-btn" id="hero-next" aria-label="Next slide">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </button>
        <span class="hero-control-divider"></span>
        <button class="hero-control-btn" id="hero-playpause" aria-label="Pause autoplay">
            <svg class="icon-pause" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
            <svg class="icon-play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
                <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
        </button>
    </div>
</section>
