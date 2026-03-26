<?php
/**
 * Footer CTA Section
 *
 * @package Stepping_Stones
 */
?>

<section class="footer-cta">
    <div class="footer-cta-bg">
        <img 
            src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/cta-background.jpg" 
            alt="Stepping Stones School courtyard"
            loading="lazy"
        >
    </div>
    <div class="footer-cta-overlay"></div>
    
    <div class="footer-cta-content">
        <h2 class="footer-cta-heading font-serif">
            We would love to discuss your place at Stepping Stones.
        </h2>
        
        <div class="footer-cta-buttons">
            <a href="<?php echo esc_url(home_url('/contact-us/')); ?>" class="footer-cta-btn">
                Inquire
            </a>
            <a href="<?php echo esc_url(home_url('/apply-now/')); ?>" class="footer-cta-btn">
                Apply
            </a>
            <a href="<?php echo esc_url(home_url('/book-a-visit/')); ?>" class="footer-cta-btn">
                Arrange a Tour
            </a>
        </div>
    </div>
</section>
