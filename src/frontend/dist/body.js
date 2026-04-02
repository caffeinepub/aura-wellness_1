/* BODY PAGE JS */
document.addEventListener('DOMContentLoaded', function(){
  // Zone tooltip
  const tooltip = document.getElementById('zone-tooltip');
  document.querySelectorAll('.svgbody .zone').forEach(zone=>{
    zone.addEventListener('mouseenter', e=>{
      document.querySelectorAll('.svgbody .zone').forEach(z=>z.classList.remove('active'));
      zone.classList.add('active');
      if(tooltip){
        tooltip.textContent = zone.dataset.tip;
        tooltip.style.display='block';
        const rect = zone.getBoundingClientRect();
        const wrap = zone.closest('[style*="relative"]') || zone.closest('div');
        const wRect = wrap ? wrap.getBoundingClientRect() : {left:0,top:0};
        tooltip.style.left = (rect.right - wRect.left + 8)+'px';
        tooltip.style.top = (rect.top - wRect.top)+'px';
      }
    });
    zone.addEventListener('mouseleave', ()=>{ if(tooltip) tooltip.style.display='none'; });
    zone.addEventListener('click', ()=>{ zone.classList.toggle('active'); });
  });

  // BMI Calculator
  window.calcBMI = function(){
    const w = +document.getElementById('bmi-weight').value;
    const h = +document.getElementById('bmi-height').value / 100;
    if(!w || !h) return;
    const bmi = (w / (h*h)).toFixed(1);
    const result = document.getElementById('bmi-result');
    const ring = document.getElementById('bmi-ring');
    const val = document.getElementById('bmi-value');
    const cat = document.getElementById('bmi-category');
    result.style.display='block';
    val.textContent = bmi;
    let color, label;
    if(bmi < 18.5){ color='#3498DB'; label='Underweight'; }
    else if(bmi < 25){ color='#2ECC71'; label='Normal weight'; }
    else if(bmi < 30){ color='#F39C12'; label='Overweight'; }
    else { color='#E74C3C'; label='Obese'; }
    ring.style.stroke = color;
    val.style.color = color;
    cat.textContent = label;
    // animate ring (circumference 314, fill to % of max BMI 40)
    const pct = Math.min(bmi/40, 1);
    ring.style.strokeDashoffset = 314 * (1 - pct);
  };
});
