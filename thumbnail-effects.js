// 3D Thumbnail Hover Effects
(() => {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const cards = Array.from(document.querySelectorAll('[data-coolthumb]'));
  if (!cards.length) return;

  // Utilities
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const isDarkMode = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  
  const rafThrottle = (fn) => {
    let raf = 0;
    let lastArgs = null;
    return (...args) => {
      lastArgs = args;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          fn(...lastArgs);
        });
      }
    };
  };

  const baseShadow = () => isDarkMode()
    ? '0 20px 50px color-mix(in srgb, var(--text-primary) 45%, transparent)'
    : '0 18px 45px color-mix(in srgb, var(--text-primary) 18%, transparent)';

  const getPointerCoords = (e, rect) => ({
    px: (e.clientX - rect.left) / rect.width - 0.5,
    py: (e.clientY - rect.top) / rect.height - 0.5,
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100
  });

  const set3D = (card, rotX, rotY) => {
    card.style.transform = `translateY(-2px) perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  };

  const resetCommon = (card, img) => {
    card.style.transform = 'translateZ(0)';
    card.style.boxShadow = '';
    img.style.transform = '';
    img.style.filter = '';
  };

  const isTouch = (e) => e.pointerType === 'touch';

  const createGlareSetter = (glare, chromaEl = null) => (xPct, yPct) => {
    glare.style.background = `radial-gradient(260px 180px at ${xPct}% ${yPct}%, rgba(255,255,255,0.30), rgba(255,255,255,0.10) 35%, transparent 60%)`;
    if (chromaEl) {
      chromaEl.style.background = `radial-gradient(240px 160px at ${xPct}% ${yPct}%, rgba(0,160,255,0.18), transparent 60%), radial-gradient(240px 160px at ${xPct}% ${yPct}%, rgba(255,0,120,0.14), transparent 62%)`;
    }
  };

  const applyTilt = (card, img, e, config = {}) => {
    const { maxRotX = 8, maxRotY = 10, invertX = true } = config;
    const r = card.getBoundingClientRect();
    const { px, py } = getPointerCoords(e, r);
    const rotY = clamp(px * maxRotY, -maxRotX, maxRotX);
    const rotX = clamp((invertX ? -py : py) * maxRotX, -maxRotX + 2, maxRotX - 2);
    set3D(card, rotX, rotY);
    return { px, py, r };
  };

  cards.forEach((card) => {
    const img = card.querySelector('img.project-image');
    if (!img) return;

    const kind = card.getAttribute('data-coolthumb');

    // Simplified handlers for similar effects
    if (kind === 'tilt-sweep') {
      const glass = card.querySelector('[data-coolthumb-glass]');
      if (!glass) return;

      const reset = () => {
        resetCommon(card, img);
        Object.assign(glass.style, { opacity: '0', transform: 'translateX(-60%) rotate(8deg)' });
      };
      reset();

      card.addEventListener('pointerenter', (e) => {
        if (isTouch(e)) return;
        Object.assign(glass.style, { opacity: '1', transform: 'translateX(60%) rotate(8deg)' });
        if (!reduceMotion) img.style.transform = 'scale(1.02)';
      });
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointermove', (e) => {
        if (reduceMotion || isTouch(e)) return;
        applyTilt(card, img, e);
      });
      return;
    }

    if (kind === 'tilt-glare') {
      const glare = card.querySelector('[data-coolthumb-glare]');
      const rim = card.querySelector('[data-coolthumb-rim]');
      if (!glare || !rim) return;

      const setGlare = createGlareSetter(glare);
      const reset = () => {
        resetCommon(card, img);
        glare.style.opacity = '0';
        rim.style.opacity = '0';
        setGlare(50, 40);
      };
      reset();

      card.addEventListener('pointerenter', (e) => {
        if (isTouch(e)) return;
        rim.style.opacity = '1';
        glare.style.opacity = '1';
        if (!reduceMotion) img.style.transform = 'scale(1.02)';
      });
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointermove', rafThrottle((e) => {
        if (reduceMotion || isTouch(e)) return;
        const { px, py, r } = applyTilt(card, img, e);
        const { x, y } = getPointerCoords(e, r);
        setGlare(x.toFixed(1), y.toFixed(1));
      }));
      return;
    }

    if (kind === 'tilt-shadow') {
      const occ = card.querySelector('[data-coolthumb-occlusion]');
      if (!occ) return;

      const reset = () => {
        resetCommon(card, img);
        occ.style.opacity = '0';
      };
      reset();

      card.addEventListener('pointerenter', (e) => {
        if (isTouch(e)) return;
        occ.style.opacity = '1';
        card.style.boxShadow = baseShadow();
        if (!reduceMotion) img.style.transform = 'scale(1.02)';
      });
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointermove', rafThrottle((e) => {
        if (reduceMotion || isTouch(e)) return;
        const { px, py } = applyTilt(card, img, e);
        const shadowX = clamp(px * 18, -14, 14);
        const shadowY = clamp(py * 22, -18, 18);
        const alpha = isDarkMode() ? 55 : 20;
        card.style.boxShadow = `${shadowX.toFixed(1)}px ${Math.abs(shadowY).toFixed(1)}px 55px color-mix(in srgb, var(--text-primary) ${alpha}%, transparent)`;
        occ.style.background = `radial-gradient(130% 110% at ${(50 + px * 18).toFixed(1)}% ${(20 + py * 14).toFixed(1)}%, transparent 55%, rgba(0,0,0,0.16) 100%)`;
      }));
      return;
    }

    if (kind === 'tilt-stack') {
      const frame = card.querySelector('[data-coolthumb-frame]');
      const badge = card.querySelector('[data-coolthumb-badge]');
      if (!frame || !badge) return;

      const reset = () => {
        resetCommon(card, img);
        frame.style.opacity = '0';
        Object.assign(badge.style, { opacity: '0', transform: 'translateY(6px)' });
      };
      reset();

      card.addEventListener('pointerenter', (e) => {
        if (isTouch(e)) return;
        frame.style.opacity = '1';
        Object.assign(badge.style, { opacity: '1', transform: 'translateY(0px)' });
        card.style.boxShadow = baseShadow();
        if (!reduceMotion) img.style.transform = 'scale(1.02) translateZ(0)';
      });
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointermove', rafThrottle((e) => {
        if (reduceMotion || isTouch(e)) return;
        const { px, py } = applyTilt(card, img, e);
        const driftX = clamp(-px * 10, -8, 8);
        const driftY = clamp(-py * 10, -8, 8);
        img.style.transform = `scale(1.03) translate(${driftX.toFixed(1)}px, ${driftY.toFixed(1)}px)`;
        const bX = clamp(px * 6, -5, 5);
        const bY = clamp(py * 6, -5, 5);
        badge.style.transform = `translate(${bX.toFixed(1)}px, ${bY.toFixed(1)}px)`;
      }));
      return;
    }

    if (kind === 'tilt-spring') {
      const glare = card.querySelector('[data-coolthumb-glare]');
      if (!glare) return;

      let targetX = 0, targetY = 0, currentX = 0, currentY = 0, anim = 0, hovering = false;
      const setGlare = (xPct, yPct) => {
        glare.style.background = `radial-gradient(260px 180px at ${xPct}% ${yPct}%, rgba(255,255,255,0.34), rgba(255,255,255,0.10) 35%, transparent 60%)`;
      };
      const tick = () => {
        if (!hovering) return;
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        set3D(card, currentX, currentY);
        anim = requestAnimationFrame(tick);
      };
      const reset = () => {
        hovering = false;
        if (anim) { cancelAnimationFrame(anim); anim = 0; }
        resetCommon(card, img);
        glare.style.opacity = '0';
        setGlare(50, 40);
      };
      reset();

      card.addEventListener('pointerenter', (e) => {
        if (isTouch(e)) return;
        hovering = true;
        glare.style.opacity = '1';
        card.style.boxShadow = baseShadow();
        if (!reduceMotion) img.style.transform = 'scale(1.03) translateZ(18px)';
        if (!anim) anim = requestAnimationFrame(tick);
      });
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointermove', (e) => {
        if (reduceMotion || isTouch(e)) return;
        const r = card.getBoundingClientRect();
        const { px, py, x, y } = getPointerCoords(e, r);
        targetY = clamp(px * 12, -10, 10);
        targetX = clamp(-py * 10, -8, 8);
        setGlare(x.toFixed(1), y.toFixed(1));
      });
      return;
    }

    if (kind === 'tilt-holo') {
      const holo = card.querySelector('[data-coolthumb-holo]');
      const rim = card.querySelector('[data-coolthumb-rim]');
      if (!holo || !rim) return;

      const reset = () => {
        resetCommon(card, img);
        [holo, rim].forEach(el => el.style.opacity = '0');
        holo.style.transform = 'translateX(-20%) rotate(0deg)';
      };
      reset();

      card.addEventListener('pointerenter', (e) => {
        if (isTouch(e)) return;
        [holo, rim].forEach(el => el.style.opacity = '1');
        card.style.boxShadow = baseShadow();
        if (!reduceMotion) img.style.transform = 'scale(1.02)';
      });
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointermove', rafThrottle((e) => {
        if (reduceMotion || isTouch(e)) return;
        const { px, py } = applyTilt(card, img, e, { maxRotX: 10, maxRotY: 12 });
        const spin = (px * 28) + (py * 14);
        holo.style.transform = `translateX(${(-20 + px * 20).toFixed(1)}%) rotate(${spin.toFixed(1)}deg)`;
      }));
      return;
    }

    if (kind === 'tilt-snap') {
      const glass = card.querySelector('[data-coolthumb-glass]');
      if (!glass) return;

      const snap = (v, step) => Math.round(v / step) * step;
      const reset = () => {
        resetCommon(card, img);
        Object.assign(glass.style, { opacity: '0', transform: 'translateX(-70%) rotate(10deg)' });
      };
      reset();

      card.addEventListener('pointerenter', (e) => {
        if (isTouch(e)) return;
        Object.assign(glass.style, { opacity: '1', transform: 'translateX(70%) rotate(10deg)' });
        card.style.boxShadow = baseShadow();
        if (!reduceMotion) img.style.transform = 'scale(1.03)';
      });
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointermove', rafThrottle((e) => {
        if (reduceMotion || isTouch(e)) return;
        const r = card.getBoundingClientRect();
        const { px, py } = getPointerCoords(e, r);
        const rotY = snap(clamp(px * 12, -10, 10), 2);
        const rotX = snap(clamp(-py * 10, -8, 8), 2);
        set3D(card, rotX, rotY);
      }));
      return;
    }

    if (kind === 'tilt-hyper') {
      const vignette = card.querySelector('[data-coolthumb-vignette]');
      const grain = card.querySelector('[data-coolthumb-grain]');
      if (!vignette || !grain) return;

      const reset = () => {
        resetCommon(card, img);
        vignette.style.opacity = '0';
        grain.style.opacity = '0';
      };
      reset();

      card.addEventListener('pointerenter', (e) => {
        if (isTouch(e)) return;
        vignette.style.opacity = '1';
        grain.style.opacity = '0.65';
        card.style.boxShadow = baseShadow();
      });
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointermove', rafThrottle((e) => {
        if (reduceMotion || isTouch(e)) return;
        const { px, py } = applyTilt(card, img, e, { maxRotX: 10, maxRotY: 14, invertX: true });
        const driftX = clamp(-px * 16, -14, 14);
        const driftY = clamp(-py * 16, -14, 14);
        img.style.transform = `scale(1.06) translate(${driftX.toFixed(1)}px, ${driftY.toFixed(1)}px)`;
        img.style.filter = 'saturate(1.08) contrast(1.05)';
        vignette.style.background = `radial-gradient(120% 120% at ${(50 + px * 18).toFixed(1)}% ${(30 + py * 16).toFixed(1)}%, transparent 55%, rgba(0,0,0,0.24) 100%)`;
      }));
      return;
    }

    if (kind === 'tilt-orbit') {
      const orbit = card.querySelector('[data-coolthumb-orbit]');
      const dot = card.querySelector('[data-coolthumb-orbit-dot]');
      if (!orbit || !dot) return;

      let t = 0, anim = 0, hovering = false;
      const tick = () => {
        if (!hovering) return;
        t += 0.028;
        const radius = 34;
        dot.style.transform = `translate(calc(-50% + ${(Math.cos(t) * radius).toFixed(1)}px), ${(Math.sin(t) * radius).toFixed(1)}px)`;
        anim = requestAnimationFrame(tick);
      };
      const reset = () => {
        hovering = false;
        if (anim) { cancelAnimationFrame(anim); anim = 0; }
        resetCommon(card, img);
        orbit.style.opacity = '0';
        dot.style.transform = 'translate(-50%, 0px)';
      };
      reset();

      card.addEventListener('pointerenter', (e) => {
        if (isTouch(e)) return;
        orbit.style.opacity = '1';
        hovering = true;
        card.style.boxShadow = baseShadow();
        if (!reduceMotion) img.style.transform = 'scale(1.02)';
        if (!anim) anim = requestAnimationFrame(tick);
      });
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointermove', rafThrottle((e) => {
        if (reduceMotion || isTouch(e)) return;
        applyTilt(card, img, e);
      }));
      return;
    }

    if (kind === 'tilt-glare-chroma') {
      const glare = card.querySelector('[data-coolthumb-glare]');
      const rim = card.querySelector('[data-coolthumb-rim]');
      const chroma = card.querySelector('[data-coolthumb-chroma]');
      if (!glare || !rim || !chroma) return;

      const setGlare = createGlareSetter(glare, chroma);
      const reset = () => {
        resetCommon(card, img);
        [glare, rim, chroma].forEach(el => el.style.opacity = '0');
        setGlare(50, 40);
      };
      reset();

      card.addEventListener('pointerenter', (e) => {
        if (isTouch(e)) return;
        [rim, glare, chroma].forEach(el => el.style.opacity = '1');
        card.style.boxShadow = baseShadow();
        if (!reduceMotion) img.style.transform = 'scale(1.02)';
      });
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointermove', rafThrottle((e) => {
        if (reduceMotion || isTouch(e)) return;
        const { r } = applyTilt(card, img, e);
        const { x, y } = getPointerCoords(e, r);
        setGlare(x.toFixed(1), y.toFixed(1));
      }));
      return;
    }

    if (kind === 'tilt-stack-glare-chroma') {
      const badge = card.querySelector('[data-coolthumb-badge]');
      const glare = card.querySelector('[data-coolthumb-glare]');
      const chroma = card.querySelector('[data-coolthumb-chroma]');
      if (!badge || !glare || !chroma) return;

      // Project-specific configuration
      const link = card.closest('.headerproject')?.querySelector('a');
      const projectColors = {
        'improving-adoption': { bg: 'rgba(244, 216, 216, 0.5)', swapImage: true },
        'LSR': { bg: 'rgba(216, 239, 244, 0.5)', swapImage: true, hoverExt: '.gif' },
        'nextgen': { bg: 'rgba(223, 244, 216, 0.5)', swapImage: true, hoverExt: '.mp4', useVideo: true },
        'usertesting-mesa': { bg: 'rgba(216, 220, 244, 0.5)' }
      };
      
      const project = Object.keys(projectColors).find(key => link?.href.includes(key));
      const config = projectColors[project] || { bg: 'rgba(216, 239, 244, 0.5)' };
      const originalSrc = img.src;
      const explicitHoverSrc = card.getAttribute('data-coolthumb-hover');
      const hoverSrc = explicitHoverSrc
        ? explicitHoverSrc
        : (config.swapImage
            ? img.src.replace(/thumbnail\.(png|gif)$/, `thumbnail-hover${config.hoverExt || '.png'}`)
            : null);

      const useVideo = (config.useVideo || (hoverSrc && hoverSrc.toLowerCase().endsWith('.mp4')));
      
      // For video hover, create video element
      let videoElement = null;
      if (useVideo && hoverSrc) {
        videoElement = document.createElement('video');
        videoElement.src = hoverSrc;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.preload = 'auto';
        videoElement.setAttribute('aria-hidden', 'true');
        videoElement.tabIndex = -1;
        videoElement.style.cssText = img.style.cssText;
        videoElement.className = img.className;
        videoElement.style.pointerEvents = 'none';
        videoElement.style.opacity = '0';
        img.parentNode.insertBefore(videoElement, img.nextSibling);

        // Try to kick off autoplay early (muted autoplay should be allowed)
        videoElement.play().catch(() => {});
      }

      const setGlare = (xPct, yPct) => {
        glare.style.background = `radial-gradient(260px 180px at ${xPct}% ${yPct}%, rgba(255,255,255,0.26), rgba(255,255,255,0.08) 35%, transparent 60%)`;
        chroma.style.background = `radial-gradient(240px 160px at ${xPct}% ${yPct}%, rgba(0,160,255,0.18), transparent 60%), radial-gradient(240px 160px at ${xPct}% ${yPct}%, rgba(255,0,120,0.14), transparent 62%)`;
      };

      const reset = () => {
        resetCommon(card, img);
        card.style.border = '';
        card.style.backgroundColor = '';
        Object.assign(badge.style, { opacity: '0', transform: 'translateY(8px)' });
        [glare, chroma].forEach(el => el.style.opacity = '0');
        setGlare(50, 40);
        if (useVideo && videoElement) {
          videoElement.style.transform = '';
          videoElement.style.filter = '';
          videoElement.style.opacity = '0';
          img.style.opacity = '';
        } else if (hoverSrc) {
          img.src = originalSrc;
        }
      };
      reset();

      card.addEventListener('pointerenter', (e) => {
        if (isTouch(e)) return;
        card.style.border = '1px solid color-mix(in srgb, var(--text-primary) 20%, transparent)';
        card.style.backgroundColor = config.bg;
        Object.assign(badge.style, { opacity: '1', transform: 'translateY(0px)' });
        if (useVideo && videoElement) {
          img.style.opacity = '0';
          videoElement.style.opacity = '1';
          videoElement.play().catch(() => {});
          if (!reduceMotion) videoElement.style.transform = 'scale(1.03)';
        } else if (hoverSrc) {
          img.src = hoverSrc;
          if (!reduceMotion) img.style.transform = 'scale(1.03)';
        } else {
          if (!reduceMotion) img.style.transform = 'scale(1.03)';
        }
        [glare, chroma].forEach(el => el.style.opacity = '1');
        card.style.boxShadow = baseShadow();
      });
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointermove', rafThrottle((e) => {
        if (reduceMotion || isTouch(e)) return;
        const activeMedia = (useVideo && videoElement && parseFloat(videoElement.style.opacity || '0') > 0) ? videoElement : img;
        const { px, py, r } = applyTilt(card, activeMedia, e);
        const driftX = clamp(-px * 12, -10, 10);
        const driftY = clamp(-py * 12, -10, 10);
        activeMedia.style.transform = `scale(1.05) translate(${driftX.toFixed(1)}px, ${driftY.toFixed(1)}px)`;
        const bX = clamp(px * 7, -6, 6);
        const bY = clamp(py * 7, -6, 6);
        badge.style.transform = `translate(${bX.toFixed(1)}px, ${bY.toFixed(1)}px)`;
        const { x, y } = getPointerCoords(e, r);
        setGlare(x.toFixed(1), y.toFixed(1));
      }));
      return;
    }

    if (kind === 'tilt-glassplate') {
      const plate = card.querySelector('[data-coolthumb-plate]');
      const glare = card.querySelector('[data-coolthumb-glare]');
      if (!plate || !glare) return;

      const setGlare = (xPct, yPct) => {
        glare.style.background = `radial-gradient(300px 200px at ${xPct}% ${yPct}%, rgba(255,255,255,0.22), rgba(255,255,255,0.06) 35%, transparent 62%)`;
      };
      const reset = () => {
        resetCommon(card, img);
        [plate, glare].forEach(el => el.style.opacity = '0');
        setGlare(50, 40);
      };
      reset();

      card.addEventListener('pointerenter', (e) => {
        if (isTouch(e)) return;
        [plate, glare].forEach(el => el.style.opacity = '1');
        card.style.boxShadow = baseShadow();
        if (!reduceMotion) img.style.transform = 'scale(1.02)';
      });
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointermove', rafThrottle((e) => {
        if (reduceMotion || isTouch(e)) return;
        const r = card.getBoundingClientRect();
        const { px, py, x, y } = getPointerCoords(e, r);
        const rotY = clamp(px * 10, -8, 8);
        const rotX = clamp(-py * 8, -6, 6);
        set3D(card, rotX, rotY);
        setGlare(x.toFixed(1), y.toFixed(1));
        plate.style.transform = `rotateX(${(rotX * -0.35).toFixed(2)}deg) rotateY(${(rotY * -0.35).toFixed(2)}deg)`;
      }));
      return;
    }
  });
})();
