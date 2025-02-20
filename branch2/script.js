function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Load theme preference on page load
window.onload = function() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
}

document.querySelector('a[href="#section-writings"]').addEventListener('click', function(event) {
    event.preventDefault();
    const target = document.getElementById('section-writings');
    if (target) {
        window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth"
        });
    }
});