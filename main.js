
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
  });


  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.textContent = '☰';
    });
  });
}


const observerOptions = { threshold: 0.12 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);


document.querySelectorAll(
  '.pillar-card, .stat-card, .about-card, .prob-stat, .solution-steps li, blockquote'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});


const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    form.style.opacity = '0.5';
    setTimeout(() => {
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    }, 600);
  });
}


const currentPath = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const linkPath = link.getAttribute('href').split('/').pop();
  if (
    (currentPath === '' || currentPath === 'index.html') && linkPath === '' ||
    linkPath && currentPath === linkPath
  ) {
    link.style.color = 'var(--green)';
    link.style.fontWeight = '600';
  }
});
