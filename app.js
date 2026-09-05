const motionButton = document.querySelector('#motion-toggle');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const artwork = document.querySelector('.hero-art');
const artworkStage = document.querySelector('.image-stage');
let settleTimer;
let pose = 0;
function setLook(x, y) {
  artwork.style.setProperty('--look-x', x);
  artwork.style.setProperty('--look-y', y);
}
function resetLook() {
  clearTimeout(settleTimer);
  setLook(0, 0);
}
let paused = motionPreference.matches;
function syncMotion() {
  if (paused) resetLook();
  artworkStage.setAttribute('aria-disabled', String(paused));
  document.body.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = motionPreference.matches ? 'Motion reduced' : paused ? '▶ Play motion' : 'Ⅱ Pause motion';
  motionButton.disabled = motionPreference.matches;
}
motionButton.addEventListener('click', () => { paused = !paused; syncMotion(); });
motionPreference.addEventListener('change', () => { paused = motionPreference.matches; syncMotion(); });
syncMotion();
artworkStage.addEventListener('pointermove', event => {
  if (paused || event.pointerType === 'touch') return;
  const rect = artworkStage.getBoundingClientRect();
  const clamp = value => Math.max(-1, Math.min(1, value));
  setLook(clamp((event.clientX - rect.left) / rect.width * 2 - 1), clamp((event.clientY - rect.top) / rect.height * 2 - 1));
});
artworkStage.addEventListener('pointerleave', resetLook);
artworkStage.addEventListener('pointercancel', resetLook);
artworkStage.addEventListener('blur', resetLook);
function playArtwork() {
  if (paused) return;
  clearTimeout(settleTimer);
  const poses = [[1, -.8], [-1, .6], [.7, 1], [-.7, -1]];
  setLook(...poses[pose++ % poses.length]);
  settleTimer = setTimeout(resetLook, 1100);
}
artworkStage.addEventListener('click', playArtwork);
artworkStage.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    playArtwork();
  }
});
const objectsDialog = document.querySelector('#objects-dialog');
const customDialog = document.querySelector('#custom-dialog');
document.querySelector('#objects-open').addEventListener('click', () => objectsDialog.showModal());
document.querySelector('#custom-open').addEventListener('click', () => customDialog.showModal());
document.querySelector('#switch-custom').addEventListener('click', () => { objectsDialog.close(); customDialog.showModal(); });
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
});
document.querySelector('#brief-form').addEventListener('submit', event => {
  event.preventDefault();
  const idea = document.querySelector('#idea');
  if (!idea.value.trim()) { idea.setCustomValidity('Please describe your idea.'); idea.reportValidity(); return; }
  const text = `StudioMistri — Custom print brief\n\nStarting point: ${document.querySelector('#file-status').value}\n\n${idea.value.trim()}\n\nSaved from the landing-page demo. This brief has not been sent to the studio.\n`;
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'studiomistri-print-brief.txt'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#brief-status').textContent = 'Your brief is ready to save. Nothing has been sent to the studio.';
});
document.querySelector('#idea').addEventListener('input', event => event.target.setCustomValidity(''));
