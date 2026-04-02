/* ===== HOME PAGE JS ===== */
document.addEventListener('DOMContentLoaded', function(){
  const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Video fallback ---
  const video = document.getElementById('hero-video');
  const aurora = document.getElementById('aurora-canvas');
  if(video){
    video.addEventListener('error', showAurora);
    video.addEventListener('stalled', ()=>setTimeout(showAurora, 3000));
    setTimeout(()=>{ if(video.readyState < 2) showAurora(); }, 4000);
  }
  function showAurora(){
    if(video) video.style.display='none';
    if(aurora){ aurora.style.display='block'; startAurora(aurora); }
  }
  function startAurora(c){
    const ctx = c.getContext('2d');
    let t = 0;
    function resize(){ c.width=c.offsetWidth; c.height=c.offsetHeight; }
    resize(); window.addEventListener('resize',resize);
    const blobs = [
      {x:0.2,y:0.4,r:0.35,color:'rgba(123,104,238,0.25)',speed:0.0008},
      {x:0.7,y:0.6,r:0.3,color:'rgba(26,46,53,0.4)',speed:0.0012},
      {x:0.5,y:0.3,r:0.4,color:'rgba(245,230,200,0.08)',speed:0.0006},
    ];
    function draw(){
      ctx.clearRect(0,0,c.width,c.height);
      ctx.fillStyle='#0D1B22'; ctx.fillRect(0,0,c.width,c.height);
      blobs.forEach((b,i)=>{
        const x = (b.x + Math.sin(t*b.speed*1000+i)*0.15)*c.width;
        const y = (b.y + Math.cos(t*b.speed*800+i)*0.12)*c.height;
        const r = b.r * Math.min(c.width,c.height);
        const g = ctx.createRadialGradient(x,y,0,x,y,r);
        g.addColorStop(0,b.color); g.addColorStop(1,'transparent');
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
      });
      t++; requestAnimationFrame(draw);
    }
    draw();
  }

  // --- GSAP Hero animations ---
  if(!pref && window.gsap){
    const words = document.querySelectorAll('#hero-headline .word');
    gsap.to(words, {opacity:1, y:0, stagger:0.15, delay:0.5, duration:0.6, ease:'power2.out'});
    gsap.to('#hero-sub', {opacity:1, delay: words.length*0.15+0.9, duration:0.6});
  } else {
    document.querySelectorAll('#hero-headline .word').forEach(w=>w.style.opacity='1');
    const sub = document.getElementById('hero-sub');
    if(sub) sub.style.opacity='1';
  }

  // --- Video controls ---
  const vc = document.getElementById('video-controls');
  const vcPlay = document.getElementById('vc-play');
  const vcMute = document.getElementById('vc-mute');
  const vcFs = document.getElementById('vc-fs');
  const vcBar = document.getElementById('video-progress');
  const vcFill = document.getElementById('video-progress-fill');
  if(vc && video){
    setTimeout(()=>vc.classList.add('show'), 2000);
    window.addEventListener('scroll', ()=>{
      if(window.scrollY > window.innerHeight * 0.6) vc.classList.remove('show');
      else vc.classList.add('show');
    });
    vcPlay && vcPlay.addEventListener('click', ()=>{ video.paused ? video.play() : video.pause(); vcPlay.textContent = video.paused ? '▶' : '⏸'; });
    vcMute && vcMute.addEventListener('click', ()=>{ video.muted = !video.muted; vcMute.textContent = video.muted ? '🔇' : '🔊'; });
    vcFs && vcFs.addEventListener('click', ()=>{ if(document.fullscreenElement) document.exitFullscreen(); else document.getElementById('hero').requestFullscreen(); });
    video.addEventListener('timeupdate', ()=>{
      if(vcFill && video.duration) vcFill.style.width = (video.currentTime/video.duration*100)+'%';
    });
    vcBar && vcBar.addEventListener('click', e=>{
      const rect = vcBar.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      if(video.duration) video.currentTime = pct * video.duration;
    });
  }

  // --- Counters ---
  const counters = document.querySelectorAll('.counter-num');
  const cObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting || e.target.dataset.counted) return;
      e.target.dataset.counted = '1';
      const target = +e.target.dataset.target;
      const duration = 1800;
      const step = target / (duration/16);
      let current = 0;
      const timer = setInterval(()=>{
        current += step;
        if(current >= target){ current = target; clearInterval(timer); }
        e.target.textContent = target >= 1000 ? Math.floor(current).toLocaleString()+'+' : Math.floor(current) + (target===98?'%':'');
      }, 16);
    });
  }, {threshold:0.5});
  counters.forEach(c=>cObs.observe(c));

  // --- Daily tip ---
  const tips = [
    {emoji:'🌟', title:'Start Your Morning Mindfully', body:'Spend 5 minutes in silence before checking your phone. Set your intention for the day.'},
    {emoji:'💧', title:'Stay Hydrated', body:'Drink a glass of water first thing in the morning to kickstart your metabolism.'},
    {emoji:"🧘", title:'Breathe Deeply', body:'Try box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat 4 times.'},
    {emoji:'🌟', title:'Walk Outside', body:'Even 10 minutes of outdoor walking reduces cortisol and boosts mood significantly.'},
    {emoji:'🛌', title:'Sleep by 10:30 PM', body:'Your body repairs most during 10 PM–2 AM. Consistent bedtime anchors your circadian rhythm.'},
    {emoji:'🥕', title:'Eat a Rainbow', body:'Aim for 5 different coloured vegetables or fruits today for diverse micronutrients.'},
    {emoji:'📵', title:'Digital Sunset', body:'Put your phone away 1 hour before bed. Blue light disrupts melatonin production.'},
  ];
  const today = new Date().toDateString();
  const cache = JSON.parse(localStorage.getItem('aura-daily-tip')||'{}');
  let tipIdx;
  if(cache.date === today) tipIdx = cache.idx;
  else { tipIdx = Math.floor(Date.now()/86400000) % tips.length; localStorage.setItem('aura-daily-tip',JSON.stringify({date:today,idx:tipIdx})); }
  const tip = tips[tipIdx];
  document.getElementById('tip-emoji').textContent = tip.emoji;
  document.getElementById('tip-title').textContent = tip.title;
  document.getElementById('tip-body').textContent = tip.body;
});
