<?php
/**
 * Custom template tags for Stepping Stones theme
 *
 * @package Stepping_Stones
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Prints HTML with meta information for the current post-date/time.
 */
function stepping_stones_posted_on() {
    $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
    
    if (get_the_time('U') !== get_the_modified_time('U')) {
        $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
    }

    $time_string = sprintf(
        $time_string,
        esc_attr(get_the_date(DATE_W3C)),
        esc_html(get_the_date()),
        esc_attr(get_the_modified_date(DATE_W3C)),
        esc_html(get_the_modified_date())
    );

    printf(
        '<span class="posted-on">%s</span>',
        $time_string
    );
}

/**
 * Prints HTML with meta information for the current author.
 */
function stepping_stones_posted_by() {
    printf(
        '<span class="byline"><span class="author vcard"><a class="url fn n" href="%1$s">%2$s</a></span></span>',
        esc_url(get_author_posts_url(get_the_author_meta('ID'))),
        esc_html(get_the_author())
    );
}

/**
 * Prints HTML with meta information for the categories.
 */
function stepping_stones_entry_categories() {
    if ('post' === get_post_type()) {
        $categories_list = get_the_category_list(', ');
        if ($categories_list) {
            printf('<span class="cat-links">%s</span>', $categories_list);
        }
    }
}

/**
 * Prints HTML with meta information for the tags.
 */
function stepping_stones_entry_tags() {
    if ('post' === get_post_type()) {
        $tags_list = get_the_tag_list('', ', ');
        if ($tags_list) {
            printf('<span class="tags-links">%s</span>', $tags_list);
        }
    }
}

/**
 * Displays an optional post thumbnail.
 */
function stepping_stones_post_thumbnail($size = 'post-thumbnail') {
    if (post_password_required() || is_attachment() || !has_post_thumbnail()) {
        return;
    }

    if (is_singular()) :
        ?>
        <div class="post-thumbnail">
            <?php the_post_thumbnail($size); ?>
        </div>
        <?php
    else :
        ?>
        <a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
            <?php the_post_thumbnail($size, array('alt' => the_title_attribute(array('echo' => false)))); ?>
        </a>
        <?php
    endif;
}

/**
 * Get custom logo URL
 */
function stepping_stones_get_logo_url($type = 'white') {
    $custom_logo_id = get_theme_mod('custom_logo');
    
    if ($custom_logo_id) {
        return wp_get_attachment_image_url($custom_logo_id, 'full');
    }
    
    // Default logos
    if ($type === 'colour') {
        return STEPPING_STONES_URI . '/assets/images/logo-colour.png';
    }
    
    return STEPPING_STONES_URI . '/assets/images/logo-white.png';
}

/**
 * Get site description
 */
function stepping_stones_site_description() {
    $description = get_bloginfo('description', 'display');
    
    if ($description || is_customize_preview()) {
        echo '<p class="site-description">' . esc_html($description) . '</p>';
    }
}
