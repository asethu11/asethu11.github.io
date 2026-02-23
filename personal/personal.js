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

function typeText(target, text, { delayMs = 250, stepMs = 55 } = {}) {
  if (!target) return;

  if (prefersReducedMotion()) {
    target.textContent = text;
    return;
  }

  target.textContent = '';
  let index = 0;

  const tick = () => {
    target.textContent = text.slice(0, index);
    index += 1;
    if (index <= text.length) {
      window.setTimeout(tick, stepMs);
    }
  };

  window.setTimeout(tick, delayMs);
}

function initHeroTyping() {
  const target = document.getElementById('heroType');
  if (!target) return;
  const text = target.getAttribute('data-text') || '';
  typeText(target, text);
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
