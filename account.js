    document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail');
    const userGreeting = document.getElementById('userGreeting');
    const profileSection = document.getElementById('profileSection');
    const signOutContainer = document.getElementById('signOutContainer');
    const signupSection = document.getElementById('signupSection');
    const loginSection = document.getElementById('loginSection');


    

    // If user is logged in, show greeting and profile section
    if (userEmail) {
        userGreeting.innerHTML = `Logged in as: <strong>${userEmail}</strong>`;
        profileSection.style.display = 'block';
        signupSection.style.display = 'none';
        loginSection.style.display = 'none';
        signOutContainer.style.display = 'block';
    } else {
        userGreeting.innerHTML = 'You are not logged in.';
        profileSection.style.display = 'none';
        signOutContainer.style.display = 'none';
        signupSection.style.display = 'block'; // Show sign-up section
        loginSection.style.display = 'block'; // Show login section
    }

    // Handle sign-up
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        // Check if email already exists
        if (localStorage.getItem('userEmail') === email) {
            alert('Email already exists. Please log in instead.');
            return; // Prevent further processing
        }
        localStorage.setItem('logincheck' ,'false');
        // Save user info
        localStorage.setItem('check','true')
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password); // Save the password for authentication
        if (localStorage.getItem('check','true')){
            localStorage.setItem('discountApplied', 'true'); // Apply discount for signing up
        }
        

        alert('Thank you for signing up! Your discount will be applied at checkout.');
        userGreeting.innerHTML = `Logged in as: <strong>${email}</strong>`;
        profileSection.style.display = 'block';
        signupSection.style.display = 'none';
        loginSection.style.display = 'none';
        signOutContainer.style.display = 'block'; // Show sign-out button
    });

    // Handle log-in
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Check if the email exists and password matches
        if (localStorage.getItem('userEmail') === email && localStorage.getItem('userPassword') === password) {
            alert('Welcome back! You can now continue shopping.');
            userGreeting.innerHTML = `Logged in as: <strong>${email}</strong>`;
            profileSection.style.display = 'block';
            signupSection.style.display = 'none';
            loginSection.style.display = 'none';
            signOutContainer.style.display = 'block'; // Show sign-out button
            localStorage.setItem('logincheck' ,'true');
        } else {
            alert('Invalid email or password. Please try again.');
        }
        if (localStorage.getItem('userEmail') === email && localStorage.getItem('userPassword') === password && localStorage.getItem('check','ture')){
            localStorage.setItem('discountApplied','true')
        } else{
            localStorage.removeItem('discountApplied')
            return;
        }
    });

    // Handle profile update
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting
        const email = document.getElementById('profileEmail').value;
        const newPassword = document.getElementById('profilePassword').value;

        // Update user email and password
        if (localStorage.getItem('userEmail') === email) {
            if (newPassword) {
                localStorage.setItem('userPassword', newPassword); // Update password
            }
            alert('Profile updated successfully!');
        } else {
            alert('Email does not match with the account.');
        }
    });

    // Handle sign out
    document.getElementById('signOutButton').addEventListener('click', function() {
        
        alert('You have been signed out.');
        userGreeting.innerHTML = 'You are not logged in.';
        profileSection.style.display = 'none'; // Hide profile section
        signOutContainer.style.display = 'none'; // Hide sign-out button
        signupSection.style.display = 'block'; // Show sign-up section
        loginSection.style.display = 'block'; // Show login section
        localStorage.removeItem('discountApplied');
        localStorage.setItem('logincheck' ,'false');
        document.getElementById('profileImage').style.display = 'none'; // Remove profile picture
    });
});