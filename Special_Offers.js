// Function to handle subscription
function subscribe(plan) {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
        // User is logged in, subscribe them to the plan
        showCustomAlert(`Thank you for subscribing to the ${plan}.`);
        localStorage.setItem(`${plan}Subscription`, 'true');
    } else {
        // User is not logged in, redirect to account page
        alert('Please sign up or log in to subscribe.');
        window.location.href = 'account.html';
        return;
    }
}
// Function to check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        alert('You need to sign up or log in to subscribe to our plans.');
        window.location.href = 'account.html';
        return;
    }
});

// Quantity control functions
function updateQuantity(button, operation) {
    const quantityInput = button.parentElement.querySelector('.quantity-input');
    if (operation === 'increase') {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    } else if (operation === 'decrease' && quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

// Function to add item to the cart
function addToCart(productName, price, quantity) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += quantity; // Increase quantity if already in cart
    } else {
        cart.push({ name: productName, quantity: quantity, price: price }); // Add new product to cart
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    showCustomAlert(`${quantity} x ${productName} has been added to the cart!`); // Show custom alert
}

// Event listener for quantity buttons and "ADD TO CART" button
document.addEventListener('click', function(event) {
    // Check if the clicked element is an increase or decrease button
    if (event.target.matches('.increaseQuantity')) {
        updateQuantity(event.target, 'increase');
    } else if (event.target.matches('.decreaseQuantity')) {
        updateQuantity(event.target, 'decrease');
    } else if (event.target.matches('.add-to-cart')) {
        event.preventDefault(); // Prevent default anchor behavior
        const productName = event.target.getAttribute('data-product-name'); // Get product name
        const price = parseFloat(event.target.getAttribute('data-product-price')); // Get product price as a float
        const quantityInput = event.target.parentElement.querySelector('.quantity-input'); // Get the corresponding quantity input
        const quantity = parseInt(quantityInput.value); // Get quantity
        addToCart(productName, price, quantity); // Call function to add product to cart
    }
});
