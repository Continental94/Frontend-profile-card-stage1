// twig-app/public/js/app.js (Combined AUTH, SIGNUP, and TICKET CRUD for Twig)

// --- Constants (from auth.js) ---
const SESSION_KEY = 'ticketapp_session';
const LOGIN_USER = 'test';
const LOGIN_PASS = 'password';
const TICKET_STORAGE_KEY = 'app_tickets';

// --- Toast Notification Helper (from auth.js) ---
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

function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    showToast('Logged out successfully.', 'success');
    
    // Redirect to landing page (index.html is now the root path /)
    setTimeout(() => {
        window.location.href = '/'; 
    }, 1000);
}

// --- Login Handler (from auth.js) ---
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');

    if (!username || !password) {
        errorMsg.textContent = 'Username and password are required.';
        return;
    }
    
    if (username === LOGIN_USER && password === LOGIN_PASS) {
        localStorage.setItem(SESSION_KEY, `token-${new Date().getTime()}`);
        showToast('Login successful! Redirecting...', 'success');
        
        // Redirect to protected route
        setTimeout(() => {
            window.location.href = '/dashboard'; 
        }, 1000);

    } else {
        errorMsg.textContent = 'Invalid credentials. Try: test/password';
        showToast('Login failed.', 'error');
    }
}

// --- Sign Up Handler (NEW LOGIC) ---
function handleSignup(event) {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMsg = document.getElementById('signup-error');
    
    errorMsg.textContent = '';

    // MANDATORY VALIDATION: Password must match confirm password
    if (password !== confirmPassword) {
        errorMsg.textContent = 'Password and Confirm Password must match!';
        showToast('Signup failed: Passwords do not match.', 'error');
        return;
    }

    // SIMULATE account creation
    showToast('Account created successfully! Please log in.', 'success');
    
    // Redirect to login page
    setTimeout(() => {
        window.location.href = '/auth/login'; 
    }, 1000);
}

// --- Protected Route Check (from auth.js) ---
function protectRoute() {
    // Check if the current path is protected (e.g., /dashboard)
    if (window.location.pathname.includes('/dashboard')) {
        if (!isAuthenticated()) {
            showToast('Your session has expired — please log in again.', 'error');
            // MANDATORY REDIRECT
            setTimeout(() => {
                window.location.href = '/auth/login'; 
            }, 1000);
        }
    }
}

// --- TICKET CRUD Logic (from tickets.js) ---
function getTickets() { /* ... your original getTickets content ... */ }
function saveTickets(tickets) { /* ... your original saveTickets content ... */ }
function renderDashboard() { /* ... your original renderDashboard content ... */ }
function handleTicketForm(event) { /* ... your original handleTicketForm content ... */ }
function deleteTicket(id) { /* ... your original deleteTicket content ... */ }


// --- Initialize Application ---
window.addEventListener('load', () => {
    protectRoute();

    // Attach Login Listener
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Attach Sign Up Listener
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Attach Ticket Form Listener (only on dashboard)
    const ticketForm = document.getElementById('ticket-form');
    if (ticketForm) {
        ticketForm.addEventListener('submit', handleTicketForm);
    }

    // Initial Dashboard Render (only on dashboard)
    if (document.getElementById('ticket-list')) {
        renderDashboard();
    }
});