// Function to register for an event
function registerEvent(eventName) {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
        // User is logged in, register them for the event
        showCustomAlert(`You have successfully registered for the ${eventName}.`);
        localStorage.setItem(`${eventName}Registered`, 'true');
    } else {
        // User is not logged in, redirect to account page
        showCustomAlert('Please sign up or log in to register for this event.');
        window.location.href = 'account.html';
    }
}

// Function to check if user is logged in on page load
$(document).ready(function() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        showCustomAlert('You need to sign up or log in to register for events.');
    }
});
