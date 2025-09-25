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

  // Modal functionality
  const modal = document.getElementById('eventModal');
  const mainContent = document.getElementById('main-content');
  const closeModalBtn = document.getElementById('closeModal');
  const eventDetailsBtns = document.querySelectorAll('.event-details3-btn');
  const addToCalendarBtn = document.getElementById('addToCalendarBtn');
  const shareEventBtn = document.getElementById('shareEventBtn');
  const viewCalendarBtn = document.getElementById('viewCalendarBtn');
  const contactUsBtn = document.getElementById('contactUsBtn');

  // Function to open modal
  function openModal(eventData) {
    // Update modal content
    document.getElementById('modalTitle').textContent = eventData.title;
    document.getElementById('modalDate').textContent = eventData.date;
    document.getElementById('modalTime').textContent = eventData.time;
    document.getElementById('modalLocation').textContent = eventData.location;
    document.getElementById('modalDescription').textContent = eventData.description;

    // Generate QR code with safety check
    const canvas = document.getElementById('qrcode');
    if (canvas) {
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Check if QRCode library is available
      if (typeof QRCode !== 'undefined') {
        const qrData = `Event: ${eventData.title}\nDate: ${eventData.date}\nTime: ${eventData.time}\nLocation: ${eventData.location}\nDescription: ${eventData.description}`;
        
        QRCode.toCanvas(canvas, qrData, {
          width: 200,
          height: 200,
          colorDark: '#dc2626',
          colorLight: '#ffffff',
          margin: 2
        }, function (error) {
          if (error) {
            console.error('QR Code generation error:', error);
            showQRCodeError(context, canvas);
          }
        });
      } else {
        showQRCodeError(context, canvas);
      }
    }

    // Set up calendar and share functionality for this event
    setupEventActions(eventData);

    // Show modal with animation
    modal.classList.add('active');
    if (mainContent) mainContent.classList.add('blurred');
    document.body.style.overflow = 'hidden';
  }

  // Function to show QR code error
  function showQRCodeError(context, canvas) {
    context.fillStyle = '#f3f4f6';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#dc2626';
    context.font = '14px Arial';
    context.textAlign = 'center';
    context.fillText('QR Code Feature', canvas.width/2, canvas.height/2 - 10);
    context.fillText('Not Available', canvas.width/2, canvas.height/2 + 10);
  }

  // Function to close modal
  function closeModal() {
    modal.classList.remove('active');
    if (mainContent) mainContent.classList.remove('blurred');
    document.body.style.overflow = 'auto';
  }

  // Set up calendar and share functionality
  function setupEventActions(eventData) {
    // Add to Calendar functionality
    if (addToCalendarBtn) {
      addToCalendarBtn.onclick = function() {
        // Simple date parsing for ICS format
        const dateStr = eventData.date;
        const timeRange = eventData.time.split(' - ');
        const startTime = timeRange[0];
        const endTime = timeRange[1];
        
        // Create a simple date string for demonstration
        const icsContent = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          `SUMMARY:${eventData.title}`,
          `DTSTART:20241225T090000`, // Simplified for demo
          `DTEND:20241225T120000`,   // Simplified for demo
          `LOCATION:${eventData.location}`,
          `DESCRIPTION:${eventData.description}`,
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');
        
        // Download ICS file
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${eventData.title.replace(/\s+/g, '_')}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      };
    }

    // Share Event functionality
    if (shareEventBtn) {
      shareEventBtn.onclick = function() {
        const shareText = `Join us for ${eventData.title} on ${eventData.date} at ${eventData.time}. ${eventData.description}`;
        
        if (navigator.share) {
          // Use Web Share API if available
          navigator.share({
            title: eventData.title,
            text: shareText,
            url: window.location.href
          }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(shareText);
          });
        } else {
          // Fallback for browsers that don't support Web Share API
          fallbackShare(shareText);
        }
      };

      function fallbackShare(text) {
        // Copy to clipboard as fallback
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            alert('Event details copied to clipboard!');
          }).catch(err => {
            // Final fallback - show text in alert
            alert(`Share this event:\n\n${text}`);
          });
        } else {
          // Final fallback - show text in alert
          alert(`Share this event:\n\n${text}`);
        }
      }
    }
  }

  // Event listeners for event detail buttons
  eventDetailsBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const eventData = {
        title: this.getAttribute('data-event-title'),
        date: this.getAttribute('data-event-date'),
        time: this.getAttribute('data-event-time'),
        location: this.getAttribute('data-event-location'),
        description: this.getAttribute('data-event-description')
      };
      
      openModal(eventData);
    });
  });

  // Close modal event listeners
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });