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
 // Add this to your existing script section
$('#clearStorageBtn').click(function() {
    // Clear the privacy consent from localStorage
    localStorage.removeItem('privacyAccepted');
    alert('Privacy consent cleared! Refresh the page to see the popup again.');
});