<?php
/**
 * Page Template
 *
 * @package Stepping_Stones
 */

get_header();
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('page-content'); ?>>
    
    <?php if (has_post_thumbnail()) : ?>
    <div class="page-hero">
        <?php the_post_thumbnail('hero-large'); ?>
        <div class="page-hero-overlay"></div>
        <div class="page-hero-content">
            <header class="entry-header">
                <?php the_title('<h1 class="entry-title font-serif">', '</h1>'); ?>
            </header>
        </div>
    </div>
    <?php else : ?>
    <header class="entry-header entry-header-no-image">
        <div class="container">
            <?php the_title('<h1 class="entry-title font-serif">', '</h1>'); ?>
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

</article>

<?php
get_footer();
