<?php
/**
 * Single Post Template
 *
 * @package Stepping_Stones
 */

get_header();
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('single-post'); ?>>
    
    <?php if (has_post_thumbnail()) : ?>
    <div class="post-hero">
        <?php the_post_thumbnail('hero-large'); ?>
        <div class="post-hero-overlay"></div>
        <div class="post-hero-content">
            <header class="entry-header">
                <?php the_title('<h1 class="entry-title font-serif">', '</h1>'); ?>
                <div class="entry-meta">
                    <span class="posted-on"><?php echo get_the_date(); ?></span>
                    <span class="byline">by <?php the_author(); ?></span>
                </div>
            </header>
        </div>
    </div>
    <?php else : ?>
    <header class="entry-header entry-header-no-image">
        <div class="container">
            <?php the_title('<h1 class="entry-title font-serif">', '</h1>'); ?>
            <div class="entry-meta">
                <span class="posted-on"><?php echo get_the_date(); ?></span>
                <span class="byline">by <?php the_author(); ?></span>
            </div>
        </div>
    </header>
    <?php endif; ?>

    <div class="entry-content container">
        <?php
        the_content();

        wp_link_pages(array(
            'before' => '<div class="page-links">' . __('Pages:', 'stepping-stones'),
            'after'  => '</div>',
        ));
        ?>
    </div>

    <footer class="entry-footer container">
        <?php
        $categories_list = get_the_category_list(', ');
        if ($categories_list) {
            printf('<span class="cat-links">Categories: %s</span>', $categories_list);
        }

        $tags_list = get_the_tag_list('', ', ');
        if ($tags_list) {
            printf('<span class="tags-links">Tags: %s</span>', $tags_list);
        }
        ?>
    </footer>

</article>

<?php
// Previous/Next navigation
the_post_navigation(array(
    'prev_text' => '<span class="nav-subtitle">&larr; Previous</span> <span class="nav-title">%title</span>',
    'next_text' => '<span class="nav-subtitle">Next &rarr;</span> <span class="nav-title">%title</span>',
));

// If comments are open or we have at least one comment, load up the comment template.
if (comments_open() || get_comments_number()) :
    comments_template();
endif;

get_footer();
