// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Navigation menu toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        showNotification('Mesazhi juaj u dërgua me sukses!', 'success');
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification.success {
        border-left: 4px solid #4CAF50;
    }
    
    .notification.success i {
        color: #4CAF50;
    }
    
    .notification.info {
        border-left: 4px solid #2196F3;
    }
    
    .notification.info i {
        color: #2196F3;
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .burger.toggle .line2 {
        opacity: 0;
    }
    
    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Doctors Slideshow
const doctorsGrid = document.querySelector('.doctors-grid');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const slidesPerView = window.innerWidth > 1200 ? 4 : window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
const totalSlides = document.querySelectorAll('.doctor-card').length;
const maxSlides = Math.ceil(totalSlides / slidesPerView);

function updateSlider() {
    const slideWidth = doctorsGrid.querySelector('.doctor-card').offsetWidth;
    const gap = 32; // 2rem gap
    const offset = currentSlide * (slideWidth + gap) * slidesPerView;
    doctorsGrid.style.transform = `translateX(-${offset}px)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update button states
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide >= maxSlides - 1;
}

// Initialize slider
updateSlider();

// Event listeners for controls
prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < maxSlides - 1) {
        currentSlide++;
        updateSlider();
    }
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        currentSlide = 0;
        updateSlider();
    }, 250);
}); 