const displayCartItems = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsContainer.innerHTML = ''; // Clear existing items
    
    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0; // Initialize total price
    
    // Check if cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li class="list-group-item">Your cart is empty.</li>';
        totalPriceElement.textContent = `Total Price: $0.00`; // Update total price
        return;
    }
    
    // Loop through cart items and display them
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        // Create item description with price
        const orgPrice = (item.price)
        const itemPrice = (item.price * item.quantity).toFixed(2); // Calculate item price
        const itemDescription = document.createElement('span');
        itemDescription.textContent = `${item.name}  [$${orgPrice} Per]  (Quantity: ${item.quantity}) - $${itemPrice}`; // Show item price
        
        // Update total price
        totalPrice += item.price * item.quantity; // Accumulate the total price
        
        // Create quantity adjustment buttons
        const quantityControl = document.createElement('div');
        quantityControl.className = 'd-flex align-items-center';
        
        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.className = 'btn btn-neg btn-sm ';
        decreaseButton.onclick = () => {
            updateQuantity(index, -1); // Decrease quantity
        };
        
        const quantityDisplay = document.createElement('span');
        quantityDisplay.className = 'quantity';
        quantityDisplay.textContent = item.quantity;
        
        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.className = 'btn btn-plus btn-sm ';
        increaseButton.onclick = () => {
            updateQuantity(index, 1); // Increase quantity
        };
        
        // Append buttons and quantity display to quantityControl
        quantityControl.appendChild(decreaseButton);
        quantityControl.appendChild(quantityDisplay);
        quantityControl.appendChild(increaseButton);

        // Append item description and quantity control to list item
        listItem.appendChild(itemDescription);
        listItem.appendChild(quantityControl);
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'btn btn-danger btn-sm ms-2';
        removeButton.onclick = () => {
            removeItemFromCart(index);
        };

        // Append remove button to list item
        listItem.appendChild(removeButton);
        cartItemsContainer.appendChild(listItem);
    });
    
    // Apply 10% discount if user signed up
    if (localStorage.getItem('discountApplied')) {
        const discount = totalPrice * 0.10;
        totalPrice = totalPrice - discount; // Subtract 10%
        // Update total price display
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)} with 10% discount`;
    }
    else{
        // Update total price display
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }
    
};

const updateQuantity = (index, change) => {
    // Retrieve the current cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Update the quantity
    cart[index].quantity += change;

    // Prevent quantity from going below 1
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Refresh the cart display
    displayCartItems();
};

const removeItemFromCart = (index) => {
    // Retrieve the current cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Remove the item from the cart
    cart.splice(index, 1);
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Refresh the cart display
    displayCartItems();
};

// Checkout process
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting

    // Checkout completion message
    alert('Thank you for your purchase! Your order has been completed.'); 

    // Remove the discount after the transaction
    localStorage.removeItem('discountApplied'); // Remove discount after purchase
    localStorage.removeItem('cart');
    localStorage.removeItem('check');
    displayCartItems()
});

// Call display function when cart page is loaded
document.addEventListener('DOMContentLoaded', displayCartItems);