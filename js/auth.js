// Authentication and App Functionality

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('velocita_currentUser');
    const navAuth = document.getElementById('navAuth');
    const navSignup = document.getElementById('navSignup');
    const navUser = document.getElementById('navUser');
    const navUsername = document.getElementById('navUsername');
    
    if (currentUser && navAuth && navSignup && navUser) {
        const user = JSON.parse(currentUser);
        navAuth.style.display = 'none';
        navSignup.style.display = 'none';
        navUser.style.display = 'flex';
        if (navUsername) {
            navUsername.textContent = user.fullName.split(' ')[0];
        }
    }
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('velocita_users') || '[]');
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Save current user
        localStorage.setItem('velocita_currentUser', JSON.stringify(user));
        errorDiv.style.display = 'none';
        alert('Login successful! Welcome back to Velocita.');
        window.location.href = 'index.html';
    } else {
        errorDiv.textContent = 'Invalid email or password. Please try again.';
        errorDiv.style.display = 'block';
    }
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('signupError');
    
    // Validate passwords match
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match.';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters long.';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('velocita_users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        errorDiv.textContent = 'An account with this email already exists.';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        fullName: fullName,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('velocita_users', JSON.stringify(users));
    localStorage.setItem('velocita_currentUser', JSON.stringify(newUser));
    
    errorDiv.style.display = 'none';
    alert('Account created successfully! Welcome to Velocita.');
    window.location.href = 'index.html';
}

// Logout
function logout() {
    localStorage.removeItem('velocita_currentUser');
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initMobileNav();
    loadFeaturedCars();
    loadProducts();
});
