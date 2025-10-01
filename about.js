 // Initialize AOS animations
 AOS.init({
    duration: 800,
    once: true
  });

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Function to hide mobile menu
const hideMobileMenu = () => {
  mobileMenu.classList.add('hidden');
};

// Function to toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenu.classList.toggle('hidden');
};

// Toggle menu when button is clicked
mobileMenuButton.addEventListener('click', toggleMobileMenu);

// Hide menu when clicking anywhere outside of it
document.addEventListener('click', (event) => {
  const isClickInsideMenu = mobileMenu.contains(event.target);
  const isClickOnButton = mobileMenuButton.contains(event.target);
  
  if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
    hideMobileMenu();
  }
});

// Hide menu when scrolling
window.addEventListener('scroll', () => {
  // Header background change on scroll
  const header = document.getElementById('header');
  if (window.scrollY > 100) {
    header.classList.add('shadow-lg');
  } else {
    header.classList.remove('shadow-lg');
  }
  
  // Hide mobile menu on scroll
  if (!mobileMenu.classList.contains('hidden')) {
    hideMobileMenu();
  }
});

// Optional: Hide menu when window is resized (prevents menu staying open on desktop)
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && !mobileMenu.classList.contains('hidden')) { // 768px is typical breakpoint for mobile
    hideMobileMenu();
  }
});

  // Counter animation
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (counter, target) => {
    const count = +counter.innerText;
    const increment = target / 100;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter, target), 20);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };

  // Start counter animation when in view
  const startCounters = () => {
    counters.forEach(counter => {
      const elementPosition = counter.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100 && !counter.classList.contains('animated')) {
        const target = +counter.getAttribute('data-target');
        animateCounter(counter, target);
        counter.classList.add('animated');
      }
    });
  };

  // Check if counters are in view on scroll
  window.addEventListener('scroll', startCounters);
  window.addEventListener('load', startCounters);

  // Animate elements when they come into view
  const animateElements = () => {
    const elements = document.querySelectorAll('.slide-up');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('active');
      }
    });
  };

  // Run animation on load and scroll
  window.addEventListener('load', animateElements);
  window.addEventListener('scroll', animateElements);