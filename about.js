 // Initialize AOS animations
 AOS.init({
    duration: 800,
    once: true
  });

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
      console.log('Mobile menu clicked');
    });
  }

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