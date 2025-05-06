// Achievement and Leveling System for Mulham's Portfolio

// Achievement definitions
const ACHIEVEMENTS = {
  // Navigation achievements
  explorer: {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visited the entire portfolio',
    icon: '🏆',
    xp: 100,
    level: 1
  },
  portfolio_master: {
    id: 'portfolio_master',
    title: 'Portfolio Master',
    description: 'Viewed all portfolio items',
    icon: '🎨',
    xp: 150,
    level: 2
  },
  service_explorer: {
    id: 'service_explorer',
    title: 'Service Explorer',
    description: 'Checked out all services',
    icon: '🛠️',
    xp: 75,
    level: 1
  },
  about_me: {
    id: 'about_me',
    title: 'Getting to Know Me',
    description: 'Read about Mulham',
    icon: '📝',
    xp: 50,
    level: 1
  },

  // Portfolio page achievements
  first_project: {
    id: 'first_project',
    title: 'First Project',
    description: 'Viewed your first project',
    icon: '🚀',
    xp: 25,
    level: 1
  },
  design_enthusiast: {
    id: 'design_enthusiast',
    title: 'Design Enthusiast',
    description: 'Viewed 3 design projects',
    icon: '🎭',
    xp: 50,
    level: 1
  },
  web_wizard: {
    id: 'web_wizard',
    title: 'Web Wizard',
    description: 'Viewed 3 web design projects',
    icon: '🌐',
    xp: 75,
    level: 2
  },
  branding_expert: {
    id: 'branding_expert',
    title: 'Branding Expert',
    description: 'Viewed 3 branding projects',
    icon: '✨',
    xp: 75,
    level: 2
  },

  // Interaction achievements
  music_lover: {
    id: 'music_lover',
    title: 'Music Lover',
    description: 'Played background music',
    icon: '🎵',
    xp: 25,
    level: 1
  },
  cat_whisperer: {
    id: 'cat_whisperer',
    title: 'Cat Whisperer',
    description: 'Found and clicked the rainbow cat',
    icon: '🌈',
    xp: 50,
    level: 1
  },
  dj: {
    id: 'dj',
    title: 'DJ Master',
    description: 'Changed music tracks 3 times',
    icon: '🎧',
    xp: 75,
    level: 2
  },

  // Special achievements
  night_owl: {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Visited the site after midnight',
    icon: '🦉',
    xp: 100,
    level: 2
  },
  early_bird: {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Visited the site before 7 AM',
    icon: '🐦',
    xp: 100,
    level: 2
  },
  weekend_warrior: {
    id: 'weekend_warrior',
    title: 'Weekend Warrior',
    description: 'Visited on a weekend',
    icon: '🏅',
    xp: 50,
    level: 1
  },

  // Engagement achievements
  social_butterfly: {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Clicked on a social media link',
    icon: '🦋',
    xp: 25,
    level: 1
  },
  contact_me: {
    id: 'contact_me',
    title: 'Let\'s Connect',
    description: 'Visited the contact section',
    icon: '📞',
    xp: 50,
    level: 1
  },
  loyal_visitor: {
    id: 'loyal_visitor',
    title: 'Loyal Visitor',
    description: 'Visited the site 3 times',
    icon: '🔄',
    xp: 100,
    level: 2
  }
};

// Level definitions
const LEVELS = {
  1: { name: 'Novice', xp_required: 0 },
  2: { name: 'Explorer', xp_required: 100 },
  3: { name: 'Enthusiast', xp_required: 250 },
  4: { name: 'Connoisseur', xp_required: 500 },
  5: { name: 'Master', xp_required: 1000 }
};

// Achievement System Class
class AchievementSystem {
  constructor() {
    this.achievements = {};
    this.xp = 0;
    this.level = 1;
    this.musicTrackChanges = 0;
    this.visitedSections = new Set();
    this.viewedPortfolioItems = new Set();
    this.viewedServices = new Set();
    this.designProjects = new Set();
    this.webProjects = new Set();
    this.brandingProjects = new Set();
    this.visitCount = 1;

    // Disable level indicator completely
    this.levelIndicatorDisabled = true;

    // Load saved achievements from localStorage
    this.loadProgress();

    // Track visit count
    this.trackVisitCount();

    // Initialize achievement tracking
    this.initTracking();

    // Remove any existing level indicators
    this.removeLevelIndicators();
  }

  // Remove any level indicators
  removeLevelIndicators() {
    const indicators = document.querySelectorAll('.level-indicator');
    indicators.forEach(indicator => {
      indicator.remove();
    });
  }

  // Track visit count
  trackVisitCount() {
    const lastVisit = localStorage.getItem('mulham_last_visit');
    const now = Date.now();

    // If last visit was more than 1 hour ago, count as a new visit
    if (!lastVisit || (now - parseInt(lastVisit)) > 3600000) {
      this.visitCount++;
      localStorage.setItem('mulham_last_visit', now.toString());

      // Check for loyal visitor achievement
      if (this.visitCount >= 3) {
        this.unlockAchievement('loyal_visitor');
      }
    }
  }

  // Load saved progress
  loadProgress() {
    try {
      const savedData = localStorage.getItem('mulham_achievements');
      if (savedData) {
        const data = JSON.parse(savedData);
        this.achievements = data.achievements || {};
        this.xp = data.xp || 0;
        this.level = data.level || 1;
        this.musicTrackChanges = data.musicTrackChanges || 0;
        this.visitedSections = new Set(data.visitedSections || []);
        this.viewedPortfolioItems = new Set(data.viewedPortfolioItems || []);
        this.viewedServices = new Set(data.viewedServices || []);
        this.designProjects = new Set(data.designProjects || []);
        this.webProjects = new Set(data.webProjects || []);
        this.brandingProjects = new Set(data.brandingProjects || []);
        this.visitCount = data.visitCount || 1;

        console.log('Loaded achievement progress:', {
          achievements: Object.keys(this.achievements),
          xp: this.xp,
          level: this.level,
          visitCount: this.visitCount
        });
      }
    } catch (e) {
      console.error('Error loading achievement progress:', e);
    }
  }

  // Save progress
  saveProgress() {
    try {
      const dataToSave = {
        achievements: this.achievements,
        xp: this.xp,
        level: this.level,
        musicTrackChanges: this.musicTrackChanges,
        visitedSections: Array.from(this.visitedSections),
        viewedPortfolioItems: Array.from(this.viewedPortfolioItems),
        viewedServices: Array.from(this.viewedServices),
        designProjects: Array.from(this.designProjects),
        webProjects: Array.from(this.webProjects),
        brandingProjects: Array.from(this.brandingProjects),
        visitCount: this.visitCount
      };

      localStorage.setItem('mulham_achievements', JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Error saving achievement progress:', e);
    }
  }

  // Initialize achievement tracking
  initTracking() {
    // Track section visits
    this.trackSectionVisits();

    // Track portfolio item views
    this.trackPortfolioItems();

    // Track service views
    this.trackServices();

    // Track music interactions
    this.trackMusicInteractions();

    // Track rainbow cat interactions
    this.trackRainbowCat();

    // Track social media interactions
    this.trackSocialMedia();

    // Track contact section
    this.trackContactSection();

    // Check time-based achievements
    this.checkTimeBasedAchievements();
  }

  // Track social media interactions
  trackSocialMedia() {
    // Listen for clicks on social media links
    document.addEventListener('click', (e) => {
      const socialLink = e.target.closest('.social-icon') || e.target.closest('a[href*="linkedin"]') ||
                         e.target.closest('a[href*="facebook"]') || e.target.closest('a[href*="twitter"]') ||
                         e.target.closest('a[href*="instagram"]') || e.target.closest('a[href*="github"]');

      if (socialLink) {
        this.unlockAchievement('social_butterfly');
        this.saveProgress();
      }
    });
  }

  // Track contact section
  trackContactSection() {
    // Check if contact section exists
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      };

      const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.unlockAchievement('contact_me');
            this.saveProgress();

            // Unobserve after achievement is unlocked
            contactObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      contactObserver.observe(contactSection);
    }
  }

  // Track section visits
  trackSectionVisits() {
    // Track when user scrolls to different sections
    const sections = document.querySelectorAll('section[id]');

    if (sections.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            this.visitedSections.add(sectionId);

            // Check if user has visited all sections
            if (this.visitedSections.size >= sections.length) {
              this.unlockAchievement('explorer');
            }

            // Check specific sections
            if (sectionId === 'about') {
              this.unlockAchievement('about_me');
            }

            this.saveProgress();
          }
        });
      }, observerOptions);

      sections.forEach(section => {
        sectionObserver.observe(section);
      });
    }
  }

  // Track portfolio item views
  trackPortfolioItems() {
    // Track when user clicks on portfolio items
    document.addEventListener('click', (e) => {
      const portfolioItem = e.target.closest('.portfolio-item');
      if (portfolioItem) {
        const itemId = portfolioItem.dataset.id || portfolioItem.id || Date.now();

        // If this is the first portfolio item viewed
        if (this.viewedPortfolioItems.size === 0) {
          this.unlockAchievement('first_project');
        }

        // Add to viewed items
        this.viewedPortfolioItems.add(itemId);

        // Track project categories
        const category = portfolioItem.dataset.category || '';
        if (category.toLowerCase().includes('design')) {
          this.designProjects.add(itemId);
          if (this.designProjects.size >= 3) {
            this.unlockAchievement('design_enthusiast');
          }
        }

        if (category.toLowerCase().includes('web')) {
          this.webProjects.add(itemId);
          if (this.webProjects.size >= 3) {
            this.unlockAchievement('web_wizard');
          }
        }

        if (category.toLowerCase().includes('brand')) {
          this.brandingProjects.add(itemId);
          if (this.brandingProjects.size >= 3) {
            this.unlockAchievement('branding_expert');
          }
        }

        // Check if user has viewed enough portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        if (portfolioItems.length > 0 && this.viewedPortfolioItems.size >= portfolioItems.length) {
          this.unlockAchievement('portfolio_master');
        }

        this.saveProgress();
      }
    });
  }

  // Track service views
  trackServices() {
    // Track when user views service items
    const serviceItems = document.querySelectorAll('.service-item');

    if (serviceItems.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      };

      const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const serviceId = entry.target.dataset.id || entry.target.id || Date.now();
            this.viewedServices.add(serviceId);

            // Check if user has viewed all services
            if (this.viewedServices.size >= serviceItems.length) {
              this.unlockAchievement('service_explorer');
            }

            this.saveProgress();
          }
        });
      }, observerOptions);

      serviceItems.forEach(service => {
        serviceObserver.observe(service);
      });
    }
  }

  // Track music interactions
  trackMusicInteractions() {
    // Listen for music toggle clicks
    const musicToggle = document.querySelector('.music-toggle');
    if (musicToggle) {
      musicToggle.addEventListener('click', () => {
        this.unlockAchievement('music_lover');
        this.saveProgress();
      });
    }
  }

  // Track rainbow cat interactions
  trackRainbowCat() {
    // Listen for rainbow cat clicks
    const rainbowCat = document.querySelector('.flying-rainbow-cat');
    if (rainbowCat) {
      rainbowCat.addEventListener('click', () => {
        this.unlockAchievement('cat_whisperer');

        // Track music changes for DJ achievement
        this.musicTrackChanges++;
        if (this.musicTrackChanges >= 3) {
          this.unlockAchievement('dj');
        }

        this.saveProgress();
      });
    }
  }

  // Check time-based achievements
  checkTimeBasedAchievements() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday

    // Night owl (midnight to 5 AM)
    if (hour >= 0 && hour < 5) {
      this.unlockAchievement('night_owl');
    }

    // Early bird (5 AM to 7 AM)
    if (hour >= 5 && hour < 7) {
      this.unlockAchievement('early_bird');
    }

    // Weekend warrior (Saturday or Sunday)
    if (day === 0 || day === 6) {
      this.unlockAchievement('weekend_warrior');
    }

    this.saveProgress();
  }

  // Unlock an achievement
  unlockAchievement(achievementId) {
    // Check if achievement exists and is not already unlocked
    if (ACHIEVEMENTS[achievementId] && !this.achievements[achievementId]) {
      const achievement = ACHIEVEMENTS[achievementId];

      // Mark as unlocked
      this.achievements[achievementId] = {
        unlocked: true,
        timestamp: Date.now()
      };

      // Add XP
      this.addXP(achievement.xp);

      // Show notification
      this.showAchievementNotification(achievement);

      console.log(`Achievement unlocked: ${achievement.title}`);
      return true;
    }

    return false;
  }

  // Add XP and check for level up
  addXP(amount) {
    const oldLevel = this.level;
    this.xp += amount;

    // Check for level up
    for (let lvl = this.level + 1; lvl <= Object.keys(LEVELS).length; lvl++) {
      if (this.xp >= LEVELS[lvl].xp_required) {
        this.level = lvl;
      } else {
        break;
      }
    }

    // Show level up notification if leveled up
    if (this.level > oldLevel) {
      this.showLevelUpNotification(oldLevel, this.level);
    }

    // Level indicator update removed

    this.saveProgress();
  }

  // Show achievement notification
  showAchievementNotification(achievement) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.achievement-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-text">
        <div class="achievement-title">${achievement.title}</div>
        <div class="achievement-description">${achievement.description}</div>
        <div class="achievement-level">Level ${achievement.level} Achievement</div>
      </div>
      <div class="achievement-xp">+${achievement.xp} XP</div>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Show with animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Hide after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 5000);
  }

  // Show level up notification
  showLevelUpNotification(oldLevel, newLevel) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.achievement-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-icon">⭐</div>
      <div class="achievement-text">
        <div class="achievement-title">Level Up!</div>
        <div class="achievement-description">You are now a ${LEVELS[newLevel].name}</div>
        <div class="achievement-level">Level ${oldLevel} → Level ${newLevel}</div>
      </div>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Show with animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Hide after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 5000);
  }

  // Create and update level indicator (disabled - no longer showing in navbar)
  createLevelIndicator() {
    // Level indicator removed as requested
    console.log('Level indicator creation skipped - removed from UI');
  }

  // Update level indicator (disabled)
  updateLevelIndicator() {
    // Level indicator updates skipped
    return;
  }
}

// Initialize achievement system
document.addEventListener('DOMContentLoaded', () => {
  // Create the achievement system
  window.achievementSystem = new AchievementSystem();

  // Aggressively remove any level indicators
  function removeLevelIndicators() {
    // Get all level indicators by class
    const indicators = document.querySelectorAll('.level-indicator');
    indicators.forEach(indicator => {
      indicator.remove();
    });

    // Also try to find by position (top-right fixed elements)
    const allFixedElements = document.querySelectorAll('div[style*="position: fixed"]');
    allFixedElements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.top === '20px' && style.right === '20px') {
        el.remove();
      }
    });
  }

  // Remove immediately
  removeLevelIndicators();

  // Also remove after delays to catch any that might be created later
  setTimeout(removeLevelIndicators, 100);
  setTimeout(removeLevelIndicators, 500);
  setTimeout(removeLevelIndicators, 1000);
  setTimeout(removeLevelIndicators, 2000);

  // Set up a continuous interval to keep removing them
  setInterval(removeLevelIndicators, 1000);
});
