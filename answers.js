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
