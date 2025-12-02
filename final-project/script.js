"use strict";

// Product data array - contains all 9 watch products organized by series
const products = [
    // Series A: The Retro Classics (F-91W Mods)
    {
        id: 1,
        name: "The Sunset Sherbet",
        price: 45.00,
        series: "A",
        seriesName: "The Retro Classics",
        seriesDesc: "Cheap, colorful, nostalgic",
        description: "Classic F-91W with a custom pink-to-orange gradient screen filter.",
        image: "images/sunset-sherbet.jpg"
    },
    {
        id: 2,
        name: "The Stealth Bomber",
        price: 55.00,
        series: "A",
        seriesName: "The Retro Classics",
        seriesDesc: "Cheap, colorful, nostalgic",
        description: "Negative display (black background, light numbers) and oil-filled case for extreme angles.",
        image: "images/stealth-bomber.jpg"
    },
    {
        id: 3,
        name: "The Cyber-Glitch",
        price: 60.00,
        series: "A",
        seriesName: "The Retro Classics",
        seriesDesc: "Cheap, colorful, nostalgic",
        description: "Holographic screen layer that shifts colors in sunlight.",
        image: "images/cyber-glitch.jpg"
    },
    // Series B: The "Royale" Line (AE-1200 Mods)
    {
        id: 4,
        name: "The Secret Agent",
        price: 110.00,
        series: "B",
        seriesName: "The \"Royale\" Line",
        seriesDesc: "Tactical, spy-movie vibes",
        description: "Text removed from the case, sterile steel bezel, on a black NATO strap.",
        image: "images/secret-agent.jpg"
    },
    {
        id: 5,
        name: "The Stormtrooper",
        price: 95.00,
        series: "B",
        seriesName: "The \"Royale\" Line",
        seriesDesc: "Tactical, spy-movie vibes",
        description: "Cerakote white painted case with high-contrast black buttons.",
        image: "images/stormtrooper.jpg"
    },
    {
        id: 6,
        name: "The Fallout",
        price: 85.00,
        series: "B",
        seriesName: "The \"Royale\" Line",
        seriesDesc: "Tactical, spy-movie vibes",
        description: "Amber screen filter and distressed leather strap for a wasteland look.",
        image: "images/fallout.jpg"
    },
    // Series C: The "CasiOak" Collection (G-Shock GA-2100)
    {
        id: 7,
        name: "The Royal Steel",
        price: 250.00,
        series: "C",
        seriesName: "The \"CasiOak\" Collection",
        seriesDesc: "High-end, metal modifications",
        description: "Full 316L Stainless Steel case and bracelet conversion.",
        image: "images/royal-steel.jpg"
    },
    {
        id: 8,
        name: "The Rose Gold Lux",
        price: 275.00,
        series: "C",
        seriesName: "The \"CasiOak\" Collection",
        seriesDesc: "High-end, metal modifications",
        description: "Rose gold bezel mod with a premium fluoro-rubber strap.",
        image: "images/rose-gold-lux.jpg"
    },
    {
        id: 9,
        name: "The Galaxy",
        price: 320.00,
        series: "C",
        seriesName: "The \"CasiOak\" Collection",
        seriesDesc: "High-end, metal modifications",
        description: "Hand-painted dial with splatter effect and crystal sapphire glass.",
        image: "images/galaxy.jpg"
    }
];

// Shopping cart array - stores products added by user
const cart = [];
// Tax rate: 8.5%
const taxRate = 0.085;
// Shipping cost: $10.00
const shippingCost = 10.00;

// Wait for page to fully load before running code
document.addEventListener('DOMContentLoaded', function() {
    // Set up theme toggle button (light/dark mode)
    const themeBtn = document.getElementById('theme-toggle');
    // Get saved theme from browser storage, default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    // Update button icon based on current theme
    if (savedTheme === 'dark') {
        themeBtn.textContent = '☀️';
    } else {
        themeBtn.textContent = '🌙';
    }
    
    // Handle theme toggle button click
    themeBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            // Switch to light mode
            document.documentElement.setAttribute('data-theme', 'light');
            themeBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark mode
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Display all products on the page
    showProducts();

    // Initialize cart display
    updateCart();
    
    // Handle checkout button click
    const checkoutButton = document.getElementById('checkout-btn');
    checkoutButton.addEventListener('click', function() {
        // Check if cart is empty
        if (cart.length === 0) {
            const msg = document.getElementById('checkout-message');
            msg.textContent = 'Your cart is empty. Please add items before checkout.';
            msg.className = 'checkout-message error';
            // Hide error message after 5 seconds
            setTimeout(function() {
                msg.textContent = '';
                msg.className = 'checkout-message';
            }, 5000);
            return;
        }
        
        // Calculate order totals
        let subtotal = 0;
        for (let i = 0; i < cart.length; i++) {
            subtotal += cart[i].price;
        }
        const tax = subtotal * taxRate;
        const shipping = shippingCost;
        const total = subtotal + tax + shipping;
        
        // Clear cart after checkout
        cart.length = 0;
        updateCart();
        
        // Show success message with total
        const msg = document.getElementById('checkout-message');
        msg.textContent = 'Thank you for your purchase! Total: $' + total.toFixed(2);
        msg.className = 'checkout-message success';
        // Hide success message after 5 seconds
        setTimeout(function() {
            msg.textContent = '';
            msg.className = 'checkout-message';
        }, 5000);
    });

    // Handle contact form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        // Prevent default form submission
        e.preventDefault();
        
        // Get form field values and trim whitespace
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const comments = document.getElementById('comments').value.trim();
        const contactPref = document.querySelector('input[name="contact-preference"]:checked').value;
        
        // Track if form is valid
        let valid = true;
        
        // Validate name field (required)
        if (name === '') {
            document.getElementById('name-error').textContent = 'Name is required';
            valid = false;
        } else {
            // Check name format: only letters, spaces, hyphens, and apostrophes
            const namePattern = /^[a-zA-Z\s\-']+$/;
            if (!namePattern.test(name)) {
                document.getElementById('name-error').textContent = 'Name can only contain letters, spaces, hyphens, and apostrophes';
                valid = false;
            } else {
                document.getElementById('name-error').textContent = '';
            }
        }
        
        // Validate comments field (required)
        if (comments === '') {
            document.getElementById('comments-error').textContent = 'Comments is required';
            valid = false;
        } else {
            document.getElementById('comments-error').textContent = '';
        }
        
        // Validate phone field based on contact preference
        if (contactPref === 'phone') {
            // Phone is required if phone is selected
            if (phone === '') {
                document.getElementById('phone-error').textContent = 'Phone is required when phone is selected as contact preference';
                valid = false;
            } else {
                // Check phone format: must have at least 10 digits
                const phoneDigits = phone.replace(/\D/g, '');
                if (phoneDigits.length < 10) {
                    document.getElementById('phone-error').textContent = 'Please enter a valid phone number (at least 10 digits)';
                    valid = false;
                } else {
                    document.getElementById('phone-error').textContent = '';
                }
            }
        } else if (phone !== '') {
            // If phone is provided but not required, still validate format
            const phoneDigits = phone.replace(/\D/g, '');
            if (phoneDigits.length < 10) {
                document.getElementById('phone-error').textContent = 'Please enter a valid phone number (at least 10 digits)';
                valid = false;
            } else {
                document.getElementById('phone-error').textContent = '';
            }
        }
        
        // Validate email field based on contact preference
        if (contactPref === 'email') {
            // Email is required if email is selected
            if (email === '') {
                document.getElementById('email-error').textContent = 'Email is required when email is selected as contact preference';
                valid = false;
            } else {
                // Check email format using regex
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    document.getElementById('email-error').textContent = 'Please enter a valid email address';
                    valid = false;
                } else {
                    document.getElementById('email-error').textContent = '';
                }
            }
        } else if (email !== '') {
            // If email is provided but not required, still validate format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                valid = false;
            } else {
                document.getElementById('email-error').textContent = '';
            }
        }
        
        // If all validation passes, process the form
        if (valid) {
            // Create user data object
            const userData = {
                name: name,
                phone: phone || null,
                email: email || null,
                comments: comments,
                contactPreference: contactPref
            };
            
            // Reset form fields
            form.reset();
            
            // Build success message with submitted data displayed as object
            const successElement = document.getElementById('form-success');
            successElement.innerHTML = '<strong>Form Submitted Successfully!</strong><br><br>' +
                '<div style="text-align: left; margin-top: 0.5rem;">' +
                '<strong>Submitted Information:</strong><br>' +
                '<div style="margin-left: 1rem; margin-top: 0.5rem; font-family: monospace; font-size: 0.85rem;">' +
                'Name: ' + userData.name + '<br>' +
                'Phone: ' + (userData.phone || 'N/A') + '<br>' +
                'Email: ' + (userData.email || 'N/A') + '<br>' +
                'Contact Preference: ' + userData.contactPreference + '<br><br>' +
                '<strong>Comments:</strong><br>' +
                '<div style="margin-left: 1rem; margin-top: 0.25rem; white-space: pre-wrap; word-wrap: break-word;">' + 
                userData.comments + 
                '</div>' +
                '</div></div>';
            
            // Display success message
            successElement.classList.add('show');
            // Hide success message after 10 seconds (increased to allow reading the data)
            setTimeout(function() {
                successElement.classList.remove('show');
                successElement.innerHTML = '';
            }, 10000);
            
            // Log form data to console (for debugging)
            console.log('Form submitted:', userData);
        }
    });
    
    // Clear error messages when user starts typing in fields
    document.getElementById('name').addEventListener('input', function() {
        document.getElementById('name-error').textContent = '';
    });
    document.getElementById('phone').addEventListener('input', function() {
        document.getElementById('phone-error').textContent = '';
    });
    document.getElementById('email').addEventListener('input', function() {
        document.getElementById('email-error').textContent = '';
    });
    document.getElementById('comments').addEventListener('input', function() {
        document.getElementById('comments-error').textContent = '';
    });
    
    // Function to update required indicators based on contact preference
    function updateRequiredIndicators() {
        const contactPref = document.querySelector('input[name="contact-preference"]:checked').value;
        const phoneRequired = document.getElementById('phone-required');
        const emailRequired = document.getElementById('email-required');
        
        if (contactPref === 'phone') {
            phoneRequired.textContent = '*';
            emailRequired.textContent = '';
        } else {
            phoneRequired.textContent = '';
            emailRequired.textContent = '*';
        }
    }
    
    // Update required indicators on page load (phone is checked by default)
    updateRequiredIndicators();
    
    // Clear all error messages and update required indicators when switching between email and phone
    const contactPreferenceRadios = document.querySelectorAll('input[name="contact-preference"]');
    contactPreferenceRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            // Clear all error messages
            document.getElementById('name-error').textContent = '';
            document.getElementById('phone-error').textContent = '';
            document.getElementById('email-error').textContent = '';
            document.getElementById('comments-error').textContent = '';
            // Update required indicators
            updateRequiredIndicators();
        });
    });
});

// Display all products organized by series
function showProducts() {
    // Filter products by series
    const seriesA = products.filter(function(p) { return p.series === 'A'; });
    const seriesB = products.filter(function(p) { return p.series === 'B'; });
    const seriesC = products.filter(function(p) { return p.series === 'C'; });
    
    // Display each series
    showSeries('A', seriesA);
    showSeries('B', seriesB);
    showSeries('C', seriesC);
}

// Display products for a specific series
function showSeries(series, productList) {
    // Find the grid container for this series
    const grid = document.querySelector('.products-grid[data-series="' + series + '"]');
    if (!grid) return;
    
    // Clear existing content
    grid.innerHTML = '';
    
    // Create and display each product card
    for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        
        // Create product card container
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Create product image
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.className = 'product-image';
        // Hide image if it fails to load
        img.onerror = function() {
            this.style.display = 'none';
        };
        
        // Create product name heading
        const name = document.createElement('h3');
        name.className = 'product-name';
        name.textContent = product.name;
        
        // Create product price display
        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = '$' + product.price.toFixed(2);
        
        // Create product description
        const desc = document.createElement('p');
        desc.className = 'product-description';
        desc.textContent = product.description;
        
        // Create add to cart button
        const btn = document.createElement('button');
        btn.className = 'add-to-cart-btn';
        btn.textContent = 'Add to Cart';
        btn.addEventListener('click', function() {
            addToCart(product.id);
        });
        
        // Add all elements to card
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(desc);
        card.appendChild(btn);
        
        // Add card to grid
        grid.appendChild(card);
    }
}

// Add a product to the shopping cart
function addToCart(productId) {
    // Find product by ID and add to cart
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            cart.push(products[i]);
            updateCart();
            break;
        }
    }
}

// Remove an item from the shopping cart
function removeFromCart(index) {
    // Check if index is valid before removing
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCart();
    }
}

// Update the cart display and totals
function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;
    
    // Clear existing cart display
    cartContainer.innerHTML = '';
    
    // Check if cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    } else {
        // Display each item in cart
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            const itemIndex = i; // Store index for remove button
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            // Create item name span
            const nameSpan = document.createElement('span');
            nameSpan.className = 'cart-item-name';
            nameSpan.textContent = item.name;
            
            // Create container for price and remove button
            const rightDiv = document.createElement('div');
            rightDiv.className = 'cart-item-right';
            
            // Create price span
            const priceSpan = document.createElement('span');
            priceSpan.className = 'cart-item-price';
            priceSpan.textContent = '$' + item.price.toFixed(2);
            
            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', function() {
                removeFromCart(itemIndex);
            });
            
            // Add price and button to right container
            rightDiv.appendChild(priceSpan);
            rightDiv.appendChild(removeBtn);
            
            // Add name and right container to cart item
            cartItem.appendChild(nameSpan);
            cartItem.appendChild(rightDiv);
            cartContainer.appendChild(cartItem);
        }
    }
    
    // Calculate cart totals
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price;
    }
    const tax = subtotal * taxRate;
    const shipping = cart.length > 0 ? shippingCost : 0;
    const total = subtotal + tax + shipping;
    
    // Update total displays
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('shipping').textContent = '$' + shipping.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}
