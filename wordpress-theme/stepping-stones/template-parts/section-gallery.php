<?php
/**
 * Scroll Gallery Section
 *
 * @package Stepping_Stones
 */

$gallery_images = array(
    array(
        'src'     => get_template_directory_uri() . '/assets/images/gallery-1.jpg',
        'alt'     => 'Students in burgundy blazers walking across the school lawn',
        'caption' => 'Our Campus Community',
    ),
    array(
        'src'     => get_template_directory_uri() . '/assets/images/gallery-2.jpg',
        'alt'     => 'Teacher guiding students in computer lab',
        'caption' => 'Technology & Learning',
    ),
    array(
        'src'     => get_template_directory_uri() . '/assets/images/gallery-3.jpg',
        'alt'     => 'Students walking across manicured school grounds',
        'caption' => 'Growth & Development',
    ),
    array(
        'src'     => get_template_directory_uri() . '/assets/images/gallery-4.jpg',
        'alt'     => 'Students gathered around campfire at night',
        'caption' => 'Building Connections',
    ),
    array(
        'src'     => get_template_directory_uri() . '/assets/images/gallery-5.jpg',
        'alt'     => 'Students playing basketball on school court',
        'caption' => 'Sports & Athletics',
    ),
    array(
        'src'     => get_template_directory_uri() . '/assets/images/gallery-6.jpg',
        'alt'     => 'School building with large trees',
        'caption' => 'Heritage & Excellence',
    ),
);
?>

<section class="scroll-gallery">
    <!-- Gallery Images -->
    <div class="gallery-slides">
        <?php foreach ($gallery_images as $index => $image) : ?>
        <div class="gallery-slide <?php echo $index === 0 ? 'active' : ''; ?>" data-index="<?php echo esc_attr($index); ?>">
            <img 
                src="<?php echo esc_url($image['src']); ?>" 
                alt="<?php echo esc_attr($image['alt']); ?>"
                loading="lazy"
            >
            <div class="gallery-overlay">
                <h3 class="gallery-caption font-serif"><?php echo esc_html($image['caption']); ?></h3>
            </div>
        </div>
        <?php endforeach; ?>
    </div>

    <!-- Navigation Arrows -->
    <button class="gallery-nav gallery-prev" aria-label="Previous image">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    </button>
    <button class="gallery-nav gallery-next" aria-label="Next image">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    </button>

    <!-- Dot Indicators -->
    <div class="gallery-dots">
        <?php foreach ($gallery_images as $index => $image) : ?>
        <button 
            class="gallery-dot <?php echo $index === 0 ? 'active' : ''; ?>" 
            data-index="<?php echo esc_attr($index); ?>"
            aria-label="Go to image <?php echo esc_attr($index + 1); ?>"
        ></button>
        <?php endforeach; ?>
    </div>

    <!-- Image Counter -->
    <div class="gallery-counter">
        <span class="gallery-current">1</span> / <span class="gallery-total"><?php echo count($gallery_images); ?></span>
    </div>
</section>
