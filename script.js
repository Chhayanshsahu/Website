document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        const icon = themeToggle.querySelector('i');
        icon.className = document.body.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Project modals
    const seeMoreButtons = document.querySelectorAll('.see-more');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Sample project data - replace with your actual projects
    const projects = {
        1: {
            title: "PROJECT 1",
            description: "Detailed description of Project 1. Explain the game concept, your role in development, and any interesting technical challenges you overcame.",
            technologies: ["Unity", "C#", "Shader Graph", "AI Pathfinding"],
            codeLink: "https://github.com/Chhayanshsahu/TeamVyau",
            demoLink: "#",
            video: `
            <video controls>
                <source src="videos/aksa.mp4" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
        `,
            screenshots: [
                "images/aksa1.png",
                "screenshot2.jpg",
                "screenshot3.jpg",
                "screenshot4.jpg"
            ]
        },
        2: {
            title: "PROJECT 2",
            description: "Detailed description of Project 2.",
            technologies: ["Unreal Engine", "C++", "Blueprints"],
            codeLink: "#",
            demoLink: "#",
            video: "<iframe src='your-video-url' frameborder='0' allowfullscreen></iframe>",
            screenshots: [
                "screenshot1.jpg",
                "screenshot2.jpg"
            ]
        },
        3: {
            title: "PROJECT 3",
            description: "Detailed description of Project 3.",
            technologies: ["Godot", "GDScript", "Pixel Art"],
            codeLink: "#",
            demoLink: "#",
            video: "<iframe src='your-video-url' frameborder='0' allowfullscreen></iframe>",
            screenshots: [
                "screenshot1.jpg",
                "screenshot2.jpg",
                "screenshot3.jpg"
            ]
        }
    };

    seeMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.project;
            const project = projects[projectId];
            
            // Update modal content
            document.getElementById('modal-title').textContent = project.title;
            document.getElementById('project-description').textContent = project.description;
            
            const technologiesList = document.getElementById('project-technologies');
            technologiesList.innerHTML = '';
            project.technologies.forEach(tech => {
                const li = document.createElement('li');
                li.textContent = tech;
                technologiesList.appendChild(li);
            });
            
            document.getElementById('project-code-link').href = project.codeLink;
            document.getElementById('project-live-link').href = project.demoLink;
            
            // Add video
            const videoContainer = document.querySelector('.video-container');
            videoContainer.innerHTML = project.video;
            
            // Add screenshots
            const screenshotsContainer = document.querySelector('.screenshots');
            screenshotsContainer.innerHTML = '';
            project.screenshots.forEach(screenshot => {
                const img = document.createElement('img');
                img.src = screenshot;
                img.alt = `${project.title} screenshot`;
                screenshotsContainer.appendChild(img);
            });
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});