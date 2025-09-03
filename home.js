// Initialize AOS animations
AOS.init({
  duration: 800,
  once: true
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Header background change on scroll
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('shadow-lg'); // Add shadow on scroll for more depth
  } else {
    header.classList.remove('shadow-lg');
  }
});

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
    
    if (elementPosition < windowHeight - 100) {
      const target = +counter.getAttribute('data-target');
      animateCounter(counter, target);
    }
  });
};

// Check if counters are in view on scroll
window.addEventListener('scroll', startCounters);

// Testimonial slider
const testimonialSlider = document.getElementById('testimonial-slider');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let currentSlide = 0;

// Function to update slider position
const updateSlider = (index) => {
  // Update slider position
  testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
  
  // Update active dot
  testimonialDots.forEach(dot => dot.classList.remove('active', 'opacity-100'));
  testimonialDots[index].classList.add('active', 'opacity-100');
  
  currentSlide = index;
};

// Add click event to dots
testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    updateSlider(index);
  });
});

// Auto slide every 5 seconds
/*setInterval(() => {
  currentSlide = (currentSlide + 1) % testimonialDots.length;
  updateSlider(currentSlide);
}, 5000);*/

// Sermon play button animation
const sermonPlayBtn = document.querySelector('.sermon-play-btn');

sermonPlayBtn.addEventListener('mouseover', () => {
  sermonPlayBtn.classList.add('scale-110');
  sermonPlayBtn.style.transition = 'transform 0.3s ease';
});

sermonPlayBtn.addEventListener('mouseout', () => {
  sermonPlayBtn.classList.remove('scale-110');
});

// Volunteer button pulse animation
const volunteerBtn = document.getElementById('volunteer-btn');

setInterval(() => {
  volunteerBtn.classList.add('animate-pulse');
  setTimeout(() => {
    volunteerBtn.classList.remove('animate-pulse');
  }, 1000);
}, 3000);