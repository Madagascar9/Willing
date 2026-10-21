const $ = id => document.getElementById(id);
const slides = [...document.querySelectorAll('.slide')];
let current = 0, trace = [], shown = 0, capacity = 3;
function go(n) {
  current = Math.max(0, Math.min(slides.length - 1, n));
  slides.forEach((slide, i) => slide.hidden = i !== current);
  $('counter').textContent = `${String(current + 1).padStart(2, '0')} / ${slides.length}`;
  $('progress').style.width = `${(current + 1) / slides.length * 100}%`;
  $('previous').disabled = current === 0;
  $('next').disabled = current === slides.length - 1;
}
$('previous').onclick = () => go(current - 1);
$('next').onclick = $('begin').onclick = () => go(current + 1);
$('return-lab').onclick = () => go(slides.indexOf($('lab')));
document.addEventListener('keydown', e => {
  if (e.target.closest('input,select,textarea,button,summary,a') || e.ctrlKey || e.metaKey || e.altKey) return;
  if (['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) e.preventDefault();
  if (e.key === 'ArrowRight') go(current + 1);
  if (e.key === 'ArrowLeft') go(current - 1);
  if (e.key === 'Home') go(0);
  if (e.key === 'End') go(slides.length - 1);
});
function render() {
  const visible = trace.slice(0, shown), faults = visible.at(-1)?.faults || 0;
  $('stats').textContent = `References: ${shown}/${trace.length} · Faults: ${faults} · Hits: ${shown - faults} · Fault rate: ${shown ? (faults / shown * 100).toFixed(1) : '0.0'}%`;
  $('trace-head').innerHTML = '<tr>' + ['Step','Page', ...Array.from({length:capacity},(_,i)=>`Frame ${i+1}`),'Result','Evicted'].map(x=>`<th scope="col">${x}</th>`).join('') + '</tr>';
  $('trace').innerHTML = visible.map((row,i)=>`<tr><td>${i+1}</td><td>${row.page}</td>${Array.from({length:capacity},(_,j)=>`<td>${row.frames[j] ?? '—'}</td>`).join('')}<td class="${row.hit?'hit':'fault'}">${row.hit?'Hit':'Fault'}</td><td>${row.evicted ?? '—'}</td></tr>`).join('');
  const last = visible.at(-1);
  $('decision').textContent = !last ? 'Ready. Reveal the first reference.' : last.hit ? `Page ${last.page} is already resident: hit.` : `Page ${last.page} is not resident: fault. ${last.evicted === null ? 'Loaded into an empty frame.' : `Evicted page ${last.evicted}.`}`;
  if (last?.bits) $('decision').textContent += ` Reference bits by frame: ${last.bits.join(', ')}. Next clock-hand position: Frame ${last.hand}.`;
  $('step').disabled = $('all').disabled = shown === trace.length;
}
function load(event) {
  event?.preventDefault();
  const raw = $('pages').value.trim();
  const parts = raw.split(/[\s,]+/);
  const pages = parts.map(Number);
  const frames = Number($('frames').value);
  if (!raw || !parts.every(x=>/^\d+$/.test(x)) || pages.some(x=>!Number.isSafeInteger(x)) || pages.length > 100 || !Number.isInteger(frames) || frames < 1 || frames > 10) {
    $('error').textContent = 'Use 1–100 nonnegative integer pages, separated by commas or spaces, and 1–10 frames.';
    return;
  }
  $('error').textContent = '';
  capacity = frames;
  trace = simulate(pages, capacity, $('algorithm').value);
  shown = 0;
  $('comparison').textContent = 'Full-string fault totals: ' + ['FIFO','LRU','OPT','CLOCK'].map(a=>`${a}: ${simulate(pages,capacity,a).at(-1).faults}`).join(' · ');
  render();
}
$('sim-form').onsubmit = load;
$('step').onclick = () => { shown = Math.min(shown + 1, trace.length); render(); };
$('all').onclick = () => { shown = trace.length; render(); };
$('reset').onclick = () => { shown = 0; render(); };
$('anomaly').onclick = () => { $('pages').value = '1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5'; $('frames').value = 3; $('algorithm').value = 'FIFO'; load(); go(slides.indexOf($('lab'))); };
load(); go(0);

// Exercise answers are hidden in the HTML, before JavaScript runs.
document.querySelectorAll('[data-exercise]').forEach(exercise => {
  const rows = [...exercise.querySelectorAll('tbody tr')];
  let revealed = 0;
  function update() {
    rows.forEach((row, index) => {
      row.querySelectorAll('.answer').forEach(answer => answer.hidden = index >= revealed);
      row.querySelectorAll('.answer-placeholder').forEach(placeholder => placeholder.hidden = index < revealed);
    });
    exercise.querySelector('.exercise-summary').hidden = revealed !== rows.length;
    exercise.querySelector('.reveal-status').textContent = revealed === 0 ? 'No answers revealed.' : `${revealed} of ${rows.length} rows revealed.`;
    exercise.querySelector('[data-reveal="next"]').disabled = revealed === rows.length;
    exercise.querySelector('[data-reveal="all"]').disabled = revealed === rows.length;
  }
  exercise.querySelector('[data-reveal="next"]').onclick = () => { revealed = Math.min(revealed + 1, rows.length); update(); };
  exercise.querySelector('[data-reveal="all"]').onclick = () => { revealed = rows.length; update(); };
  exercise.querySelector('[data-reveal="reset"]').onclick = () => { revealed = 0; update(); };
  update();
});
