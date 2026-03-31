<?php
/**
 * Front Page Template
 *
 * @package Stepping_Stones
 */

get_header();
?>

<?php get_template_part('template-parts/section', 'hero'); ?>

<?php get_template_part('template-parts/section', 'intro'); ?>

<?php get_template_part('template-parts/section', 'gallery'); ?>

<?php get_template_part('template-parts/section', 'learning'); ?>

<?php get_template_part('template-parts/section', 'beyond'); ?>

<?php get_template_part('template-parts/section', 'news'); ?>

<?php get_template_part('template-parts/section', 'cta'); ?>

<?php
get_footer();
