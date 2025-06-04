// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Project Modals
  const modalBtns = document.querySelectorAll('.project-btn');
  const modals = document.querySelectorAll('.modal');
  const closeBtns = document.querySelectorAll('.close');

  modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      document.getElementById(`${projectId}-modal`).style.display = 'block';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Copy phone number
  const phone = document.querySelector('.contact-info p:first-child');
  phone.addEventListener('click', () => {
    navigator.clipboard.writeText('+91 8819003026');
    const originalText = phone.textContent;
    phone.textContent = 'Copied to clipboard!';
    setTimeout(() => {
      phone.textContent = originalText;
    }, 2000);
  });
});

// Fullscreen Screenshots
document.querySelectorAll('.project-gallery img').forEach(img => {
  img.addEventListener('click', () => {
    const fullscreen = document.createElement('div');
    fullscreen.style.position = 'fixed';
    fullscreen.style.top = '0';
    fullscreen.style.left = '0';
    fullscreen.style.width = '100vw';
    fullscreen.style.height = '100vh';
    fullscreen.style.backgroundColor = 'rgba(0,0,0,0.9)';
    fullscreen.style.display = 'flex';
    fullscreen.style.justifyContent = 'center';
    fullscreen.style.alignItems = 'center';
    fullscreen.style.zIndex = '3000';
    fullscreen.style.cursor = 'zoom-out';

    const fullscreenImg = document.createElement('img');
    fullscreenImg.src = img.src;
    fullscreenImg.style.maxWidth = '90%';
    fullscreenImg.style.maxHeight = '90%';
    fullscreenImg.style.objectFit = 'contain';

    fullscreen.appendChild(fullscreenImg);
    document.body.appendChild(fullscreen);

    fullscreen.addEventListener('click', () => {
      document.body.removeChild(fullscreen);
    });
  });

});
