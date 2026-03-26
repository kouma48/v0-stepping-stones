<?php
/**
 * Main Index Template
 *
 * @package Stepping_Stones
 */

get_header();
?>

<div class="content-area">
    <div class="site-main-container">
        
        <?php if (have_posts()) : ?>
            
            <header class="page-header">
                <?php if (is_home() && !is_front_page()) : ?>
                    <h1 class="page-title font-serif"><?php single_post_title(); ?></h1>
                <?php elseif (is_archive()) : ?>
                    <?php the_archive_title('<h1 class="page-title font-serif">', '</h1>'); ?>
                    <?php the_archive_description('<div class="archive-description">', '</div>'); ?>
                <?php elseif (is_search()) : ?>
                    <h1 class="page-title font-serif">
                        <?php printf(__('Search Results for: %s', 'stepping-stones'), '<span>' . get_search_query() . '</span>'); ?>
                    </h1>
                <?php endif; ?>
            </header>

            <div class="posts-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?>>
                        <?php if (has_post_thumbnail()) : ?>
                            <a href="<?php the_permalink(); ?>" class="post-card-image">
                                <?php the_post_thumbnail('card-medium'); ?>
                            </a>
                        <?php endif; ?>
                        
                        <div class="post-card-content">
                            <header class="entry-header">
                                <?php the_title('<h2 class="entry-title font-serif"><a href="' . esc_url(get_permalink()) . '">', '</a></h2>'); ?>
                            </header>

                            <div class="entry-meta">
                                <span class="posted-on"><?php echo get_the_date(); ?></span>
                                <span class="byline"><?php the_author(); ?></span>
                            </div>

                            <div class="entry-summary">
                                <?php the_excerpt(); ?>
                            </div>

                            <a href="<?php the_permalink(); ?>" class="read-more-link">
                                Read More
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>

            <?php the_posts_pagination(array(
                'prev_text' => '&larr; Previous',
                'next_text' => 'Next &rarr;',
            )); ?>

        <?php else : ?>
            
            <div class="no-results">
                <h1 class="page-title font-serif">Nothing Found</h1>
                <p>Sorry, but nothing matched your search terms. Please try again with some different keywords.</p>
                <?php get_search_form(); ?>
            </div>

        <?php endif; ?>
        
    </div>
</div>

<?php
get_footer();
