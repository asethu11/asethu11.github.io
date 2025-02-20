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

var typed = new Typed('.typed', {
    strings: [
      'Hallo', 
      'Bonjour',
      'Guten tag',
      'Bom dia'
    ],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 3000,
    loop: true,
  });