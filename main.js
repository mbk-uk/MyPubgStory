(() => {
  const S = STORY, D = document, $ = (s, r = D) => r.querySelector(s), $$ = (s, r = D) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const words = t => esc(t).split(' ').map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`).join(' ');
  const clamp = v => Math.min(1, Math.max(0, v));

  const fig = (k, c = '') => {
    const m = S.images[k];
    if (!m || (m.optional && !m.src)) return '';
    const a = esc(m.label);
    const inner = m.src
      ? `<button class="zb" aria-label="View fullscreen: ${a}"><img src="${esc(m.src)}" alt="${a}" loading="lazy" decoding="async"></button>`
      : `<div class="ph"><b>PLACEHOLDER</b><span>${a}</span><i>${esc(m.hint)}</i></div>`;
    return `<figure class="fig ${c} rv"><div class="fr">${inner}</div><figcaption>${a}${c === 'phone' ? ' · illustrative device frame' : ''}</figcaption></figure>`;
  };

  const timeline = () => `<div class="tl" role="group" aria-label="Timeline">${S.timeline.map((m, i) =>
    `<button class="${m.tone || ''}" aria-pressed="${i === 0}" data-i="${i}"><b>${esc(m.y)}</b></button>`).join('')}</div>
    <p class="tlt" id="tlt" aria-live="polite">${esc(S.timeline[0].t)}</p>`;

  const H = S.hero, F = S.final;
  let h = `<section class="hero" id="top"><div class="bg" data-par=".3"></div><div class="fog"></div><div class="fog f2"></div>
    <div class="wrap"><p class="lb rv">${esc(H.label)}</p><h1>${words(H.title)}</h1><p class="sub rv">${esc(H.sub)}</p><p class="tag rv">${esc(H.tag)}</p></div>
    <a class="scr" href="#${S.chapters[0].id}" aria-label="Scroll to the story"><i></i></a></section>`;

  h += S.chapters.map(c => {
    const figs = (c.figs || []).map((k, i) => fig(k, c.t === 'crt' ? 'crt' : (c.t === 'phone' && !i ? 'phone' : ''))).join('');
    const facts = c.facts ? `<dl class="facts">${c.facts.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>` : '';
    return `<section class="ch t-${c.t || 'x'}" id="${c.id}" aria-labelledby="h-${c.id}"><div class="bgl" data-par=".12"></div>
      <div class="wrap"><p class="kick rv"><b>${c.n}</b>${esc(c.k)}</p>
      ${c.big ? `<div class="big rv" data-n="${c.big}" aria-hidden="true">${c.big}</div>` : ''}
      <h2 id="h-${c.id}">${words(c.h)}</h2>
      <div class="cols"><div class="tx rv">${c.p.map(x => `<p>${esc(x)}</p>`).join('')}${c.timeline ? timeline() : ''}${facts}</div>
      <div class="md">${figs}${c.quote ? `<blockquote class="rv">${esc(c.quote)}</blockquote>` : ''}</div></div></div></section>`;
  }).join('');

  h += `<section class="fin" id="end" aria-labelledby="h-end"><div class="sky"></div><div class="sun"></div><div class="ridge r1"></div><div class="ridge r2"></div><div class="veil"></div>
    <div class="wrap"><h2 id="h-end">${words(F.h)}</h2>${F.p.map(x => `<p class="rv">${esc(x)}</p>`).join('')}<p class="yrs rv">${esc(F.years)}</p><p class="jc rv">${esc(F.end)}</p></div></section>`;

  $('#story').innerHTML = h;
  D.title = S.site.title;
  $('#nv').innerHTML = S.chapters.map(c => `<a href="#${c.id}"><small>${c.n}</small>${esc(c.k)}</a>`).join('') + `<a href="#end"><small>08</small>The final message</a>`;

  /* menu */
  const nav = $('#nv'), mb = $('#mb');
  const toggle = o => { nav.classList.toggle('o', o); mb.setAttribute('aria-expanded', o); mb.textContent = o ? 'CLOSE' : 'MENU'; };
  mb.onclick = () => toggle(!nav.classList.contains('o'));
  nav.onclick = e => e.target.closest('a') && toggle(false);
  addEventListener('keydown', e => e.key === 'Escape' && toggle(false));

  /* timeline + lightbox */
  D.addEventListener('click', e => {
    const b = e.target.closest('.tl button');
    if (b) {
      $$('.tl button').forEach(x => x.setAttribute('aria-pressed', x === b));
      $('#tlt').textContent = S.timeline[b.dataset.i].t;
      return;
    }
    const z = e.target.closest('.zb');
    if (z) { const i = z.firstElementChild; $('#lb img').src = i.src; $('#lb img').alt = i.alt; $('#lb').showModal(); }
  });
  $('#lb').onclick = () => $('#lb').close();

  /* scroll: progress, parallax, sunrise, final fade-out */
  const pb = $('#pb'), fin = $('.fin'), par = $$('[data-par]');
  let tk = 0;
  const upd = () => {
    tk = 0;
    const y = scrollY, h = D.documentElement.scrollHeight - innerHeight, p = h > 0 ? y / h : 0;
    pb.style.transform = `scaleX(${p})`;
    if (!RM) par.forEach(e => {
      const r = e.parentElement.getBoundingClientRect();
      if (r.bottom > -300 && r.top < innerHeight + 300) e.style.transform = `translate3d(0,${(-r.top * e.dataset.par).toFixed(1)}px,0)`;
    });
    fin.style.setProperty('--r', RM ? 1 : clamp(1 - fin.getBoundingClientRect().top / innerHeight).toFixed(3));
    fin.style.setProperty('--fade', clamp((p - .94) / .06).toFixed(3));
  };
  addEventListener('scroll', () => tk || (tk = requestAnimationFrame(upd)), { passive: true });
  addEventListener('resize', upd);

  /* animated timestamp */
  const count = e => {
    if (RM) return;
    const n = +e.dataset.n, t0 = performance.now();
    (function f(t) { const k = Math.min((t - t0) / 1400, 1); e.textContent = Math.round(n - (1 - k) ** 3 * 40); if (k < 1) requestAnimationFrame(f); })(t0);
  };

  /* reveal on scroll, started after the loading transition */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.dataset.n) count(e.target);
    io.unobserve(e.target);
  }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });
  let rd = 0;
  const ready = () => {
    if (rd) return;
    rd = 1;
    D.documentElement.classList.add('ready');
    $$('.rv,h1,h2').forEach(e => io.observe(e));
    upd();
  };
  addEventListener('load', () => setTimeout(ready, RM ? 0 : 800));
  setTimeout(ready, 3500);
  upd();
})();
