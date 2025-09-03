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

  // Header background change on scroll (optional - since it's already dark)
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('shadow-lg'); // Add shadow on scroll for more depth
    } else {
      header.classList.remove('shadow-lg');
    }
  });

  // Event card hover effects
  const eventCards = document.querySelectorAll('.event-card');
  
  eventCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
  });

  // Smooth scroll for anchor links
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
  });

  // Add loading animation for event details links
  document.querySelectorAll('a[href="#"]').forEach(link => {
    if (link.textContent.includes('Event Details')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        link.innerHTML = 'Loading...';
        setTimeout(() => {
          link.innerHTML = 'Event Details';
        }, 1000);
      });
    }
  });