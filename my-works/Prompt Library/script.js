// Project-specific JavaScript functionality
// This file can be used for any custom interactions or features specific to this project

document.addEventListener('DOMContentLoaded', function() {
    // Add any project-specific initialization code here
    
    // Example: Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Example: Add loading states for images
    const images = document.querySelectorAll('.theme-img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // Example: Add click tracking for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track external link clicks if analytics is set up
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'external_link',
                    'event_label': this.href
                });
            }
        });
    });
});
