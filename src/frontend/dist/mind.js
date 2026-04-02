/* MIND PAGE JS */
document.addEventListener('DOMContentLoaded', function(){
  // --- Neural network canvas ---
  const c = document.getElementById('neural-canvas');
  if(c && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const ctx = c.getContext('2d');
    const nodes = [];
    function resize(){ c.width=window.innerWidth; c.height=window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    for(let i=0;i<60;i++) nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-0.5)*0.5,vy:(Math.random()-0.5)*0.5});
    function draw(){
      ctx.clearRect(0,0,c.width,c.height);
      nodes.forEach(n=>{ n.x+=n.vx; n.y+=n.vy; if(n.x<0||n.x>c.width)n.vx*=-1; if(n.y<0||n.y>c.height)n.vy*=-1; });
      for(let i=0;i<nodes.length;i++){
        for(let j=i+1;j<nodes.length;j++){
          const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<140){ ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.strokeStyle=`rgba(123,104,238,${(1-dist/140)*0.3})`; ctx.lineWidth=0.8; ctx.stroke(); }
        }
        ctx.beginPath(); ctx.arc(nodes[i].x,nodes[i].y,2.5,0,Math.PI*2);
        ctx.fillStyle='rgba(123,104,238,0.6)'; ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // --- Stress meter ---
  const range = document.getElementById('stress-range');
  const label = document.getElementById('stress-label');
  if(range && label){
    function updateStress(){
      const v = +range.value;
      let txt, color;
      if(v<34){ txt='Low Stress'; color='#2ECC71'; }
      else if(v<67){ txt='Moderate Stress'; color='#F39C12'; }
      else { txt='High Stress'; color='#E74C3C'; }
      label.textContent = `${txt} (${v})`;
      label.style.color = color;
      range.style.background = `linear-gradient(to right, ${color} ${v}%, rgba(255,255,255,0.1) ${v}%)`;
    }
    updateStress();
    range.addEventListener('input', updateStress);
  }

  // --- Flip cards ---
  document.querySelectorAll('.flip-card').forEach(card=>{
    const toggle = ()=> card.classList.toggle('flipped');
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e=>{ if(e.key===' '||e.key==='Enter') toggle(); });
  });

  // --- Breathing widget 4-7-8 ---
  const btn = document.getElementById('breath-btn');
  const phase = document.getElementById('breath-phase');
  const ring = document.getElementById('breath-ring');
  let breathTimer = null, running = false;
  if(btn && ring){
    btn.addEventListener('click', ()=>{
      if(running){ clearTimeout(breathTimer); running=false; btn.textContent='Start'; phase.textContent='Press Start'; ring.setAttribute('r','50'); ring.style.transition=''; return; }
      running = true; btn.textContent = 'Stop';
      const steps = [{label:'Inhale...',r:72,dur:4000},{label:'Hold...',r:72,dur:7000},{label:'Exhale...',r:38,dur:8000}];
      let i=0;
      function doStep(){
        if(!running) return;
        const s=steps[i%steps.length];
        phase.textContent = s.label;
        ring.style.transition = `r ${s.dur}ms ease, fill ${s.dur}ms ease`;
        ring.setAttribute('r', s.r);
        i++; breathTimer = setTimeout(doStep, s.dur);
      }
      doStep();
    });
  }

  // --- Quote carousel ---
  const items = document.querySelectorAll('.quote-item');
  const dotsEl = document.getElementById('quote-dots');
  if(items.length && dotsEl){
    let cur = 0;
    items.forEach((_,i)=>{ const d=document.createElement('button'); d.className='quote-dot'+(i===0?' active':''); d.setAttribute('aria-label','Quote '+(i+1)); d.addEventListener('click',()=>showQuote(i)); dotsEl.appendChild(d); });
    function showQuote(idx){
      items[cur].classList.remove('active'); items[idx].classList.add('active');
      dotsEl.querySelectorAll('.quote-dot')[cur].classList.remove('active');
      dotsEl.querySelectorAll('.quote-dot')[idx].classList.add('active');
      cur=idx;
    }
    setInterval(()=>showQuote((cur+1)%items.length), 4000);
  }
});
