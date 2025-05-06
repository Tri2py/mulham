// Visual Effects and Animations for Mulham's Portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Create animated background
  createAnimatedBackground();
  
  // Create particle effects
  createParticles();
  
  // Add gradient borders to selected elements
  addGradientBorders();
  
  // Add section background animations
  addSectionBackgrounds();
  
  // Add text gradient effects
  addTextGradients();
  
  // Add glitch effects
  addGlitchEffects();
  
  // Add enhanced hover effects
  addEnhancedHoverEffects();
});

// Create animated background with floating elements
function createAnimatedBackground() {
  const animatedBg = document.createElement('div');
  animatedBg.className = 'animated-bg';
  
  // Create floating elements
  for (let i = 0; i < 3; i++) {
    const floatingElement = document.createElement('div');
    floatingElement.className = 'floating-element';
    animatedBg.appendChild(floatingElement);
  }
  
  document.body.appendChild(animatedBg);
}

// Create particle effects
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  
  // Create particles
  const particleCount = window.innerWidth < 768 ? 15 : 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    
    // Random size
    const size = Math.random() * 5 + 2;
    
    // Random animation duration
    const duration = Math.random() * 20 + 10;
    
    // Random animation delay
    const delay = Math.random() * 10;
    
    // Random opacity
    const opacity = Math.random() * 0.3 + 0.1;
    
    // Apply styles
    particle.style.left = posX + 'px';
    particle.style.top = posY + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    particle.style.opacity = opacity;
    
    // Add to container
    particlesContainer.appendChild(particle);
  }
  
  document.body.appendChild(particlesContainer);
}

// Add gradient borders to selected elements
function addGradientBorders() {
  // Add to portfolio items
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    item.classList.add('gradient-border');
  });
  
  // Add to service items
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach(item => {
    item.classList.add('gradient-border');
  });
}

// Add section background animations
function addSectionBackgrounds() {
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
    const sectionBg = document.createElement('div');
    sectionBg.className = 'animated-section-bg';
    
    // Add random shapes
    const shapeCount = 3;
    
    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div');
      shape.className = 'shape ' + (Math.random() > 0.5 ? 'circle' : 'square');
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 300 + 100;
      
      // Random color
      const hue = Math.random() * 60 + 240; // Purple to green range
      
      // Apply styles
      shape.style.left = posX + '%';
      shape.style.top = posY + '%';
      shape.style.width = size + 'px';
      shape.style.height = size + 'px';
      shape.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
      
      // Add to section background
      sectionBg.appendChild(shape);
    }
    
    section.appendChild(sectionBg);
  });
}

// Add text gradient effects
function addTextGradients() {
  // Add to section titles
  const sectionTitles = document.querySelectorAll('.section-title, .services-title, .portfolio h2');
  sectionTitles.forEach(title => {
    title.classList.add('text-gradient');
  });
  
  // Add to logo
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.classList.add('text-gradient');
  }
}

// Add glitch effects
function addGlitchEffects() {
  // Add to hero title
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    heroTitle.classList.add('glitch');
    heroTitle.setAttribute('data-text', heroTitle.textContent);
  }
}

// Add enhanced hover effects
function addEnhancedHoverEffects() {
  // Add to buttons
  const buttons = document.querySelectorAll('.contact-btn, .about-contact-btn, .portfolio-filters button');
  buttons.forEach(button => {
    button.classList.add('hover-glow');
  });
  
  // Add to social icons
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    icon.classList.add('hover-glow');
  });
}
