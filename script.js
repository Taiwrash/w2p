// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');
const sections = document.querySelectorAll('section');

// Mobile Menu Toggle
mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    navbar.classList.toggle('nav-open');
    document.body.style.overflow = navbar.classList.contains('nav-open') ? 'hidden' : '';
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 28, 21, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    } else {
        navbar.style.background = 'rgba(15, 28, 21, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in classes to elements
document.querySelectorAll('.feature-card, .hero-content, .step-item, .mission-text').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});
