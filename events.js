// Initialize AOS animations
AOS.init({
  duration: 800,
  once: false,//change to true later
  offset: 100
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

// Current event data for calendar integration
let currentEventData = null;

// Function to open modal
function openModal(eventData) {
  // Store current event data for calendar integration
  currentEventData = eventData;
  
  // Update modal content
  document.getElementById('modalTitle').textContent = eventData.title;
  document.getElementById('modalDate').textContent = eventData.date;
  document.getElementById('modalTime').textContent = eventData.time;
  document.getElementById('modalLocation').textContent = eventData.location;
  document.getElementById('modalDescription').textContent = eventData.description;

  // Generate QR code with safety check
  generateQRCode(eventData.title, eventData.date, eventData.time, eventData.location);

  // Set up calendar and share functionality for this event
  setupEventActions(eventData);

  // Show modal with animation
  modal.classList.add('active');
  if (mainContent) mainContent.classList.add('blurred');
  document.body.style.overflow = 'hidden';
}

// Generate QR Code function
function generateQRCode(title, date, time, location) {
  const canvas = document.getElementById('qrcode');
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Create QR code data
  const qrData = `Event: ${title}\nDate: ${date}\nTime: ${time}\nLocation: ${location}`;
  
  // Check if QRCode library is available
  if (typeof QRCode !== 'undefined') {
    QRCode.toCanvas(canvas, qrData, {
      width: 200,
      height: 200,
      colorDark: '#dc2626',
      colorLight: '#ffffff',
      margin: 2
    }, function (error) {
      if (error) {
        console.error('QR Code generation error:', error);
        showQRCodeError(ctx, canvas);
      }
    });
  } else {
    showQRCodeError(ctx, canvas);
  }
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
      if (currentEventData) {
        calendarModal.classList.add('active');
      }
    };
  }

  // Share Event functionality
  if (shareEventBtn) {
    shareEventBtn.onclick = function() {
      if (currentEventData) {
        if (navigator.share) {
          navigator.share({
            title: currentEventData.title,
            text: currentEventData.description,
            url: window.location.href,
          })
          .catch((error) => console.log('Error sharing', error));
        } else {
          // Fallback for browsers that don't support the Web Share API
          const eventDetails = `${currentEventData.title}\nDate: ${currentEventData.date}\nTime: ${currentEventData.time}\nLocation: ${currentEventData.location}\n\n${currentEventData.description}`;
          
          navigator.clipboard.writeText(eventDetails)
            .then(() => {
              alert('Event details copied to clipboard!');
            })
            .catch(err => {
              console.error('Failed to copy: ', err);
              // Fallback to showing the text in an alert
              alert(`Event Details:\n\n${eventDetails}`);
            });
        }
      }
    };
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

// Calendar Modal Functionality
const calendarModal = document.getElementById('calendarModal');
const closeCalendarModal = document.getElementById('closeCalendarModal');
const modalAddToCalendarBtn = document.getElementById('modalAddToCalendarBtn');

// Close calendar modal
closeCalendarModal.addEventListener('click', () => {
  calendarModal.classList.remove('active');
});

// Close calendar modal when clicking outside
calendarModal.addEventListener('click', (e) => {
  if (e.target === calendarModal) {
    calendarModal.classList.remove('active');
  }
});

// Calendar option functionality
document.getElementById('googleCalendar').addEventListener('click', () => {
  if (currentEventData) {
    addToGoogleCalendar(currentEventData);
    calendarModal.classList.remove('active');
  }
});

document.getElementById('outlookCalendar').addEventListener('click', () => {
  if (currentEventData) {
    addToOutlookCalendar(currentEventData);
    calendarModal.classList.remove('active');
  }
});

document.getElementById('appleCalendar').addEventListener('click', () => {
  if (currentEventData) {
    downloadICSFile(currentEventData);
    calendarModal.classList.remove('active');
  }
});

document.getElementById('icsDownload').addEventListener('click', () => {
  if (currentEventData) {
    downloadICSFile(currentEventData);
    calendarModal.classList.remove('active');
  }
});

// Function to add event to Google Calendar
function addToGoogleCalendar(eventData) {
  // Parse date and time
  const dateParts = eventData.date.split(' ');
  const month = getMonthNumber(dateParts[0]);
  const day = dateParts[1].replace(',', '');
  const year = dateParts[2];
  
  const timeParts = eventData.time.split(' - ')[0].split(' ');
  const time = timeParts[0];
  const period = timeParts[1];
  
  // Create start and end dates (assuming 3-hour duration)
  const startDate = new Date(`${month} ${day}, ${year} ${time} ${period}`);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours later
  
  // Format dates for Google Calendar URL
  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };
  
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`;
  
  window.open(googleCalendarUrl, '_blank');
}

// Function to add event to Outlook Calendar
function addToOutlookCalendar(eventData) {
  // Parse date and time
  const dateParts = eventData.date.split(' ');
  const month = getMonthNumber(dateParts[0]);
  const day = dateParts[1].replace(',', '');
  const year = dateParts[2];
  
  const timeParts = eventData.time.split(' - ')[0].split(' ');
  const time = timeParts[0];
  const period = timeParts[1];
  
  // Create start and end dates (assuming 3-hour duration)
  const startDate = new Date(`${month} ${day}, ${year} ${time} ${period}`);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours later
  
  // Format dates for Outlook URL
  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };
  
  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(eventData.title)}&startdt=${formatDate(startDate)}&enddt=${formatDate(endDate)}&body=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`;
  
  window.open(outlookCalendarUrl, '_blank');
}

// Function to download ICS file
function downloadICSFile(eventData) {
  // Parse date and time
  const dateParts = eventData.date.split(' ');
  const month = getMonthNumber(dateParts[0]);
  const day = dateParts[1].replace(',', '');
  const year = dateParts[2];
  
  const timeParts = eventData.time.split(' - ')[0].split(' ');
  const time = timeParts[0];
  const period = timeParts[1];
  
  // Create start and end dates (assuming 3-hour duration)
  const startDate = new Date(`${month} ${day}, ${year} ${time} ${period}`);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours later
  
  // Format dates for ICS file
  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '').slice(0, -1) + 'Z';
  };
  
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${eventData.title}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
DESCRIPTION:${eventData.description}
LOCATION:${eventData.location}
END:VEVENT
END:VCALENDAR`;
  
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${eventData.title.replace(/\s+/g, '-').toLowerCase()}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Helper function to get month number from month name
function getMonthNumber(monthName) {
  const months = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };
  return months[monthName] || '01';
}