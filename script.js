// Typing effect for portfolio
// Different word arrays for different pages
const words = {
    index: ["hey ", "bonjour ", "வணக்கம் ", "hola ", "こんにちは "],
    about: ["abhishek  ", "abhi  ", "not abby ", "not abshek "]
};

let i = 0;
let timer;

function typingEffect(pageType = 'index') {
    const wordArray = words[pageType] || words.index;
    let word = wordArray[i].split("");
    let target = document.getElementById('word');

    if (!target) return; // Exit if target element doesn't exist

    target.innerHTML = ""; // Clear previous word
    let loopTyping = function() {
        if (word.length > 0) {
            target.innerHTML += word.shift();
        } else {
            setTimeout(() => deletingEffect(pageType), pageType === 'index' ? 1000 : 500);
            return;
        }
        timer = setTimeout(loopTyping, pageType === 'index' ? 200 : 100);
    };
    loopTyping();
}

function deletingEffect(pageType = 'index') {
    const wordArray = words[pageType] || words.index;
    let word = wordArray[i].split("");
    let target = document.getElementById('word');

    if (!target) return; // Exit if target element doesn't exist

    let loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            target.innerHTML = word.join("");
        } else {
            i = (i + 1) % wordArray.length; // Loop through words array
            setTimeout(() => typingEffect(pageType), 500);
            return;
        }
        timer = setTimeout(loopDeleting, 100);
    };
    loopDeleting();
}

// Lazy load sections using Intersection Observer
function initLazySections() {
    const lazySections = document.querySelectorAll('.other-projects, .section-writings, .section-keynotes');
    
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Section is now visible, ensure it's fully rendered
                    entry.target.style.contentVisibility = 'visible';
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before section enters viewport
        });

        lazySections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
}

// Initialize skeleton loaders for background images
function initSkeletonLoaders() {
    // Handle CSS background images
    const bgElements = document.querySelectorAll('.image-background[class*="bg"]');
    
    bgElements.forEach(el => {
        // Get computed background-image URL
        const style = window.getComputedStyle(el);
        const bgImage = style.backgroundImage;
        
        if (bgImage && bgImage !== 'none') {
            // Extract URL from background-image
            const urlMatch = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
            if (urlMatch && urlMatch[1]) {
                const img = new Image();
                img.onload = function() {
                    el.classList.add('bg-loaded');
                };
                img.onerror = function() {
                    // Still hide skeleton on error
                    el.classList.add('bg-loaded');
                };
                img.src = urlMatch[1];
            }
        }
    });

    // Handle already-cached images (may have loaded before JS runs)
    document.querySelectorAll('.project-image').forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
            const skeleton = img.previousElementSibling;
            if (skeleton && skeleton.classList.contains('skeleton')) {
                skeleton.style.display = 'none';
            }
        }
    });
}

// Global GA4 click tracking (auto-tags common interactive elements)
function initGaAutoTagging() {
    if (window.__gaAutoTaggingInitialized) return;
    window.__gaAutoTaggingInitialized = true;

    document.addEventListener('click', function(event) {
        const target = event.target.closest('a, button, [role="button"]');
        if (!target) return;
        if (typeof gtag !== 'function') return;

        const action = target.getAttribute('data-ga-event') || 'click';
        const category = target.getAttribute('data-ga-event-category') || (target.tagName === 'A' ? 'link' : 'button');
        const name = target.getAttribute('data-ga-event-name')
            || target.getAttribute('aria-label')
            || (target.textContent || '').trim().slice(0, 120)
            || target.getAttribute('href')
            || target.id
            || 'interaction';

        gtag('event', action, {
            event_category: category,
            event_label: name,
            value: 1
        });
    });
}

// Track user's color scheme preference in GA4
function trackColorScheme() {
    if (typeof gtag !== 'function') return;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const colorScheme = prefersDark ? 'dark' : 'light';
    
    // Set as user property for segmentation
    gtag('set', 'user_properties', {
        color_scheme: colorScheme
    });
    
    // Also send as an event for the session
    gtag('event', 'color_scheme_detected', {
        event_category: 'user_preference',
        event_label: colorScheme,
        color_scheme: colorScheme
    });
    
    // Listen for changes during the session
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const newScheme = e.matches ? 'dark' : 'light';
        gtag('set', 'user_properties', {
            color_scheme: newScheme
        });
        gtag('event', 'color_scheme_changed', {
            event_category: 'user_preference',
            event_label: newScheme,
            color_scheme: newScheme
        });
    });
}

// Auto-detect page type and initialize
window.onload = function() {
    const isAboutPage = window.location.pathname.includes('about.html');
    typingEffect(isAboutPage ? 'about' : 'index');
    initLazySections();
    initGaAutoTagging();
    initSkeletonLoaders();
    trackColorScheme();
};

