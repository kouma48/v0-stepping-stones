<?php
/**
 * News & Events Section
 *
 * @package Stepping_Stones
 */

// Get latest posts for news
$news_query = new WP_Query(array(
    'posts_per_page' => 3,
    'post_type'      => 'post',
    'post_status'    => 'publish',
));

// Fallback news if no posts
$fallback_news = array(
    array(
        'title'   => 'The Nexus of Greatness',
        'author'  => 'Stepping Stones School',
        'date'    => 'Feb 26 2024',
        'excerpt' => "This year has been a defining moment for Stepping Stones' seventh- and eighth-grade students.",
        'image'   => get_template_directory_uri() . '/assets/images/news-1.jpg',
        'link'    => '#',
    ),
    array(
        'title'   => 'Science Fair Excellence',
        'author'  => 'Stepping Stones School',
        'date'    => 'Mar 15 2024',
        'excerpt' => 'Our annual Science Fair showcased remarkable innovation from students across all year groups.',
        'image'   => get_template_directory_uri() . '/assets/images/news-2.jpg',
        'link'    => '#',
    ),
    array(
        'title'   => 'Drama Production Success',
        'author'  => 'Stepping Stones School',
        'date'    => 'Mar 20 2024',
        'excerpt' => 'The spring theatrical production captivated audiences with stunning performances.',
        'image'   => get_template_directory_uri() . '/assets/images/news-3.jpg',
        'link'    => '#',
    ),
);

// Build news array from posts or fallback
$news_items = array();
if ($news_query->have_posts()) {
    while ($news_query->have_posts()) {
        $news_query->the_post();
        $news_items[] = array(
            'title'   => get_the_title(),
            'author'  => get_the_author(),
            'date'    => get_the_date('M j Y'),
            'excerpt' => get_the_excerpt(),
            'image'   => get_the_post_thumbnail_url(get_the_ID(), 'large') ?: get_template_directory_uri() . '/assets/images/news-placeholder.jpg',
            'link'    => get_permalink(),
        );
    }
    wp_reset_postdata();
} else {
    $news_items = $fallback_news;
}

// Upcoming events - can be integrated with Events plugin
$upcoming_events = array(
    array(
        'date'  => '23',
        'month' => 'March',
        'title' => 'Fourth Quarter Begins',
        'time'  => 'all day',
    ),
    array(
        'date'  => '25',
        'month' => 'March',
        'title' => 'National Honor Society Induction Ceremony',
        'time'  => '6:30 PM - 8:30 PM',
    ),
    array(
        'date'  => '26',
        'month' => 'March',
        'title' => 'Board of Directors Meeting',
        'time'  => '6:00 PM - 9:00 PM',
    ),
);
?>

<section class="news-events-section">
    <div class="news-events-container">
        <!-- Decorative Stars -->
        <div class="news-stars">
            <?php for ($i = 0; $i < 3; $i++) : ?>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#c11f1e"/>
            </svg>
            <?php endfor; ?>
        </div>

        <!-- Section Heading -->
        <h2 class="news-heading font-serif">What's On & What's New</h2>

        <div class="news-grid">
            <!-- Left: News Carousel -->
            <div class="news-carousel">
                <div class="news-carousel-label">FEATURED NEWS</div>
                
                <div class="news-slides">
                    <?php foreach ($news_items as $index => $news) : ?>
                    <div class="news-slide <?php echo $index === 0 ? 'active' : ''; ?>" data-index="<?php echo esc_attr($index); ?>">
                        <img src="<?php echo esc_url($news['image']); ?>" alt="<?php echo esc_attr($news['title']); ?>" loading="lazy">
                        
                        <!-- Default overlay -->
                        <div class="news-slide-title">
                            <h3 class="font-serif"><?php echo esc_html($news['title']); ?></h3>
                        </div>
                        
                        <!-- Hover overlay -->
                        <div class="news-slide-hover">
                            <h3 class="font-serif"><?php echo esc_html($news['title']); ?></h3>
                            <p class="news-author"><?php echo esc_html($news['author']); ?></p>
                            <p class="news-date"><?php echo esc_html($news['date']); ?></p>
                            <p class="news-excerpt"><?php echo esc_html($news['excerpt']); ?></p>
                            <a href="<?php echo esc_url($news['link']); ?>" class="news-read-more">
                                READ MORE
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>

                <!-- Navigation -->
                <div class="news-nav">
                    <div class="news-dots">
                        <?php foreach ($news_items as $index => $news) : ?>
                        <button class="news-dot <?php echo $index === 0 ? 'active' : ''; ?>" data-index="<?php echo esc_attr($index); ?>"></button>
                        <?php endforeach; ?>
                    </div>
                    <div class="news-arrows">
                        <button class="news-arrow news-prev" aria-label="Previous article">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button class="news-arrow news-next" aria-label="Next article">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right: Upcoming Events -->
            <div class="events-panel">
                <div class="events-list">
                    <?php foreach ($upcoming_events as $index => $event) : ?>
                    <div class="event-item">
                        <div class="event-date">
                            <span class="event-day font-serif"><?php echo esc_html($event['date']); ?></span>
                            <span class="event-month"><?php echo esc_html($event['month']); ?></span>
                        </div>
                        <div class="event-details">
                            <h3 class="event-title"><?php echo esc_html($event['title']); ?></h3>
                            <div class="event-time">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span><?php echo esc_html($event['time']); ?></span>
                            </div>
                            <a href="#" class="event-link">
                                READ MORE
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <?php if ($index < count($upcoming_events) - 1) : ?>
                    <div class="event-divider"></div>
                    <?php endif; ?>
                    <?php endforeach; ?>
                </div>

                <!-- Bottom Buttons -->
                <div class="events-buttons">
                    <a href="<?php echo esc_url(home_url('/news/')); ?>" class="events-btn">More News</a>
                    <a href="<?php echo esc_url(home_url('/events/')); ?>" class="events-btn">Full Calendar</a>
                </div>
            </div>
        </div>
    </div>
</section>
