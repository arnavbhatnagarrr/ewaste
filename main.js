// ---------------- GLOBAL CONFIG ---------------- //
const API_URL = 'http://localhost:5001/api/contact';


// ---------------- NAVBAR ---------------- //
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


// ---------------- SCROLL ANIMATIONS ---------------- //
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


// ---------------- CONTACT FORM ---------------- //
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const success = document.getElementById('formSuccess');
    const errorBox = document.getElementById('formError');

    const payload = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      type: document.getElementById('type').value,
      message: document.getElementById('message').value.trim(),
    };

    // -------- Validation -------- //
    if (!payload.name || !payload.email || !payload.message) {
      errorBox.textContent = '❌ Please fill all required fields.';
      errorBox.style.display = 'block';
      return;
    }

    // -------- Loading state -------- //
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    form.style.opacity = '0.7';
    if (errorBox) errorBox.style.display = 'none';

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        form.reset();
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      } else {
        throw new Error(data.error || 'Something went wrong.');
      }

    } catch (err) {
      form.style.opacity = '1';
      submitBtn.textContent = 'Send Message →';
      submitBtn.disabled = false;

      if (errorBox) {
        errorBox.textContent = '❌ ' + err.message;
        errorBox.style.display = 'block';
      } else {
        alert('Error: ' + err.message);
      }
    }
  });
}


// ---------------- ACTIVE NAV LINK ---------------- //
const currentPath = window.location.pathname.split('/').pop();

document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const linkPath = link.getAttribute('href').split('/').pop();

  if (
    ((currentPath === '' || currentPath === 'index.html') && linkPath === '') ||
    (linkPath && currentPath === linkPath)
  ) {
    link.style.color = 'var(--green)';
    link.style.fontWeight = '600';
  }
});