document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Project category switching
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCategories = document.querySelectorAll('.project-category');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the category to show
            const category = this.getAttribute('data-category');
            
            // Hide all project categories
            projectCategories.forEach(cat => cat.classList.remove('active'));
            // Show the selected category
            document.getElementById(`${category}-category`).classList.add('active');
        });
    });
    
    // Skill circle animations
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    skillCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const fill = circle.querySelector('.circle-fill');
        
        // Set the stroke-dasharray based on the percentage
        fill.style.strokeDasharray = `${percent}, 100`;
    });
    
    // Media modal functionality
    const mediaThumbnails = document.querySelectorAll('.media-thumbnail');
    const mediaModal = document.querySelector('.media-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalVideo = document.querySelector('.media-video');
    const modalImage = document.querySelector('.media-image');
    
    mediaThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const mediaSrc = this.getAttribute('data-media');
            
            // Check if it's a video or image
            if (mediaSrc.includes('videos/')) {
                // It's a video
                modalVideo.style.display = 'block';
                modalImage.style.display = 'none';
                modalVideo.src = mediaSrc;
            } else {
                // It's an image
                modalVideo.style.display = 'none';
                modalImage.style.display = 'block';
                modalImage.src = mediaSrc;
                modalImage.alt = this.querySelector('span').textContent;
            }
            
            // Show the modal
            mediaModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        mediaModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Pause video when closing
        if (modalVideo) {
            modalVideo.pause();
        }
    });
    
    // Close modal when clicking outside content
    mediaModal.addEventListener('click', function(e) {
        if (e.target === mediaModal) {
            mediaModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Pause video when closing
            if (modalVideo) {
                modalVideo.pause();
            }
        }
    });
    
    // Add glitch effect to active nav link
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
        const scrollPosition = window.scrollY;
        
        navLinksAll.forEach(link => {
            const sectionId = link.getAttribute('href');
            const section = document.querySelector(sectionId);
            
            if (section.offsetTop - 100 <= scrollPosition && 
                section.offsetTop + section.offsetHeight - 100 > scrollPosition) {
                link.classList.add('glitch');
                link.setAttribute('data-text', link.textContent);
            } else {
                link.classList.remove('glitch');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Run once on load
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            const centerX = this.offsetWidth / 2;
            const centerY = this.offsetHeight / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
        });
    });
    
    // Add parallax effect to hologram
    const hologram = document.querySelector('.hologram-inner');
    
    if (hologram) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            hologram.style.transform = `rotateY(${x * 20 - 10}deg) rotateX(${y * 20 - 10}deg)`;
        });
    }
    
    // Add scroll animation
    const sections = document.querySelectorAll('section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once on load
});