/* ============================================
   AssignmentSides — script.js
   With Login/Register connected to Spring Boot
   ============================================ */

const API = 'http://localhost:8081/api/users';

// ── MODAL ELEMENTS ──
const loginModal    = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

// ── OPEN MODALS ──
function openLogin()    { loginModal.classList.add('active');    registerModal.classList.remove('active'); }
function openRegister() { registerModal.classList.add('active'); loginModal.classList.remove('active'); }
function closeAll()     { loginModal.classList.remove('active'); registerModal.classList.remove('active'); }

// ── NAV BUTTONS ──
document.querySelector('.nav-btns .btn-outline')?.addEventListener('click', e => { e.preventDefault(); openLogin(); });
document.querySelector('.nav-btns .btn-primary')?.addEventListener('click', e => { e.preventDefault(); openRegister(); });

// ── HERO BUTTONS ──
document.querySelectorAll('a[href="#"]').forEach(btn => {
  if (btn.textContent.includes('Find a Writer')) btn.addEventListener('click', e => { e.preventDefault(); openRegister(); });
  if (btn.textContent.includes('Start Earning')) btn.addEventListener('click', e => { e.preventDefault(); openRegister(); });
  if (btn.textContent.includes('Get Started'))   btn.addEventListener('click', e => { e.preventDefault(); openRegister(); });
});

// ── CLOSE BUTTONS ──
document.getElementById('closeLogin')?.addEventListener('click', closeAll);
document.getElementById('closeRegister')?.addEventListener('click', closeAll);
document.getElementById('goToRegister')?.addEventListener('click', openRegister);
document.getElementById('goToLogin')?.addEventListener('click', openLogin);

// Close when clicking outside modal
document.addEventListener('click', e => {
  if (e.target === loginModal || e.target === registerModal) closeAll();
});

// Close on Escape key
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

// ── SHOW MESSAGE ──
function showMsg(elId, text, type) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = text;
  el.className = 'form-msg ' + type;
  setTimeout(() => { el.className = 'form-msg'; el.textContent = ''; }, 4000);
}

// ── REGISTER FORM ──
document.getElementById('registerForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Creating account... ⏳';
  btn.disabled = true;

  const body = {
    collegeId:  document.getElementById('regCollegeId').value.trim(),
    fullName:   document.getElementById('regFullName').value.trim(),
    email:      document.getElementById('regEmail').value.trim(),
    department: document.getElementById('regDepartment').value,
    password:   document.getElementById('regPassword').value,
    role:       document.getElementById('regRole').value
  };

  try {
    const res  = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const text = await res.text();

    if (text.includes('successfully')) {
      showMsg('registerMsg', '🎉 ' + text, 'success');
      e.target.reset();
      setTimeout(() => { closeAll(); openLogin(); }, 2000);
    } else {
      showMsg('registerMsg', '❌ ' + text, 'error');
    }
  } catch (err) {
    showMsg('registerMsg', '❌ Cannot connect to server. Is Spring Boot running?', 'error');
  }

  btn.textContent = 'Create Account 🎉';
  btn.disabled = false;
});

// ── LOGIN FORM ──
document.getElementById('loginForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Logging in... ⏳';
  btn.disabled = true;

  const collegeId = document.getElementById('loginCollegeId').value.trim();
  const password  = document.getElementById('loginPassword').value;

  try {
    const res  = await fetch(`${API}/${collegeId}`, { method: 'GET' });
    const user = await res.json();

    if (user && user.password === password) {
      showMsg('loginMsg', `✅ Welcome back, ${user.fullName}! 🎉`, 'success');
      localStorage.setItem('loggedUser', JSON.stringify(user));
      setTimeout(() => {
        closeAll();
        updateNavForLoggedUser(user);
      }, 1500);
    } else {
      showMsg('loginMsg', '❌ Wrong College ID or Password!', 'error');
    }
  } catch (err) {
    showMsg('loginMsg', '❌ Cannot connect to server. Is Spring Boot running?', 'error');
  }

  btn.textContent = 'Login 🚀';
  btn.disabled = false;
});

// ── UPDATE NAV AFTER LOGIN ──
function updateNavForLoggedUser(user) {
  const navBtns = document.querySelector('.nav-btns');
  if (navBtns) {
    navBtns.innerHTML = `
      <span style="font-weight:700; color:#15803d;">
        Hi, ${user.fullName.split(' ')[0]}! 👋
      </span>
      <button onclick="logout()" class="btn-outline">Logout</button>
    `;
  }
}

// ── LOGOUT ──
function logout() {
  localStorage.removeItem('loggedUser');
  location.reload();
}

// ── CHECK IF ALREADY LOGGED IN ──
const savedUser = localStorage.getItem('loggedUser');
if (savedUser) updateNavForLoggedUser(JSON.parse(savedUser));

// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString('en-IN');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString('en-IN');
    }
  }, 16);
}

const counterEls = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target, parseInt(entry.target.dataset.target));
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

// ── SCROLL FADE IN ──
const fadeEls = document.querySelectorAll('.feature-card,.step,.testi-card,.funny-card,.stat-card');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'opacity .5s ease, transform .5s ease';
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  fadeObserver.observe(el);
});

// ── NAVBAR SHADOW ON SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.style.boxShadow = window.scrollY > 20
    ? '0 4px 24px rgba(0,0,0,0.10)'
    : '0 2px 8px rgba(0,0,0,0.06)';
});

// ── HAMBURGER ──
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('mobile-open');
  document.querySelector('.nav-btns')?.classList.toggle('mobile-open');
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

console.log('🎓 AssignmentSides loaded! Backend connected. 🚀');