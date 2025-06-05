// Sample Events Data (Dummy JSON)
const eventsData = [
    {
        id: 1,
        name: "Tech Innovation Summit 2025",
        date: "June 15, 2025",
        time: "9:00 AM",
        location: "Lahore Convention Center",
        description: "Join industry leaders and innovators for a day of inspiring talks, networking, and discovering the latest tech trends shaping our future.",
        icon: "fas fa-laptop-code"
    },
    {
        id: 2,
        name: "Food Festival Karachi",
        date: "June 20, 2025",
        time: "5:00 PM",
        location: "Clifton Beach, Karachi",
        description: "Experience the best of Pakistani cuisine with food stalls, cooking competitions, and live music in this amazing culinary celebration.",
        icon: "fas fa-utensils"
    },
    {
        id: 3,
        name: "Startup Pitch Night",
        date: "June 25, 2025",
        time: "7:00 PM",
        location: "Islamabad Business Hub",
        description: "Watch promising startups pitch their ideas to investors and industry experts. Network with entrepreneurs and discover the next big thing.",
        icon: "fas fa-rocket"
    },
    {
        id: 4,
        name: "Art & Culture Expo",
        date: "July 1, 2025",
        time: "11:00 AM",
        location: "National Museum, Karachi",
        description: "Immerse yourself in local art, crafts, and cultural performances. Meet artists, participate in workshops, and celebrate creativity.",
        icon: "fas fa-palette"
    },
    {
        id: 5,
        name: "Digital Marketing Workshop",
        date: "July 5, 2025",
        time: "2:00 PM",
        location: "Gulberg Business Center, Lahore",
        description: "Learn cutting-edge digital marketing strategies from industry experts. Hands-on sessions covering SEO, social media, and content marketing.",
        icon: "fas fa-chart-line"
    }
];

let filteredEvents = [...eventsData];

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const eventsGrid = document.getElementById('eventsGrid');
const noEvents = document.getElementById('noEvents');

function renderEvents(events) {
    eventsGrid.innerHTML = '';
    
    if (events.length === 0) {
        noEvents.style.display = 'block';
        return;
    }
    
    noEvents.style.display = 'none';
    
    events.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card fade-in';
        eventCard.style.animationDelay = `${index * 0.1}s`;
        
        eventCard.innerHTML = `
            <div class="event-image">
                <i class="${event.icon}"></i>
            </div>
            <div class="event-content">
                <div class="event-date">
                    <i class="fas fa-calendar-alt"></i> ${event.date} at ${event.time}
                </div>
                <h3 class="event-title">${event.name}</h3>
                <div class="event-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${event.location}
                </div>
                <p class="event-description">${event.description}</p>
                <button class="register-btn" onclick="registerEvent('${event.name}')">
                    <i class="fas fa-ticket-alt"></i> Register Now
                </button>
            </div>
        `;
        
        eventsGrid.appendChild(eventCard);
    });
}

function filterEvents(searchTerm) {
    const filtered = eventsData.filter(event => 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filteredEvents = filtered;
    renderEvents(filtered);
}

function registerEvent(eventName) {
    alert(`Registration successful for: ${eventName}\n\nThank you for your interest! You will receive a confirmation email shortly.`);
}

// Search Event Listeners
searchInput.addEventListener('input', (e) => {
    filterEvents(e.target.value);
});

searchBtn.addEventListener('click', () => {
    filterEvents(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        filterEvents(searchInput.value);
    }
});

// Smooth Scrolling for Navigation Links
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
        // Close mobile menu if open
        navLinks.classList.remove('active');
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Initialize Events on Load
document.addEventListener('DOMContentLoaded', () => {
    renderEvents(eventsData);
    
    // Add loading animation to cards
    setTimeout(() => {
        document.querySelectorAll('.event-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert(`Thank you ${name}!\n\nYour message has been sent successfully. We'll get back to you soon at ${email}.`);
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Newsletter Subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing!\n\nWe'll send event updates to ${email}.`);
    this.reset();
});

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        }
    });
});