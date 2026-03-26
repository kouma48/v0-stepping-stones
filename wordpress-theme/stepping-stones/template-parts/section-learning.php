<?php
/**
 * Learning Section - Academic Stages
 *
 * @package Stepping_Stones
 */

$stages = array(
    array(
        'id'          => 'earlyyears',
        'label'       => 'Early Years - Kindergarten',
        'description' => 'Where curiosity and character begin',
        'image'       => get_template_directory_uri() . '/assets/images/learning-earlyyears.jpg',
        'href'        => home_url('/kindergarten/'),
    ),
    array(
        'id'          => 'lowerprimary',
        'label'       => 'Lower Primary',
        'description' => 'Laying the foundation for lifelong learning',
        'image'       => get_template_directory_uri() . '/assets/images/learning-lowerprimary.jpg',
        'href'        => home_url('/lower-primary/'),
    ),
    array(
        'id'          => 'upperprimary',
        'label'       => 'Upper Primary',
        'description' => 'Growing confident, creative thinkers',
        'image'       => get_template_directory_uri() . '/assets/images/learning-upperprimary.jpg',
        'href'        => home_url('/upper-primary/'),
    ),
    array(
        'id'          => 'juniorsecondary',
        'label'       => 'Junior Secondary',
        'description' => 'Shaping ethical leaders for tomorrow',
        'image'       => get_template_directory_uri() . '/assets/images/learning-juniorsecondary.jpg',
        'href'        => home_url('/junior-secondary/'),
    ),
);
?>

<section class="learning-section">
    <div class="learning-container">
        <!-- Header -->
        <div class="learning-header">
            <p class="learning-eyebrow">Learning at Stepping Stones</p>
            <h2 class="learning-heading font-serif">
                Where principled hearts and brilliant minds take shape.
            </h2>
        </div>

        <!-- 4-column Grid -->
        <div class="learning-grid">
            <?php foreach ($stages as $stage) : ?>
            <a href="<?php echo esc_url($stage['href']); ?>" class="learning-card" data-id="<?php echo esc_attr($stage['id']); ?>">
                <div class="learning-card-image">
                    <img 
                        src="<?php echo esc_url($stage['image']); ?>" 
                        alt="<?php echo esc_attr($stage['label']); ?>"
                        loading="lazy"
                    >
                </div>
                <div class="learning-card-content">
                    <div class="learning-card-text">
                        <span class="learning-card-label font-serif"><?php echo esc_html($stage['label']); ?></span>
                        <span class="learning-card-desc font-serif"><?php echo esc_html($stage['description']); ?></span>
                    </div>
                    <div class="learning-card-arrow">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>
                </div>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>
