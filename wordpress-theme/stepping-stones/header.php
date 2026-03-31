<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Site Header -->
<header id="ss-header" class="site-header">
    <div class="ss-header-inner">
        <!-- Left CTA links -->
        <div class="ss-header-left">
            <a href="<?php echo esc_url(home_url('/contact-us/')); ?>">Inquire</a>
            <a href="<?php echo esc_url(home_url('/book-a-visit/')); ?>">Visit</a>
            <a href="<?php echo esc_url(home_url('/apply-now/')); ?>">Apply</a>
        </div>

        <!-- Center Logo -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="ss-header-logo" aria-label="<?php bloginfo('name'); ?>">
            <img class="ss-logo-white" src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/logo-white.png" alt="<?php bloginfo('name'); ?>">
            <img class="ss-logo-colour" src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/logo-colour.png" alt="<?php bloginfo('name'); ?>">
        </a>

        <!-- Right side - Menu button -->
        <div class="ss-header-right">
            <span class="ss-menu-label">Menu</span>
            <button class="ss-hamburger" id="ss-open-btn" type="button" aria-label="Open navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
</header>

<!-- Mega Menu Overlay -->
<div id="ss-megamenu" class="ss-megamenu">
    <div class="ss-menu-image-panel">
        <div class="ss-menu-img active" id="ss-img-0">
            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/about-us.jpg" alt="About Us">
        </div>
        <div class="ss-menu-img" id="ss-img-1">
            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/academics.jpg" alt="Academics">
        </div>
        <div class="ss-menu-img" id="ss-img-2">
            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/admissions.jpg" alt="Admissions">
        </div>
        <div class="ss-menu-img" id="ss-img-3">
            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/school-life.jpg" alt="School Life">
        </div>
        <div class="ss-menu-img" id="ss-img-4">
            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/academics.jpg" alt="News">
        </div>
        <div class="ss-menu-img" id="ss-img-5">
            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/school-life.jpg" alt="Events">
        </div>
    </div>
    
    <div class="ss-menu-content">
        <div class="ss-menu-util">
            <nav class="ss-util-links">
                <a href="<?php echo esc_url(home_url('/news/')); ?>">News</a>
                <a href="<?php echo esc_url(home_url('/events/')); ?>">Events</a>
                <a href="<?php echo esc_url(home_url('/careers/')); ?>">Careers</a>
                <a href="<?php echo esc_url(home_url('/contact-us/')); ?>">Contact</a>
            </nav>
            <button class="ss-close-btn" id="ss-close-btn" type="button" aria-label="Close navigation menu">&#x2715;</button>
        </div>
        
        <div class="ss-menu-body">
            <nav class="ss-nav-col" id="ss-nav-col">
                <!-- About Us -->
                <button class="ss-nav-item" data-index="0" type="button">
                    About Us<span class="ss-nav-underline"></span>
                </button>
                <div class="ss-mobile-submenu" id="ss-mob-0">
                    <a href="<?php echo esc_url(home_url('/welcome-message/')); ?>">Welcome Message</a>
                    <a href="<?php echo esc_url(home_url('/our-story/')); ?>">Our Story</a>
                    <a href="<?php echo esc_url(home_url('/our-leadership/')); ?>">Our Leadership</a>
                    <a href="<?php echo esc_url(home_url('/our-campus/')); ?>">Our Campus</a>
                    <a href="<?php echo esc_url(home_url('/careers/')); ?>">Careers</a>
                </div>
                
                <!-- Academics -->
                <button class="ss-nav-item" data-index="1" type="button">
                    Academics<span class="ss-nav-underline"></span>
                </button>
                <div class="ss-mobile-submenu" id="ss-mob-1">
                    <a href="<?php echo esc_url(home_url('/kindergarten/')); ?>">Kindergarten</a>
                    <a href="<?php echo esc_url(home_url('/lower-primary/')); ?>">Lower Primary</a>
                    <a href="<?php echo esc_url(home_url('/upper-primary/')); ?>">Upper Primary</a>
                    <a href="<?php echo esc_url(home_url('/junior-secondary/')); ?>">Junior Secondary</a>
                    <a href="<?php echo esc_url(home_url('/learning-support/')); ?>">Learning Support</a>
                    <a href="<?php echo esc_url(home_url('/beyond-classroom/')); ?>">Beyond Classroom</a>
                </div>
                
                <!-- Admissions -->
                <button class="ss-nav-item" data-index="2" type="button">
                    Admissions<span class="ss-nav-underline"></span>
                </button>
                <div class="ss-mobile-submenu" id="ss-mob-2">
                    <a href="<?php echo esc_url(home_url('/why-stepping-stones/')); ?>">Why Stepping Stones</a>
                    <a href="<?php echo esc_url(home_url('/admissions-process/')); ?>">Admissions Process</a>
                    <a href="<?php echo esc_url(home_url('/apply-now/')); ?>">Apply Now</a>
                    <a href="<?php echo esc_url(home_url('/fees-structure/')); ?>">Fees Structure</a>
                    <a href="<?php echo esc_url(home_url('/book-a-visit/')); ?>">Book a Visit</a>
                </div>
                
                <!-- School Life -->
                <button class="ss-nav-item" data-index="3" type="button">
                    School Life<span class="ss-nav-underline"></span>
                </button>
                <div class="ss-mobile-submenu" id="ss-mob-3">
                    <a href="<?php echo esc_url(home_url('/daily-life/')); ?>">Daily Life</a>
                    <a href="<?php echo esc_url(home_url('/co-curricular-programs/')); ?>">Co-curricular Programs</a>
                    <a href="<?php echo esc_url(home_url('/student-development/')); ?>">Student Development</a>
                    <a href="<?php echo esc_url(home_url('/student-well-being/')); ?>">Student Well Being</a>
                </div>
                
                <!-- News & Events -->
                <a class="ss-nav-item" href="<?php echo esc_url(home_url('/news/')); ?>" data-index="4">
                    News<span class="ss-nav-underline"></span>
                </a>
                <a class="ss-nav-item" href="<?php echo esc_url(home_url('/events/')); ?>" data-index="5">
                    Events<span class="ss-nav-underline"></span>
                </a>
            </nav>
            
            <!-- Desktop Submenu Column -->
            <div class="ss-submenu-col">
                <div class="ss-connector-line" id="ss-connector"></div>
                
                <!-- About Us Submenu -->
                <div class="ss-submenu-links" id="ss-sub-0">
                    <a href="<?php echo esc_url(home_url('/welcome-message/')); ?>">Welcome Message</a>
                    <a href="<?php echo esc_url(home_url('/our-story/')); ?>">Our Story</a>
                    <a href="<?php echo esc_url(home_url('/our-leadership/')); ?>">Our Leadership</a>
                    <a href="<?php echo esc_url(home_url('/our-campus/')); ?>">Our Campus</a>
                    <a href="<?php echo esc_url(home_url('/careers/')); ?>">Careers</a>
                </div>
                
                <!-- Academics Submenu -->
                <div class="ss-submenu-links" id="ss-sub-1">
                    <a href="<?php echo esc_url(home_url('/kindergarten/')); ?>">Kindergarten</a>
                    <a href="<?php echo esc_url(home_url('/lower-primary/')); ?>">Lower Primary</a>
                    <a href="<?php echo esc_url(home_url('/upper-primary/')); ?>">Upper Primary</a>
                    <a href="<?php echo esc_url(home_url('/junior-secondary/')); ?>">Junior Secondary</a>
                    <a href="<?php echo esc_url(home_url('/learning-support/')); ?>">Learning Support</a>
                    <a href="<?php echo esc_url(home_url('/beyond-classroom/')); ?>">Beyond Classroom</a>
                </div>
                
                <!-- Admissions Submenu -->
                <div class="ss-submenu-links" id="ss-sub-2">
                    <a href="<?php echo esc_url(home_url('/why-stepping-stones/')); ?>">Why Stepping Stones</a>
                    <a href="<?php echo esc_url(home_url('/admissions-process/')); ?>">Admissions Process</a>
                    <a href="<?php echo esc_url(home_url('/apply-now/')); ?>">Apply Now</a>
                    <a href="<?php echo esc_url(home_url('/fees-structure/')); ?>">Fees Structure</a>
                    <a href="<?php echo esc_url(home_url('/book-a-visit/')); ?>">Book a Visit</a>
                </div>
                
                <!-- School Life Submenu -->
                <div class="ss-submenu-links" id="ss-sub-3">
                    <a href="<?php echo esc_url(home_url('/daily-life/')); ?>">Daily Life</a>
                    <a href="<?php echo esc_url(home_url('/co-curricular-programs/')); ?>">Co-curricular Programs</a>
                    <a href="<?php echo esc_url(home_url('/student-development/')); ?>">Student Development</a>
                    <a href="<?php echo esc_url(home_url('/student-well-being/')); ?>">Student Well Being</a>
                </div>
            </div>
        </div>
        
        <!-- Bottom CTA Bar -->
        <div class="ss-cta-bar">
            <a href="<?php echo esc_url(home_url('/contact-us/')); ?>">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Inquire
            </a>
            <a href="<?php echo esc_url(home_url('/book-a-visit/')); ?>">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                Visit
            </a>
            <a href="<?php echo esc_url(home_url('/apply-now/')); ?>">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Apply
            </a>
        </div>
    </div>
</div>

<main id="main-content" class="site-main">
