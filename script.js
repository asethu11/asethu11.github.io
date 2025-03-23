// Simulate typing effect
const words = ["hey ", "bonjour ", "வணக்கம் ", "hola ", "こんにちは "];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    let target = document.getElementById('word');

    target.innerHTML = ""; // Clear previous word
    let loopTyping = function() {
        if (word.length > 0) {
            target.innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 1000);
            return;
        }
        timer = setTimeout(loopTyping, 200);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    let target = document.getElementById('word');

    let loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            target.innerHTML = word.join("");
        } else {
            i = (i + 1) % words.length; // Loop through words array
            setTimeout(typingEffect, 500);
            return;
        }
        timer = setTimeout(loopDeleting, 100);
    };
    loopDeleting();
}

