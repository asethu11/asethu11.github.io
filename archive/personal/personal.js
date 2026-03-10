// Page-local JS for /personal (self-contained)

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getCssVar(name, fallback = '') {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name);
  return (value || fallback).trim();
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function getOriginFromEvent(event, fallbackElement) {
  if (event && typeof event.clientX === 'number' && typeof event.clientY === 'number') {
    return {
      x: clamp01(event.clientX / window.innerWidth),
      y: clamp01(event.clientY / window.innerHeight)
    };
  }

  if (fallbackElement && fallbackElement.getBoundingClientRect) {
    const rect = fallbackElement.getBoundingClientRect();
    return {
      x: clamp01((rect.left + rect.width / 2) / window.innerWidth),
      y: clamp01((rect.top + rect.height / 2) / window.innerHeight)
    };
  }

  return { x: 0.5, y: 0.6 };
}

function setTemporaryButtonText(button, text, durationMs = 900) {
  if (!button) return;
  const original = button.textContent;
  button.textContent = text;
  window.setTimeout(() => {
    button.textContent = original;
  }, durationMs);
}

function parseWords(value) {
  if (!value) return [];
  return value
    .split('|')
    .map((word) => word.trim())
    .filter(Boolean);
}

function startTypewriterCycle(target, words, {
  initialDelayMs = 250,
  typeStepMs = 55,
  deleteStepMs = 35,
  holdAfterTypeMs = 900,
  holdAfterDeleteMs = 220
} = {}) {
  if (!target) return;
  if (!Array.isArray(words) || words.length === 0) return;

  if (prefersReducedMotion()) {
    target.textContent = words[0];
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const tick = () => {
    const currentWord = words[wordIndex] || '';

    if (!isDeleting) {
      charIndex = Math.min(charIndex + 1, currentWord.length);
      target.textContent = currentWord.slice(0, charIndex);

      if (charIndex >= currentWord.length) {
        isDeleting = true;
        window.setTimeout(tick, holdAfterTypeMs);
        return;
      }

      window.setTimeout(tick, typeStepMs);
      return;
    }

    charIndex = Math.max(charIndex - 1, 0);
    target.textContent = currentWord.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      window.setTimeout(tick, holdAfterDeleteMs);
      return;
    }

    window.setTimeout(tick, deleteStepMs);
  };

  target.textContent = '';
  window.setTimeout(tick, initialDelayMs);
}

function initHeroTyping() {
  const target = document.getElementById('heroType');
  if (!target) return;

  const words = parseWords(target.getAttribute('data-words'));
  startTypewriterCycle(target, words);
}

function throwHearts(origin) {
  if (typeof confetti !== 'function') return;

  const colors = [
    getCssVar('--red', '#db4f4f'),
    getCssVar('--text-primary', '#262628'),
    getCssVar('--primary', '#0070EA')
  ];

  let heartShape = null;
  try {
    if (typeof confetti.shapeFromText === 'function') {
      heartShape = confetti.shapeFromText({ text: '💖', scalar: 2 });
    }
  } catch (_) {
    heartShape = null;
  }

  const baseOptions = {
    origin,
    spread: 72,
    startVelocity: 34,
    gravity: 0.9,
    scalar: 1,
    ticks: 220,
    colors
  };

  confetti({
    ...baseOptions,
    particleCount: 34,
    shapes: heartShape ? [heartShape] : undefined
  });

  setTimeout(() => {
    confetti({
      ...baseOptions,
      particleCount: 16,
      spread: 95,
      startVelocity: 26,
      scalar: 0.9,
      shapes: heartShape ? [heartShape] : undefined
    });
  }, 120);
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroTyping();

  const heartsButton = document.getElementById('heartsButton');
  if (heartsButton) {
    heartsButton.addEventListener('click', (event) => {
      if (prefersReducedMotion()) {
        setTemporaryButtonText(heartsButton, '♡');
        return;
      }

      const origin = getOriginFromEvent(event, heartsButton);
      throwHearts(origin);
    });
  }
});
