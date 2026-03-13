(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('#navbar nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    nav.classList.toggle('open', open);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    });
  });
})();

(function initSkillBars() {
  const about = document.getElementById('about');
  if (!about) return;
  let done = false;

  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) {
      done = true;
      document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.style.getPropertyValue('--pct') || '0%';
      });
    }
  }, { threshold: 0.3 }).observe(about);
})();

(function initProjectSelector() {
  const folders = document.querySelectorAll('.folder-item');
  const projectRows = document.querySelectorAll('.project-row');

  // Highlight folder on click
  folders.forEach(folder => {
    folder.addEventListener('click', () => {
      folders.forEach(f => f.classList.remove('active'));
      folder.classList.add('active');
    });
  });

  // Scroll Spy for project folders
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        folders.forEach(folder => {
          folder.classList.toggle('active', folder.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.5 });

  projectRows.forEach(row => observer.observe(row));
})();

function swapGalleryImage(galleryId, newSrc) {
  const mainImg = document.querySelector(`#${galleryId} img`);
  if (mainImg) {
    mainImg.src = newSrc;
  }
}

(function initVideoHover() {
  document.querySelectorAll('.project-row').forEach(row => {
    const video = row.querySelector('.project-vid');
    if (!video) return;

    row.addEventListener('mouseenter', () => {
      video.play().catch(() => { });
    });

    row.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
})();


