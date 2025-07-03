// Add this near the top of your DOMContentLoaded function
function initParticleNetwork() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
        });
    }
    
    // Mouse position tracking
    let mouseX = null;
    let mouseY = null;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    document.addEventListener('mouseout', () => {
        mouseX = null;
        mouseY = null;
    });
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(15, 240, 252, 0.5)';
        
        // Update and draw particles
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw lines to nearby particles
            particles.forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(15, 240, 252, ${1 - distance/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
            
            // React to mouse
            if (mouseX && mouseY) {
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 42, 109, ${1 - distance/150})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                    
                    // Push particles away from mouse
                    const force = (150 - distance) / 50;
                    p.x += dx / distance * force;
                    p.y += dy / distance * force;
                }
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

initParticleNetwork();
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