$(document).ready(function() {
    // Check if the user has accepted the privacy notice
    if (!localStorage.getItem('privacyAccepted')) {
        // Show the popup if not accepted
        $('#privacyPopup').fadeIn();
    }

    // When the user clicks "Accept"
    $('#acceptBtn').click(function() {
        // Hide the popup
        $('#privacyPopup').fadeOut();
        // Store the user's consent in localStorage
        localStorage.setItem('privacyAccepted', 'true');
    });
});




$('#clearStorageBtn').click(function() {
    // Clear the privacy consent from localStorage
    localStorage.removeItem('privacyAccepted');
    alert('Privacy consent cleared! Refresh the page to see the popup again.');
});

$(document).ready(function() {
    // Your jQuery code to trigger the modal
    if (!localStorage.getItem('userEmail')) {
        $('#signupModal').modal('show');
    }

    // Handle the signup form submission
    $('#signupForm').on('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        const email = $('#signupEmail').val();
        const password = $('#signupPassword').val();

        // Check if email already exists
        if (localStorage.getItem('userEmail') === email) {
            
            return; // Prevent further processing
        }

        // Save user info
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password); // Save the password for authentication
        localStorage.setItem('discountApplied', 'true'); // Apply discount for signing up
        localStorage.setItem('check','true');

        alert('Thank you for signing up! Your discount will be applied at checkout.');
        
        $('#signupModal').modal('hide');
        $('#userGreeting').html(`Logged in as: <strong>${email}</strong>`);
        $('#profileSection').show();
        $('#signupSection').hide();
        $('#loginSection').hide();
        $('#signOutContainer').show(); // Show sign-out button
    });

    
});

function filterItems() {
    // Get the input element and its value
    var input = document.getElementById('searchInput');
    var filter = input.value.toLowerCase();
    
    // Get the list of items to search through
    var items = document.getElementById('searchList');
    var li = items.getElementsByTagName('li');

    // Loop through each item in the list
    for (var i = 0; i < li.length; i++) {
        var item = li[i];
        var textValue = item.textContent || item.innerText;

        // If the text matches the input, display it; otherwise, hide it
        if (textValue.toLowerCase().indexOf(filter) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }
}

let slideIndex = 1;  // Start with the first slide

// Call this function after the page has loaded
window.onload = function () {
    showSlides(slideIndex);
    setInterval(function () {
        slideIndex++;
        showSlides(slideIndex);
    }, 10000);  // Auto-slide every 5 seconds
};

// Function to move to a specific slide when clicking on dots
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    // If n is greater than the number of slides, start from the first slide
    if (n > slides.length) { slideIndex = 1 }
    // If n is less than 1, go to the last slide
    if (n < 1) { slideIndex = slides.length }

    // Hide all slides initially
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove the "active" class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide and add the "active" class to the corresponding dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
// Initialize or retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to show custom alert
function showCustomAlert(message) {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message; // Set the message text

    alertBox.classList.add('show'); // Show the alert

    // Hide the alert after 3 seconds
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);

    // Add event listener to close the alert when the 'x' is clicked
    document.querySelector('.close-alert').addEventListener('click', function () {
        alertBox.classList.remove('show');
    });
}

// Quantity control functions
document.getElementById('increaseQuantity').addEventListener('click', function() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
});

document.getElementById('decreaseQuantity').addEventListener('click', function() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

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

// Event listener for "ADD TO CART" button
document.querySelector('.add-to-cart').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const productName = this.getAttribute('data-product-name'); // Get product name
    const price = parseFloat(this.getAttribute('data-product-price')); // Get product price as a float
    const quantity = parseInt(document.getElementById('quantity').value); // Get quantity
    addToCart(productName, price, quantity); // Call function to add product to cart
});

function filterItems() {
    // Get the input element and its value
    var input = document.getElementById('searchInput');
    var filter = input.value.toLowerCase();

    // Get the list of items to search through
    var items = document.getElementById('searchList');
    var li = items.getElementsByTagName('li');
    
    // Variable to track if there's a visible result
    let visibleCount = 0;

    // Loop through each item in the list
    for (var i = 0; i < li.length; i++) {
        var item = li[i];
        var textValue = item.textContent || item.innerText;

        // If the text matches the input, display it; otherwise, hide it
        if (textValue.toLowerCase().indexOf(filter) > -1 && filter !== "") {
            item.style.display = ""; // Show the item
            visibleCount++;
        } else {
            item.style.display = "none"; // Hide the item
        }
    }

    // Show or hide the search results list based on matches
    items.style.display = visibleCount > 0 ? "block" : "none";
}
function redirectToProduct(productPage) {
    // Hide the search list after clicking
    document.getElementById('searchList').style.display = "none";

    // Redirect to the relevant product detail page
    window.location.href = productPage;
}
// Quantity control functions
function updateQuantity(button, operation) {
    const quantityInput = button.parentElement.querySelector('input[id="quantity"]');
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
    if (event.target.matches('#increaseQuantity')) {
        updateQuantity(event.target, 'increase');
    } else if (event.target.matches('#decreaseQuantity')) {
        updateQuantity(event.target, 'decrease');
    } else if (event.target.matches('.add-to-cart')) {
        event.preventDefault(); // Prevent default anchor behavior
        const productName = event.target.getAttribute('data-product-name'); // Get product name
        const price = parseFloat(event.target.getAttribute('data-product-price')); // Get product price as a float
        const quantityInput = event.target.parentElement.querySelector('input[id="quantity"]'); // Get the corresponding quantity input
        const quantity = parseInt(quantityInput.value); // Get quantity
        addToCart(productName, price, quantity); // Call function to add product to cart
    }
});
// Function to handle the search
function handleSearch(event) {
    event.preventDefault(); // Prevent the form from submitting

    var input = document.getElementById('searchInput').value.trim().toLowerCase();
    var items = document.getElementById('searchList');
    var li = items.getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        var item = li[i];
        var textValue = item.textContent.toLowerCase();

        // Check if the input matches the item text
        if (textValue === input) {
            // Redirect to the product page
            window.location.href = item.getAttribute('data-page');
            return;
        }
    }

    // Optionally, handle case where no match is found
    showCustomAlert("No matching product found.");
}

