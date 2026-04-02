/* NUTRITION PAGE JS */
document.addEventListener('DOMContentLoaded', function(){
  // Food wheel click
  document.querySelectorAll('#food-wheel .segment').forEach(seg=>{
    seg.addEventListener('click', ()=>{
      document.querySelectorAll('#food-wheel .segment').forEach(s=>s.setAttribute('opacity','0.85'));
      seg.setAttribute('opacity','1');
      document.getElementById('food-info').textContent = seg.dataset.info;
      // Stop animation briefly
      const wheel = document.getElementById('food-wheel');
      wheel.style.animationPlayState='paused';
      setTimeout(()=>wheel.style.animationPlayState='running',2000);
    });
  });

  // Water tracker
  const today = new Date().toDateString();
  const waterKey = 'aura-water-'+today;
  let glasses = +localStorage.getItem(waterKey)||0;
  function renderGlasses(){
    const grid = document.getElementById('glass-grid');
    if(!grid) return;
    grid.innerHTML='';
    for(let i=0;i<8;i++){
      const g=document.createElement('span');
      g.style.cssText='font-size:1.6rem;opacity:'+(i<glasses?'1':'0.25');
      g.textContent='🥤'; grid.appendChild(g);
    }
    const fill = document.getElementById('water-fill');
    if(fill) fill.style.height = (glasses/8*100)+'%';
    const cnt = document.getElementById('water-count');
    if(cnt) cnt.textContent = glasses+' / 8 glasses';
  }
  renderGlasses();
  document.getElementById('water-add').addEventListener('click',()=>{ if(glasses<8){ glasses++; localStorage.setItem(waterKey,glasses); renderGlasses(); } });
  document.getElementById('water-reset').addEventListener('click',()=>{ glasses=0; localStorage.setItem(waterKey,0); renderGlasses(); });

  // Macro calculator
  window.calcMacros = function(){
    const g=document.getElementById('mc-gender').value;
    const a=+document.getElementById('mc-age').value;
    const w=+document.getElementById('mc-weight').value;
    const h=+document.getElementById('mc-height').value;
    const act=+document.getElementById('mc-activity').value;
    let bmr = g==='m' ? 10*w+6.25*h-5*a+5 : 10*w+6.25*h-5*a-161;
    const tdee = Math.round(bmr*act);
    const protein = Math.round(w*2);
    const fats = Math.round(tdee*0.25/9);
    const carbs = Math.round((tdee - protein*4 - fats*9)/4);
    document.getElementById('macro-result').style.display='block';
    document.getElementById('tdee-display').innerHTML=`Daily Calories: <span style="color:var(--c-accent)">${tdee} kcal</span>`;
    document.getElementById('label-protein').textContent=`Protein: ${protein}g`;
    document.getElementById('label-carbs').textContent=`Carbs: ${carbs}g`;
    document.getElementById('label-fats').textContent=`Fats: ${fats}g`;
    // Animate rings (circumference ~251)
    const maxG = Math.max(protein,carbs,fats);
    [[document.getElementById('ring-protein'),protein],[document.getElementById('ring-carbs'),carbs],[document.getElementById('ring-fats'),fats]]
      .forEach(([r,v])=>{ if(r) setTimeout(()=>r.style.strokeDashoffset = 251*(1-v/maxG), 100); });
  };

  // Recipe hearts
  const favs = JSON.parse(localStorage.getItem('aura-recipe-favorites')||'[]');
  document.querySelectorAll('.recipe-heart').forEach(btn=>{
    const id=btn.dataset.id;
    if(favs.includes(id)) btn.classList.add('liked');
    btn.addEventListener('click', e=>{
      e.stopPropagation();
      btn.classList.toggle('liked');
      const f=JSON.parse(localStorage.getItem('aura-recipe-favorites')||'[]');
      const idx=f.indexOf(id);
      if(idx>=0) f.splice(idx,1); else f.push(id);
      localStorage.setItem('aura-recipe-favorites',JSON.stringify(f));
    });
  });
});
