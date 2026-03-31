<?php
/**
 * School Introduction Section
 *
 * @package Stepping_Stones
 */

$stats = array(
    array('value' => '16+', 'label' => 'Years of excellence'),
    array('value' => '1,500+', 'label' => 'Learners in our community'),
    array('value' => '500+', 'label' => 'Girls supported annually'),
    array('value' => '15+', 'label' => 'Community projects'),
);
?>

<section class="school-intro">
    <!-- Top Centered Lockup -->
    <div class="intro-header">
        <!-- Stepping Stones SVG -->
        <div class="intro-icon animate-fade-in-up">
            <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <ellipse cx="14" cy="30" rx="12" ry="4.5" fill="currentColor" opacity="0.25"/>
                <ellipse cx="14" cy="20" rx="9" ry="4" fill="currentColor" opacity="0.5"/>
                <ellipse cx="14" cy="11" rx="6" ry="3.5" fill="currentColor" opacity="0.75"/>
                <ellipse cx="14" cy="4" rx="3.5" ry="2.5" fill="currentColor"/>
            </svg>
        </div>

        <!-- Vertical Rule -->
        <div class="intro-vr"></div>

        <!-- Subtitle -->
        <p class="intro-subtitle animate-fade-in-up" style="animation-delay: 80ms;">
            A Christ-Centred School&nbsp;&nbsp;&middot;&nbsp;&nbsp;Kitengela, Kenya&nbsp;&nbsp;&middot;&nbsp;&nbsp;Est. 2009
        </p>

        <!-- Short Rule -->
        <div class="intro-hr"></div>

        <!-- Main Heading -->
        <h1 class="intro-heading font-serif animate-fade-in-up" style="animation-delay: 160ms;">
            Nurturing <em>principled</em> hearts<br>
            and <em>brilliant</em> minds.
        </h1>
    </div>

    <!-- Full-width Rule -->
    <div class="section-divider"></div>

    <!-- Three-column Body -->
    <div class="intro-columns">
        <!-- Column 1 -->
        <div class="intro-col animate-fade-in-up">
            <p class="col-label">Our Philosophy</p>
            <p class="col-text">
                When you choose Stepping Stones as the school for your son or daughter you open
                up a world of opportunities for them. Wherever a pupil starts their journey, we
                are confident that the thread of the Stepping Stones experience is consistently
                woven throughout their daily lives.
            </p>
            <p class="col-text">
                We help pupils to find meaning and purpose in their endeavours and fuel them with
                the optimism they need to believe that they can make a difference. We want pupils
                to love being at school and to throw themselves into the opportunities this
                wonderful place has to offer.
            </p>
        </div>

        <!-- Column 2 -->
        <div class="intro-col animate-fade-in-up" style="animation-delay: 120ms;">
            <p class="col-label">Our Approach</p>
            <p class="col-text">
                At Stepping Stones we focus on teaching pupils how to have good relationships,
                both with each other and with the adults in their lives. Overall, we want their
                lives at school to be deeply engaging.
            </p>
            <p class="col-text">
                Happiness, we believe, is a consequence of doing these things well, rather than
                an end unto itself.
            </p>
            <div class="col-signature">
                <p class="signature-name">Lily Kitala</p>
                <p class="signature-title">Principal</p>
            </div>
        </div>

        <!-- Column 3 - Blockquote -->
        <div class="intro-col intro-col-quote animate-fade-in-up" style="animation-delay: 240ms;">
            <span class="quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote class="intro-quote font-serif">
                At Stepping Stones we see education as being so much more than exam results. We
                see education as being about developing young women and men who are ready to make
                a meaningful difference to their communities.
            </blockquote>
        </div>
    </div>

    <!-- Full-width Rule -->
    <div class="section-divider"></div>

    <!-- Stats Strip -->
    <div class="intro-stats">
        <?php foreach ($stats as $index => $stat) : ?>
        <div class="stat-item animate-fade-in-up" style="animation-delay: <?php echo $index * 80; ?>ms;">
            <p class="stat-value font-serif"><?php echo esc_html($stat['value']); ?></p>
            <p class="stat-label"><?php echo esc_html($stat['label']); ?></p>
        </div>
        <?php endforeach; ?>
    </div>

    <!-- Full-width Rule -->
    <div class="section-divider"></div>
</section>
