<?php
/**
 * Stepping Stones Theme Customizer
 *
 * @package Stepping_Stones
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function stepping_stones_customize_register($wp_customize) {
    $wp_customize->get_setting('blogname')->transport         = 'postMessage';
    $wp_customize->get_setting('blogdescription')->transport  = 'postMessage';
    $wp_customize->get_setting('header_textcolor')->transport = 'postMessage';

    if (isset($wp_customize->selective_refresh)) {
        $wp_customize->selective_refresh->add_partial(
            'blogname',
            array(
                'selector'        => '.site-title a',
                'render_callback' => 'stepping_stones_customize_partial_blogname',
            )
        );
        $wp_customize->selective_refresh->add_partial(
            'blogdescription',
            array(
                'selector'        => '.site-description',
                'render_callback' => 'stepping_stones_customize_partial_blogdescription',
            )
        );
    }

    // ============================================
    // HERO SECTION
    // ============================================
    
    $wp_customize->add_section('stepping_stones_hero', array(
        'title'    => __('Hero Section', 'stepping-stones'),
        'priority' => 30,
    ));

    // Hero Heading
    $wp_customize->add_setting('hero_heading', array(
        'default'           => 'Impact Starts Here',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'postMessage',
    ));

    $wp_customize->add_control('hero_heading', array(
        'label'   => __('Hero Heading', 'stepping-stones'),
        'section' => 'stepping_stones_hero',
        'type'    => 'text',
    ));

    // ============================================
    // CONTACT INFORMATION
    // ============================================
    
    $wp_customize->add_section('stepping_stones_contact', array(
        'title'    => __('Contact Information', 'stepping-stones'),
        'priority' => 35,
    ));

    // Phone Number
    $wp_customize->add_setting('contact_phone', array(
        'default'           => '+254 722 854 897',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('contact_phone', array(
        'label'   => __('Phone Number', 'stepping-stones'),
        'section' => 'stepping_stones_contact',
        'type'    => 'text',
    ));

    // Email Address
    $wp_customize->add_setting('contact_email', array(
        'default'           => 'info@steppingstones.sc.ke',
        'sanitize_callback' => 'sanitize_email',
    ));

    $wp_customize->add_control('contact_email', array(
        'label'   => __('Email Address', 'stepping-stones'),
        'section' => 'stepping_stones_contact',
        'type'    => 'email',
    ));

    // Address
    $wp_customize->add_setting('contact_address', array(
        'default'           => 'Namanga Road Estate (Opp. EPZA) P.O. Box 57754 - 00200 Nairobi, Kenya.',
        'sanitize_callback' => 'wp_kses_post',
    ));

    $wp_customize->add_control('contact_address', array(
        'label'   => __('Address', 'stepping-stones'),
        'section' => 'stepping_stones_contact',
        'type'    => 'textarea',
    ));

    // ============================================
    // SOCIAL MEDIA
    // ============================================
    
    $wp_customize->add_section('stepping_stones_social', array(
        'title'    => __('Social Media', 'stepping-stones'),
        'priority' => 40,
    ));

    $social_networks = array(
        'facebook'  => __('Facebook URL', 'stepping-stones'),
        'twitter'   => __('Twitter URL', 'stepping-stones'),
        'youtube'   => __('YouTube URL', 'stepping-stones'),
        'linkedin'  => __('LinkedIn URL', 'stepping-stones'),
        'instagram' => __('Instagram URL', 'stepping-stones'),
    );

    foreach ($social_networks as $network => $label) {
        $wp_customize->add_setting('social_' . $network, array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ));

        $wp_customize->add_control('social_' . $network, array(
            'label'   => $label,
            'section' => 'stepping_stones_social',
            'type'    => 'url',
        ));
    }

    // ============================================
    // COLOR SCHEME
    // ============================================
    
    $wp_customize->add_setting('accent_color', array(
        'default'           => '#c11f1e',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'accent_color', array(
        'label'   => __('Accent Color', 'stepping-stones'),
        'section' => 'colors',
    )));

    $wp_customize->add_setting('navy_color', array(
        'default'           => '#0F2C4C',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'navy_color', array(
        'label'   => __('Navy Color', 'stepping-stones'),
        'section' => 'colors',
    )));
}
add_action('customize_register', 'stepping_stones_customize_register');

/**
 * Render the site title for the selective refresh partial.
 */
function stepping_stones_customize_partial_blogname() {
    bloginfo('name');
}

/**
 * Render the site tagline for the selective refresh partial.
 */
function stepping_stones_customize_partial_blogdescription() {
    bloginfo('description');
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function stepping_stones_customize_preview_js() {
    wp_enqueue_script(
        'stepping-stones-customizer',
        STEPPING_STONES_URI . '/assets/js/customizer.js',
        array('customize-preview'),
        STEPPING_STONES_VERSION,
        true
    );
}
add_action('customize_preview_init', 'stepping_stones_customize_preview_js');

/**
 * Output custom CSS from Customizer settings
 */
function stepping_stones_customizer_css() {
    $accent_color = get_theme_mod('accent_color', '#c11f1e');
    $navy_color   = get_theme_mod('navy_color', '#0F2C4C');

    $css = "
        :root {
            --accent-red: {$accent_color};
            --navy: {$navy_color};
            --crimson: {$accent_color};
        }
    ";

    wp_add_inline_style('stepping-stones-components', $css);
}
add_action('wp_enqueue_scripts', 'stepping_stones_customizer_css', 20);
