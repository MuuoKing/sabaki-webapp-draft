// Initialize AOS
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

// Ministry card animations
document.addEventListener('DOMContentLoaded', function() {
const ministryCards = document.querySelectorAll('.ministry-card');

ministryCards.forEach(card => {
    const delay = parseInt(card.getAttribute('data-delay')) || 0;
    
    setTimeout(() => {
    card.classList.add('visible');
    }, delay);
});
});

// Header scroll effect
window.addEventListener('scroll', function() {
const header = document.getElementById('header');
if (window.scrollY > 100) {
    header.classList.add('bg-black/80');
} else {
    header.classList.remove('bg-black/80');
}
});
/*
 // Intersection Observer for scroll animations
 const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all ministry cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.ministry-card');
    cards.forEach(card => observer.observe(card));

    // Add click tracking for analytics (optional)
    const readMoreLinks = document.querySelectorAll('.read-more-link');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('[v0] Navigating to:', e.target.href);
        });
    });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});*/
