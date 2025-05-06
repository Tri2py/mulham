// Main JavaScript for Mulham's Portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Add loading animation
  const body = document.body;
  const loadingAnimation = document.createElement('div');
  loadingAnimation.className = 'loading-animation';
  loadingAnimation.innerHTML = '<div class="loading-spinner"></div>';
  body.appendChild(loadingAnimation);

  // Add scroll progress bar
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  body.appendChild(scrollProgress);

  // Add custom cursor
  const customCursor = document.createElement('div');
  customCursor.className = 'custom-cursor';
  body.appendChild(customCursor);

  // Add page transition element
  const pageTransition = document.createElement('div');
  pageTransition.className = 'page-transition';
  body.appendChild(pageTransition);

  // Remove loading animation after page loads
  window.addEventListener('load', function() {
    setTimeout(function() {
      loadingAnimation.classList.add('loaded');
      document.querySelector('.hero').classList.add('animated');
    }, 500);
  });

  // Enhanced scroll progress bar with smooth animation and interactive features
  const scrollProgressContainer = document.createElement('div');
  scrollProgressContainer.className = 'scroll-progress-container';
  body.appendChild(scrollProgressContainer);

  // Create tooltip for scroll percentage
  const scrollTooltip = document.createElement('div');
  scrollTooltip.className = 'scroll-tooltip';
  scrollTooltip.style.cssText = `
    position: fixed;
    top: 15px;
    background: var(--dark-card);
    color: var(--primary-color);
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1002;
    pointer-events: none;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(127, 90, 240, 0.3);
  `;
  body.appendChild(scrollTooltip);

  // Update scroll progress bar with enhanced features
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    // Update progress bar width with smooth animation
    requestAnimationFrame(() => {
      scrollProgress.style.width = scrollPercentage + '%';

      // Show tooltip with scroll percentage
      if (scrollPercentage > 0) {
        scrollTooltip.textContent = Math.round(scrollPercentage) + '%';
        scrollTooltip.style.opacity = '1';
        scrollTooltip.style.left = `calc(${scrollPercentage}% - 20px)`;
      } else {
        scrollTooltip.style.opacity = '0';
      }
    });
  });

  // Hide tooltip when not scrolling
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTooltip.style.opacity = '1';

    scrollTimeout = setTimeout(function() {
      scrollTooltip.style.opacity = '0';
    }, 1500);
  });

  // Add click event to scroll progress bar for quick navigation
  scrollProgress.addEventListener('click', function(e) {
    const clickPosition = e.clientX / window.innerWidth;
    const targetScrollPosition = clickPosition * (document.documentElement.scrollHeight - document.documentElement.clientHeight);

    // Smooth scroll to position
    window.scrollTo({
      top: targetScrollPosition,
      behavior: 'smooth'
    });
  });

  // Custom cursor movement
  document.addEventListener('mousemove', function(e) {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
  });

  // Custom cursor interactions
  const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .award-item');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      customCursor.classList.add('active');
    });
    element.addEventListener('mouseleave', function() {
      customCursor.classList.remove('active');
    });
  });

  // Parallax effect
  const parallaxElements = document.querySelectorAll('.parallax');
  window.addEventListener('mousemove', function(e) {
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.1;
      const x = (window.innerWidth - e.pageX * speed) / 100;
      const y = (window.innerHeight - e.pageY * speed) / 100;
      element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  });

  // Header scroll effect with hide on scroll down, show on scroll up
  const header = document.querySelector('header');
  const scrollThreshold = 50;
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for styling when past threshold
    if (scrollTop > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down & past initial area
      header.classList.add('header-hidden');
    } else {
      // Scrolling up
      header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  });

  // Enhanced mobile menu with animations and better touch handling
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
  const mobileSocialLinks = document.querySelectorAll('.mobile-social-links a');

  // Add staggered animation to mobile menu items
  function animateMobileMenuItems() {
    const allMenuItems = [...mobileNavLinks, ...mobileSocialLinks];
    allMenuItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(20px)';
      item.style.transition = `all 0.3s ease ${0.1 + index * 0.05}s`;
    });

    setTimeout(() => {
      allMenuItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      });
    }, 100);
  }

  function resetMobileMenuItems() {
    const allMenuItems = [...mobileNavLinks, ...mobileSocialLinks];
    allMenuItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(20px)';
    });
  }

  function toggleMobileMenu() {
    if (!mobileMenu.classList.contains('active')) {
      // Opening menu
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('no-scroll');
      animateMobileMenuItems();
    } else {
      // Closing menu
      resetMobileMenuItems();
      setTimeout(() => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }, 300);
    }
  }

  function closeMobileMenu() {
    resetMobileMenuItems();
    setTimeout(() => {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }, 300);
  }

  // Add active state feedback for mobile touches
  function addActiveFeedback(element) {
    element.classList.add('touch-active');
    setTimeout(() => {
      element.classList.remove('touch-active');
    }, 300);
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
    // Add touch event for better mobile response
    menuToggle.addEventListener('touchend', function(e) {
      e.preventDefault(); // Prevent default touch behavior
      addActiveFeedback(this);
      toggleMobileMenu();
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', toggleMobileMenu);
    // Add touch event for better mobile response
    mobileMenuClose.addEventListener('touchend', function(e) {
      e.preventDefault(); // Prevent default touch behavior
      addActiveFeedback(this);
      toggleMobileMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', toggleMobileMenu);
    // Add touch event for better mobile response
    overlay.addEventListener('touchend', function(e) {
      e.preventDefault(); // Prevent default touch behavior
      toggleMobileMenu();
    });
  }

  // Close mobile menu when a link is clicked with visual feedback
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      addActiveFeedback(this);
      setTimeout(closeMobileMenu, 300);
    });

    // Add touch event for better mobile response
    link.addEventListener('touchend', function() {
      addActiveFeedback(this);
      // Small delay to show the active state before closing
      setTimeout(closeMobileMenu, 300);
    });
  });

  // Add touch feedback for social links
  mobileSocialLinks.forEach(link => {
    link.addEventListener('touchend', function() {
      addActiveFeedback(this);
    });
  });

  // Portfolio filtering with animation - optimized for mobile touch
  const filterButtons = document.querySelectorAll('.portfolio-filters button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  function filterPortfolio(button) {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to clicked button
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    // Show/hide portfolio items based on filter with animation
    portfolioItems.forEach(item => {
      item.classList.remove('animated');

      setTimeout(() => {
        if (item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.classList.add('animated');
          }, 100);
        } else {
          item.style.display = 'none';
        }
      }, 300);
    });
  }

  filterButtons.forEach(button => {
    // Click event for desktop
    button.addEventListener('click', function() {
      filterPortfolio(this);
    });

    // Touch event for mobile with better response
    button.addEventListener('touchend', function(e) {
      e.preventDefault(); // Prevent default touch behavior
      filterPortfolio(this);
    });
  });

  // Smooth scroll for anchor links with animation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          toggleMobileMenu();
        }

        // Page transition effect
        pageTransition.classList.add('active');

        setTimeout(() => {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });

          setTimeout(() => {
            pageTransition.classList.remove('active');
          }, 500);
        }, 300);
      }
    });
  });

  // Enhanced animations on scroll with mobile optimizations
  const animatedElements = document.querySelectorAll('.animate');
  let isMobile = window.innerWidth <= 576;

  function checkIfInView() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const elementVisible = isMobile ? 80 : 100;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('animated');

        // Add specific animation class if specified
        const animationType = element.getAttribute('data-animation');
        if (animationType) {
          element.classList.add(animationType);
        } else {
          element.classList.add('fade-in');
        }

        // Add staggered animation for child elements on mobile
        if (isMobile && element.hasAttribute('data-stagger-children')) {
          const children = element.querySelectorAll(element.getAttribute('data-stagger-children'));
          children.forEach((child, index) => {
            child.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
          });
        }
      } else {
        // Only remove animation class if element is far out of viewport
        if (elementTop > windowHeight + 100) {
          element.classList.remove('animated');

          // Remove animation classes
          const animationType = element.getAttribute('data-animation');
          if (animationType) {
            element.classList.remove(animationType);
          } else {
            element.classList.remove('fade-in');
          }
        }
      }
    });
  }

  // Optimize scroll performance on mobile
  let animScrollTimeout;
  function optimizedScroll() {
    if (!animScrollTimeout) {
      animScrollTimeout = setTimeout(() => {
        animScrollTimeout = null;
        checkIfInView();
      }, isMobile ? 50 : 10); // Larger timeout for mobile
    }
  }

  // Use existing page transition element
  const existingPageTransition = document.querySelector('.page-transition');
  if (!existingPageTransition) {
    const newPageTransition = document.createElement('div');
    newPageTransition.classList.add('page-transition');
    document.body.appendChild(newPageTransition);
  }

  // Handle link clicks for page transitions
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      if (isMobile) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
          e.preventDefault();
          const transition = document.querySelector('.page-transition');
          if (transition) {
            transition.classList.add('active');

            setTimeout(() => {
              window.location.hash = href;
              setTimeout(() => {
                transition.classList.remove('active');
              }, 300);
            }, 300);
          } else {
            // Fallback if transition element doesn't exist
            window.location.hash = href;
          }
        }
      }
    });
  });

  // Initial check
  checkIfInView();

  // Check on scroll with optimization
  window.addEventListener('scroll', optimizedScroll);

  // Update mobile status on resize
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 576;
  });

  // Automatically filter to show Websites category on page load
  document.addEventListener('DOMContentLoaded', function() {
    // Get the Websites filter button
    const websitesButton = document.querySelector('.portfolio-filters button[data-filter="websites"]');
    if (websitesButton) {
      // Trigger the filter
      filterPortfolio(websitesButton);
    }
  });

  // Magnetic effect for buttons
  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    element.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });

  // Text reveal animation
  const textRevealElements = document.querySelectorAll('.text-reveal');

  textRevealElements.forEach(element => {
    const text = element.textContent;
    element.innerHTML = `<span>${text}</span>`;
  });

  // Image hover effect
  const portfolioImages = document.querySelectorAll('.portfolio-item img');

  portfolioImages.forEach(image => {
    image.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });

    image.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
});
