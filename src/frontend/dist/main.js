/* ===== AURA WELLNESS — MAIN.JS (shared utilities) ===== */

// ---- Theme ----
(function(){
  const saved = localStorage.getItem('aura-theme') || 'dark';
  document.documentElement.dataset.theme = saved;
})();

document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.getElementById('theme-toggle');
  if(toggle){
    const updateIcon = () => {
      toggle.textContent = document.documentElement.dataset.theme === 'dark' ? '☀️' : '🌙';
    };
    updateIcon();
    toggle.addEventListener('click', ()=>{
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('aura-theme', next);
      updateIcon();
    });
  }

  // ---- Page Loader ----
  const loader = document.getElementById('page-loader');
  if(loader){
    if(!localStorage.getItem('aura-loader-shown')){
      setTimeout(()=>{
        loader.classList.add('hide');
        setTimeout(()=>loader.remove(), 600);
        localStorage.setItem('aura-loader-shown','1');
      }, 2200);
    } else {
      loader.remove();
    }
  }

  // ---- Custom Cursor ----
  const cur = document.getElementById('cursor');
  if(cur && window.matchMedia('(pointer:fine)').matches){
    let mx=0,my=0,cx=0,cy=0;
    document.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });
    (function loop(){
      cx += (mx-cx)*0.18; cy += (my-cy)*0.18;
      cur.style.left = cx+'px'; cur.style.top = cy+'px';
      requestAnimationFrame(loop);
    })();
  }

  // ---- Hamburger ----
  const ham = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose = document.getElementById('menu-close');
  if(ham && mobileMenu){
    ham.addEventListener('click', ()=> mobileMenu.classList.add('open'));
    if(menuClose) menuClose.addEventListener('click', ()=> mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));
  }

  // ---- Active nav link ----
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a=>{
    const href = a.getAttribute('href') || '';
    if(href === page || (page==='' && href==='index.html') || (page==='index.html' && href==='index.html')){
      a.classList.add('active');
    }
  });

  // ---- Page transition on nav click ----
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(!href || href.startsWith('#')) return;
      e.preventDefault();
      const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(!pref && window.gsap){
        gsap.to('main', {opacity:0, y:-16, duration:0.28, onComplete:()=>{ window.location.href = href; }});
      } else {
        window.location.href = href;
      }
    });
  });

  // ---- Footer injection ----
  const footer = document.getElementById('site-footer');
  if(footer) footer.innerHTML = `
    <svg class="footer-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0D1B22"/>
    </svg>
    <canvas class="footer-particles" id="footer-canvas"></canvas>
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Aura Wellness</h4>
        <p>Your journey to total wellness starts here. Mind, Body, Soul — all in one place.</p>
        <div class="footer-newsletter" style="margin-top:16px">
          <input type="email" placeholder="Your email" id="footer-email">
          <button onclick="window.location='/newsletter.html'">Subscribe</button>
        </div>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <a href="/index.html">Home</a>
        <a href="/mind.html">Mind</a>
        <a href="/body.html">Body</a>
        <a href="/sleep.html">Sleep</a>
        <a href="/nutrition.html">Nutrition</a>
      </div>
      <div class="footer-col">
        <h4>Pages</h4>
        <a href="/blog.html">Blog</a>
        <a href="/consult.html">Consult</a>
        <a href="/newsletter.html">Newsletter</a>
        <a href="/reviews.html">Reviews</a>
        <a href="/login.html">Login</a>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <a href="#">Twitter / X</a>
        <a href="#">Instagram</a>
        <a href="#">YouTube</a>
        <a href="#">LinkedIn</a>
      </div>
    </div>
    <div class="footer-bottom">&copy; 2024 Aura Wellness. All rights reserved.</div>
  `;
  // footer particles
  const fc = document.getElementById('footer-canvas');
  if(fc){
    const fCtx = fc.getContext('2d');
    const particles = Array.from({length:5},()=>({x:Math.random()*1400,y:Math.random()*200,vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,r:3+Math.random()*3}));
    function drawFooterParticles(){
      fc.width=fc.offsetWidth; fc.height=fc.offsetHeight;
      fCtx.clearRect(0,0,fc.width,fc.height);
      particles.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>fc.width) p.vx*=-1;
        if(p.y<0||p.y>fc.height) p.vy*=-1;
        fCtx.beginPath();
        fCtx.arc(p.x,p.y,p.r,0,Math.PI*2);
        fCtx.fillStyle='rgba(123,104,238,0.35)';
        fCtx.fill();
      });
      requestAnimationFrame(drawFooterParticles);
    }
    drawFooterParticles();
  }

  // ---- IntersectionObserver ----
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:0.12});
  document.querySelectorAll('.animate-on-scroll').forEach(el=>obs.observe(el));

  // ---- Page fade-in ----
  const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!pref && window.gsap){
    gsap.from('main', {opacity:0, y:18, duration:0.35});
  }
});
