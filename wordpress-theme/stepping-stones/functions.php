<?php
/**
 * Stepping Stones School Theme Functions
 *
 * @package Stepping_Stones
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Define theme constants
 */
define('STEPPING_STONES_VERSION', '1.0.0');
define('STEPPING_STONES_DIR', get_template_directory());
define('STEPPING_STONES_URI', get_template_directory_uri());

/**
 * Theme setup
 */
function stepping_stones_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails
    add_theme_support('post-thumbnails');
    
    // Custom image sizes
    add_image_size('hero-large', 1920, 1080, true);
    add_image_size('card-medium', 600, 800, true);
    add_image_size('card-square', 600, 600, true);

    // Register navigation menus
    register_nav_menus(array(
        'primary'   => __('Primary Menu', 'stepping-stones'),
        'footer'    => __('Footer Menu', 'stepping-stones'),
        'utility'   => __('Utility Menu', 'stepping-stones'),
    ));

    // HTML5 support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Custom logo support
    add_theme_support('custom-logo', array(
        'height'      => 200,
        'width'       => 200,
        'flex-width'  => true,
        'flex-height' => true,
    ));

    // Responsive embeds
    add_theme_support('responsive-embeds');

    // Wide alignment support
    add_theme_support('align-wide');

    // Editor styles
    add_theme_support('editor-styles');
    add_editor_style('assets/css/editor-style.css');
}
add_action('after_setup_theme', 'stepping_stones_setup');

/**
 * Enqueue scripts and styles
 */
function stepping_stones_scripts() {
    // Main stylesheet
    wp_enqueue_style(
        'stepping-stones-style',
        get_stylesheet_uri(),
        array(),
        STEPPING_STONES_VERSION
    );
    
    // Theme CSS components
    wp_enqueue_style(
        'stepping-stones-components',
        STEPPING_STONES_URI . '/assets/css/components.css',
        array('stepping-stones-style'),
        STEPPING_STONES_VERSION
    );

    // Google Fonts
    wp_enqueue_style(
        'google-fonts',
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
        array(),
        null
    );

    // Main JavaScript
    wp_enqueue_script(
        'stepping-stones-main',
        STEPPING_STONES_URI . '/assets/js/main.js',
        array(),
        STEPPING_STONES_VERSION,
        true
    );

    // Hero Carousel JavaScript
    if (is_front_page()) {
        wp_enqueue_script(
            'stepping-stones-carousel',
            STEPPING_STONES_URI . '/assets/js/carousel.js',
            array(),
            STEPPING_STONES_VERSION,
            true
        );
    }

    // Localize script with theme data
    wp_localize_script('stepping-stones-main', 'steppingStonesData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('stepping_stones_nonce'),
        'siteUrl' => home_url(),
    ));
}
add_action('wp_enqueue_scripts', 'stepping_stones_scripts');

/**
 * Register widget areas
 */
function stepping_stones_widgets_init() {
    register_sidebar(array(
        'name'          => __('Footer Widget Area 1', 'stepping-stones'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here to appear in footer column 1.', 'stepping-stones'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => __('Footer Widget Area 2', 'stepping-stones'),
        'id'            => 'footer-2',
        'description'   => __('Add widgets here to appear in footer column 2.', 'stepping-stones'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'stepping_stones_widgets_init');

/**
 * Custom template tags
 */
require STEPPING_STONES_DIR . '/inc/template-tags.php';

/**
 * Customizer additions
 */
require STEPPING_STONES_DIR . '/inc/customizer.php';

/**
 * Add preload for critical resources
 */
function stepping_stones_preload_resources() {
    // Preload hero image
    if (is_front_page()) {
        echo '<link rel="preload" as="image" href="' . STEPPING_STONES_URI . '/assets/images/hero-1.jpg">';
    }
    
    // Preload fonts
    echo '<link rel="preload" as="font" type="font/ttf" href="' . STEPPING_STONES_URI . '/assets/fonts/RoxboroughCF.ttf" crossorigin>';
}
add_action('wp_head', 'stepping_stones_preload_resources', 1);

/**
 * Disable WordPress emoji
 */
function stepping_stones_disable_emojis() {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
}
add_action('init', 'stepping_stones_disable_emojis');

/**
 * Custom excerpt length
 */
function stepping_stones_excerpt_length($length) {
    return 25;
}
add_filter('excerpt_length', 'stepping_stones_excerpt_length');

/**
 * Custom excerpt more
 */
function stepping_stones_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'stepping_stones_excerpt_more');
