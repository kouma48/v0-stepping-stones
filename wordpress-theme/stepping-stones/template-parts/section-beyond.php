<?php
/**
 * Beyond the Classroom Section
 *
 * @package Stepping_Stones
 */

$tabs = array(
    array(
        'id'          => 'athletics',
        'label'       => 'Sports & Athletics',
        'eyebrow'     => 'SPORTS & ATHLETICS',
        'title'       => 'Champions in Body and Spirit',
        'boldIntro'   => 'Excellence starts on the field.',
        'description' => 'Through competitive sport, Stepping Stones students build resilience, teamwork, and the lifelong discipline that defines great character.',
        'ctaText'     => 'View Programmes',
        'ctaHref'     => home_url('/co-curricular-programs/'),
        'image'       => get_template_directory_uri() . '/assets/images/beyond-athletics.jpg',
    ),
    array(
        'id'          => 'arts',
        'label'       => 'Performing Arts',
        'eyebrow'     => 'PERFORMING ARTS',
        'title'       => 'Creative Minds, Bold Voices',
        'boldIntro'   => 'Artistry begins with courage.',
        'description' => 'Through music, drama, and dance, Stepping Stones students discover their unique creative voice and learn the power of passionate self-expression.',
        'ctaText'     => 'View Programmes',
        'ctaHref'     => home_url('/co-curricular-programs/'),
        'image'       => get_template_directory_uri() . '/assets/images/beyond-arts.jpg',
    ),
    array(
        'id'          => 'pastoral',
        'label'       => 'Pastoral Care',
        'eyebrow'     => 'PASTORAL CARE',
        'title'       => 'Principled Hearts, Guided Growth',
        'boldIntro'   => 'Character is cultivated with care.',
        'description' => 'Our pastoral team nurtures emotional well-being and moral character, ensuring every child feels deeply valued, safe, and supported throughout their journey.',
        'ctaText'     => 'View Programmes',
        'ctaHref'     => home_url('/student-well-being/'),
        'image'       => get_template_directory_uri() . '/assets/images/beyond-pastoral.jpg',
    ),
    array(
        'id'          => 'development',
        'label'       => 'Student Development',
        'eyebrow'     => 'STUDENT DEVELOPMENT',
        'title'       => 'Leaders for Tomorrow',
        'boldIntro'   => 'Change begins with vision.',
        'description' => 'Through leadership clubs, life skills training, and global engagement, Stepping Stones equips students with the tools to make a profound impact in the world.',
        'ctaText'     => 'View Programmes',
        'ctaHref'     => home_url('/student-development/'),
        'image'       => get_template_directory_uri() . '/assets/images/beyond-development.jpg',
    ),
    array(
        'id'          => 'service',
        'label'       => 'Community Service',
        'eyebrow'     => 'COMMUNITY SERVICE',
        'title'       => 'Compassion in Action',
        'boldIntro'   => 'Service shapes leaders.',
        'description' => 'Putting empathy into action, our students engage in meaningful community service that builds character and creates lasting positive impact beyond the school gates.',
        'ctaText'     => 'View Programmes',
        'ctaHref'     => home_url('/student-development/'),
        'image'       => get_template_directory_uri() . '/assets/images/beyond-service.jpg',
    ),
);
?>

<section class="beyond-section">
    <!-- Header -->
    <div class="beyond-header">
        <p class="beyond-eyebrow">Life at Stepping Stones</p>
        <h2 class="beyond-heading font-serif">
            A <em>well-balanced</em> experience
        </h2>
        <p class="beyond-subheading font-serif">
            Where every child is known, valued and inspired
        </p>
    </div>

    <!-- Main Split Panel -->
    <div class="beyond-container">
        <!-- Tab Bar -->
        <div class="beyond-tabs">
            <?php foreach ($tabs as $index => $tab) : ?>
            <button 
                class="beyond-tab <?php echo $index === 0 ? 'active' : ''; ?>" 
                data-tab="<?php echo esc_attr($tab['id']); ?>"
                type="button"
            >
                <?php echo esc_html($tab['label']); ?>
            </button>
            <?php endforeach; ?>
        </div>

        <!-- Content Grid -->
        <div class="beyond-content">
            <!-- Left: Image Panel -->
            <div class="beyond-image-panel">
                <?php foreach ($tabs as $index => $tab) : ?>
                <div class="beyond-image <?php echo $index === 0 ? 'active' : ''; ?>" data-tab="<?php echo esc_attr($tab['id']); ?>">
                    <img 
                        src="<?php echo esc_url($tab['image']); ?>" 
                        alt="<?php echo esc_attr($tab['title']); ?>"
                        loading="lazy"
                    >
                </div>
                <?php endforeach; ?>
            </div>

            <!-- Right: Content Card -->
            <?php foreach ($tabs as $index => $tab) : ?>
            <div class="beyond-card <?php echo $index === 0 ? 'active' : ''; ?>" data-tab="<?php echo esc_attr($tab['id']); ?>">
                <div class="beyond-card-top">
                    <div class="beyond-card-eyebrow">
                        <span><?php echo esc_html($tab['eyebrow']); ?></span>
                        <div class="beyond-card-line"></div>
                    </div>
                    <h3 class="beyond-card-title font-serif"><?php echo esc_html($tab['title']); ?></h3>
                    <p class="beyond-card-intro"><?php echo esc_html(strtoupper($tab['boldIntro'])); ?></p>
                    <p class="beyond-card-desc"><?php echo esc_html($tab['description']); ?></p>
                </div>
                <a href="<?php echo esc_url($tab['ctaHref']); ?>" class="beyond-card-cta">
                    <span><?php echo esc_html($tab['ctaText']); ?></span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
