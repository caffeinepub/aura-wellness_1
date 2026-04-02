/* BLOG PAGE JS */
document.addEventListener('DOMContentLoaded', function(){
  // Underline draw animation
  const accent = document.getElementById('blog-headline-accent');
  if(accent) setTimeout(()=>accent.classList.add('drawn'), 300);

  // Category filter
  const pills = document.querySelectorAll('.cat-pill');
  const cards = document.querySelectorAll('#blog-grid .blog-card');
  let activeCat = 'all';

  pills.forEach(pill=>{
    pill.addEventListener('click', ()=>{
      pills.forEach(p=>{ p.classList.remove('active'); p.setAttribute('aria-selected','false'); });
      pill.classList.add('active'); pill.setAttribute('aria-selected','true');
      activeCat = pill.dataset.cat;
      filterCards();
    });
  });

  const search = document.getElementById('blog-search');
  search && search.addEventListener('input', filterCards);

  function filterCards(){
    const q = (search ? search.value.toLowerCase() : '');
    let visible=0;
    cards.forEach(card=>{
      const cat = card.dataset.cat;
      const title = card.querySelector('h3').textContent.toLowerCase();
      const matchCat = activeCat==='all' || cat===activeCat;
      const matchSearch = !q || title.includes(q);
      const show = matchCat && matchSearch;
      card.style.display = show ? '' : 'none';
      if(show) visible++;
    });
    const noRes = document.getElementById('no-results');
    if(noRes) noRes.style.display = visible===0 ? 'block':'none';
  }
});
