const gallery = document.querySelector('.project-gallery');
const slides = [...gallery.querySelectorAll('.project-slide')];
const dots = [...gallery.querySelectorAll('.slide-dot')];
const motionButton = document.querySelector('#motion-toggle');
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
const captions = [["Mechanical walker", "A printed mechanism, assembled into something that moves."], ["Small scale. Big character.", "A red racing model, printed down to the details."], ["Room to imagine", "Architectural models that turn floor plans into form."], ["Made to play", "An articulated dragon with a little personality in every layer."], ["Characters, off the screen", "Familiar forms brought to life in print."], ["Light, layer by layer", "A sculptural lamp with a warm glow."], ["Held up to the light", "A portrait etched into plastic, ready for a shelf or a wall."], ["Backlit and beaming", "The same idea, warmed up with amber light."], ["Detail in every curl", "A dynamic figure print, straight off the plate before paint."], ["A stag, drawn in lattice", "Antlers and body built from a single branching pattern."], ["Small prints, sharp details", "A multi-color keychain, glow-in-the-dark eyes included."], ["Ready to smash", "A glow-in-the-dark Hulk, straight from the printer."], ["A stand for the setup", "A two-tone headset and controller stand, made to be used daily."], ["Texture with a purpose", "A honeycomb shell wrapped around an everyday object."], ["Two takes on light", "A pair of lamp designs, glowing side by side in the studio."], ["Form, just for its own sake", "A sculptural print exploring shape and color."], ["Under the gantry", "A building model, caught fresh off the print bed."]];
let current = 0;
let paused = preference.matches;
let hovered = false;
let timer;
function syncPlayback() {
  clearTimeout(timer);
  const stopped = paused || preference.matches || hovered || document.hidden;
  document.body.classList.toggle('motion-paused', stopped);
  motionButton.setAttribute('aria-pressed', String(paused || preference.matches));
  motionButton.querySelector('.motion-label').textContent = preference.matches ? 'Motion reduced' : paused ? 'Play slideshow' : 'Pause slideshow';
  motionButton.disabled = preference.matches;
  if (!stopped) timer = setTimeout(() => { showSlide(current + 1); }, 6500);
}
function showSlide(index, manual = false) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => { slide.hidden = i !== current; slide.classList.toggle('is-active', i === current); });
  dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === current)));
  document.querySelector('#slide-title').textContent = captions[current][0];
  document.querySelector('#slide-description').textContent = captions[current][1];
  document.querySelector('#slide-count').textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  if (manual) {
    paused = true;
    document.querySelector('#slide-announcement').textContent = `Photo ${current + 1} of ${slides.length}: ${captions[current][0]}`;
  }
  syncPlayback();
}
document.querySelector('#slide-prev').addEventListener('click', () => showSlide(current - 1, true));
document.querySelector('#slide-next').addEventListener('click', () => showSlide(current + 1, true));
dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i, true)));
motionButton.addEventListener('click', () => { paused = !paused; syncPlayback(); });
gallery.addEventListener('mouseenter', () => { hovered = true; syncPlayback(); });
gallery.addEventListener('mouseleave', () => { hovered = false; syncPlayback(); });
gallery.addEventListener('focusin', event => { if (event.target !== motionButton) { paused = true; syncPlayback(); } });
gallery.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault(); showSlide(current + (event.key === 'ArrowLeft' ? -1 : 1), true);
  }
});
preference.addEventListener('change', () => { if (preference.matches) paused = true; resetStageTilt(); syncPlayback(); });
document.addEventListener('visibilitychange', syncPlayback);
const stage = document.querySelector('.project-stage');
function handleStageMove(event) {
  if (preference.matches) return;
  const rect = stage.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width;
  const py = (event.clientY - rect.top) / rect.height;
  const rx = (px - 0.5) * 14;
  const ry = (0.5 - py) * 10;
  stage.style.transform = `rotateX(${ry}deg) rotateY(${rx}deg)`;
  stage.style.setProperty('--mx', `${px * 100}%`);
  stage.style.setProperty('--my', `${py * 100}%`);
  stage.classList.add('is-glowing');
}
function resetStageTilt() {
  stage.style.transform = '';
  stage.classList.remove('is-glowing');
}
stage.addEventListener('mousemove', handleStageMove);
stage.addEventListener('mouseleave', resetStageTilt);
syncPlayback();
