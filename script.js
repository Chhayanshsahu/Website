// script.js - OPTIMIZED
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        this.setAttribute('aria-expanded', 
            this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        navLinks.classList.toggle('active');
    });

    // Lazy loading images
    const lazyImages = document.querySelectorAll('.lazy');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Animate skill bars on scroll
    const animateSkills = () => {
        document.querySelectorAll('.skill-level').forEach(bar => {
            bar.style.width = bar.dataset.level;
        });
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) skillsObserver.observe(skillsSection);

    // Typing effect (simplified)
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.dataset.text;
        let i = 0;
        const type = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        setTimeout(type, 500);
    }
});