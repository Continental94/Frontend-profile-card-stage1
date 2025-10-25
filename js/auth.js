// js/auth.js

const SESSION_KEY = 'ticketapp_session';
const LOGIN_USER = 'test';
const LOGIN_PASS = 'password';

// --- Toast Notification Helper (for professional feedback) ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container') || document.body.appendChild(document.createElement('div'));
    container.id = 'toast-container';

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// --- Core Auth Functions ---
function isAuthenticated() {
    return !!localStorage.getItem(SESSION_KEY);
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');

    if (!username || !password) {
        errorMsg.textContent = 'Username and password are required.';
        return;
    }
    
    // Simulated Authentication
    if (username === LOGIN_USER && password === LOGIN_PASS) {
        // SUCCESS: Store token and redirect
        const mockToken = `token-${new Date().getTime()}`;
        localStorage.setItem(SESSION_KEY, mockToken);
        showToast('Login successful! Redirecting...', 'success');
        
        // Wait for toast to show before redirecting
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);

    } else {
        // FAILURE: Show inline and toast error
        errorMsg.textContent = 'Invalid credentials. Try: test/password';
        showToast('Login failed.', 'error');
    }
}

function handleLogout() {
    localStorage.removeItem(SESSION_KEY); // Clear session
    showToast('Logged out successfully.', 'success');
    
    // Redirect to landing page (required)
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// --- Protected Route Check (MANDATORY SECURITY) ---
function protectRoute() {
    // Only run this check on protected pages
    if (window.location.pathname.includes('dashboard.html')) {
        if (!isAuthenticated()) {
            showToast('Your session has expired — please log in again.', 'error');
            // MANDATORY REDIRECT
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        }
    }
}

// Ensure protected routes are checked on load
window.addEventListener('load', protectRoute);