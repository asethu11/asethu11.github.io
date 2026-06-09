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

// Toast notification system
function showToast(message, type = 'success') {
    // Remove any existing toast
    const existingToast = document.querySelector('.email-toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `email-toast email-toast-${type}`;
    toast.innerHTML = `
        <div class="email-toast-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to body
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('email-toast-show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('email-toast-show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Email copy functionality
function copyEmail() {
    const email = "mailsofabshk@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        showToast("Email copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy:", err);
        showToast("Failed to copy email", "error");
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProjectPreviews();
    initGaAutoTagging();
});

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
