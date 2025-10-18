// Shared JavaScript functionality for portfolio

// Project preview hover functionality
function initProjectPreviews() {
    const projectRows = document.querySelectorAll('.project-row');
    const previews = document.querySelectorAll('.project-preview');

    // Function to hide all previews
    const hideAllPreviews = () => {
        previews.forEach(preview => {
            preview.style.opacity = '0';
            preview.style.visibility = 'hidden';
        });
    };

    projectRows.forEach((row, index) => {
        row.addEventListener('mouseenter', () => {
            hideAllPreviews();
            
            // Show the corresponding preview
            if (previews[index]) {
                previews[index].style.opacity = '1';
                previews[index].style.visibility = 'visible';
            }
        });

        row.addEventListener('mouseleave', () => {
            hideAllPreviews();
        });
    });
}

// Email copy functionality
function copyEmail() {
    const email = "mailsofabshk@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy:", err);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProjectPreviews();
});
