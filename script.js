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

// Auto-detect page type and initialize
window.onload = function() {
    const isAboutPage = window.location.pathname.includes('about.html');
    typingEffect(isAboutPage ? 'about' : 'index');
    initLazySections();
};

