/* CONSULT PAGE JS */
document.addEventListener('DOMContentLoaded', function(){
  // Specialty filter
  document.querySelectorAll('.spec-pill').forEach(pill=>{
    pill.addEventListener('click', ()=>{
      document.querySelectorAll('.spec-pill').forEach(p=>p.classList.remove('active'));
      pill.classList.add('active');
      const spec = pill.dataset.spec;
      document.querySelectorAll('#doctor-grid .doctor-card').forEach(card=>{
        card.style.display = (spec==='all'||card.dataset.spec===spec) ? '' : 'none';
      });
    });
  });

  // Modal
  const modal = document.getElementById('booking-modal');
  window.openModal = function(docName){
    modal.classList.add('open');
    const cd = document.getElementById('confirm-doctor');
    if(cd) cd.textContent = docName;
    nextStep(1);
    document.getElementById('success-content').style.display='none';
    document.getElementById('confirm-content').style.display='block';
  };
  document.getElementById('modal-close').addEventListener('click', ()=>modal.classList.remove('open'));
  modal.addEventListener('click', e=>{ if(e.target===modal) modal.classList.remove('open'); });

  // Steps
  window.nextStep = function(n){
    for(let i=1;i<=3;i++){
      document.getElementById('step'+i).classList.toggle('active', i===n);
      const dot = document.getElementById('sdot'+i);
      if(dot) dot.classList.toggle('done', i<=n);
    }
  };

  // Day slots
  const daysEl = document.getElementById('day-slots');
  if(daysEl){
    const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const now = new Date();
    for(let i=0;i<7;i++){
      const d = new Date(now); d.setDate(now.getDate()+i);
      const btn=document.createElement('button');
      btn.className='day-slot'+(i===0?' selected':'');
      btn.textContent=days[d.getDay()]+' '+(d.getDate());
      btn.addEventListener('click',()=>{ document.querySelectorAll('.day-slot').forEach(s=>s.classList.remove('selected')); btn.classList.add('selected'); });
      daysEl.appendChild(btn);
    }
  }

  // Time slots
  document.querySelectorAll('.time-slot').forEach(btn=>{
    btn.addEventListener('click',()=>{ document.querySelectorAll('.time-slot').forEach(s=>s.classList.remove('selected')); btn.classList.add('selected'); });
  });

  // Confirm booking → confetti
  const confirmBtn = document.getElementById('confirm-btn');
  if(confirmBtn){
    confirmBtn.addEventListener('click', ()=>{
      document.getElementById('confirm-content').style.display='none';
      document.getElementById('success-content').style.display='block';
      launchConfetti();
    });
  }

  // Confetti
  function launchConfetti(){
    const c = document.getElementById('confetti-canvas');
    if(!c) return;
    c.style.display='block'; c.width=window.innerWidth; c.height=window.innerHeight;
    const ctx=c.getContext('2d');
    const pieces=Array.from({length:120},()=>({x:Math.random()*c.width,y:-10,vx:(Math.random()-0.5)*4,vy:2+Math.random()*4,r:4+Math.random()*6,color:`hsl(${Math.random()*360},70%,60%)`,rot:Math.random()*360}));
    let frame=0;
    function draw(){
      ctx.clearRect(0,0,c.width,c.height);
      pieces.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; p.rot+=3; if(p.y>c.height){p.y=-10;p.x=Math.random()*c.width;} ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180); ctx.fillStyle=p.color; ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r); ctx.restore(); });
      frame++; if(frame<200) requestAnimationFrame(draw); else { ctx.clearRect(0,0,c.width,c.height); c.style.display='none'; }
    }
    draw();
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
      if(!wasOpen) item.classList.add('open');
    });
  });
});
