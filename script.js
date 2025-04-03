// Switch between Login and Sign Up tabs
function switchTab(tab) {
    // Hide all forms
    document.querySelectorAll('.form-content').forEach((form) => {
        form.classList.remove('active');
    });

    // Show the clicked tab's form
    document.getElementById(tab).classList.add('active');

    // Update active tab style
    document.querySelectorAll('.tab-btn').forEach((btn) => {
        btn.classList.remove('active');
    });
    document.querySelector(`button[onclick="switchTab('${tab}')"]`).classList.add('active');
}

// Handle Login
function submitLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    const storedUsername = sessionStorage.getItem('username');
    const storedPassword = sessionStorage.getItem('password');
    
    if (username === storedUsername && password === storedPassword) {
        alert('Login successful!');
        window.location.href = 'dashboard.html'; // Redirect to dashboard or desired page
    } else {
        alert('Invalid username or password!');
    }
}

// Handle Sign Up
function submitSignUp(event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Store user data in sessionStorage (for this example, you can also use localStorage)
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('password', password);

    alert('Sign up successful! Now you can log in.');

    // Switch back to login form
    switchTab('login');
}

// Handle Forgot Password
function showForgotPassword() {
    document.getElementById('forgot-password-form').style.display = 'block';
    document.getElementById('login').style.display = 'none';
}

// Reset Password (For demonstration purposes)
function resetPassword(event) {
    event.preventDefault();
    alert('Password reset link has been sent to your email.');
    backToLoginForm();
}

// Back to Login from Forgot Password
function backToLoginForm() {
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

// Handle when a user already has an account and wants to log in
function backToLoginForm() {
    switchTab('login');
}
