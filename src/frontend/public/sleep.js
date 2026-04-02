/* SLEEP PAGE JS */
document.addEventListener('DOMContentLoaded', function(){
  // --- Starfield canvas ---
  const c = document.getElementById('star-canvas');
  if(c && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const ctx = c.getContext('2d');
    const stars = [];
    function resize(){ c.width=window.innerWidth; c.height=window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    for(let i=0;i<160;i++) stars.push({x:Math.random(),y:Math.random(),r:0.5+Math.random()*1.5,a:Math.random(),da:(Math.random()-0.5)*0.01});
    function draw(){
      ctx.clearRect(0,0,c.width,c.height);
      stars.forEach(s=>{
        s.a = Math.max(0.05, Math.min(1, s.a + s.da));
        if(s.a<=0.05||s.a>=1) s.da*=-1;
        ctx.beginPath(); ctx.arc(s.x*c.width, s.y*c.height, s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(232,244,248,${s.a})`; ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  // --- Moon phase ---
  const shadow = document.getElementById('moon-shadow');
  const phaseName = document.getElementById('moon-phase-name');
  if(shadow && phaseName){
    const known = new Date('2000-01-06'); // known new moon
    const now = new Date();
    const diffDays = (now - known) / 86400000;
    const cycle = diffDays % 29.53;
    const phases = [
      {name:'New Moon', cx:60, r:50},
      {name:'Waxing Crescent', cx:72, r:50},
      {name:'First Quarter', cx:80, r:48},
      {name:'Waxing Gibbous', cx:88, r:46},
      {name:'Full Moon', cx:200, r:50},
      {name:'Waning Gibbous', cx:32, r:46},
      {name:'Last Quarter', cx:40, r:48},
      {name:'Waning Crescent', cx:48, r:50},
    ];
    const phaseIdx = Math.floor(cycle / (29.53/8));
    const p = phases[Math.min(phaseIdx, phases.length-1)];
    phaseName.textContent = p.name;
    shadow.setAttribute('cx', p.cx);
    shadow.setAttribute('r', p.r);
  }

  // --- Sound player ---
  let activeSound = null;
  document.querySelectorAll('.sound-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const sound = btn.dataset.sound;
      if(activeSound === sound){ btn.classList.remove('active'); activeSound=null; document.getElementById('now-playing').textContent=''; return; }
      document.querySelectorAll('.sound-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active'); activeSound = sound;
      document.getElementById('now-playing').textContent = '▶️ Now Playing: '+sound;
    });
  });

  // --- Checklist (localStorage) ---
  const checkboxes = document.querySelectorAll('#checklist input[type=checkbox]');
  const saved = JSON.parse(localStorage.getItem('aura-sleep-checklist')||'{}');
  checkboxes.forEach(cb=>{
    if(saved[cb.id]) cb.checked = true;
    cb.closest('.checklist-item').classList.toggle('done', cb.checked);
    cb.addEventListener('change', ()=>{
      cb.closest('.checklist-item').classList.toggle('done', cb.checked);
      const state={}; checkboxes.forEach(c=>state[c.id]=c.checked);
      localStorage.setItem('aura-sleep-checklist', JSON.stringify(state));
      updateProgress();
    });
  });
  function updateProgress(){
    const done = [...checkboxes].filter(c=>c.checked).length;
    const el = document.getElementById('checklist-progress');
    if(el) el.textContent = `${done} of ${checkboxes.length} habits completed tonight ✓`;
  }
  updateProgress();
});
