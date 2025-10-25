// react-app/src/utils/data.js

const SESSION_KEY = 'ticketapp_session';
const LOGIN_USER = 'test';
const LOGIN_PASS = 'password';

// --- Toast Notification Helper (Required for feedback) ---
export function showToast(message, type = 'success') {
    // This is a simple browser alert. Use your full toast implementation if you have one.
    alert(`${type.toUpperCase()}: ${message}`); 
}

// --- Auth Functions (Required for login logic) ---
export function isAuthenticated() {
    return !!localStorage.getItem(SESSION_KEY);
}

export function login(username, password) {
    if (username === LOGIN_USER && password === LOGIN_PASS) {
        localStorage.setItem(SESSION_KEY, `token-${new Date().getTime()}`);
        return { success: true };
    } else {
        return { success: false, message: 'Invalid credentials. Try: test/password' };
    }
}

export function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    showToast('Logged out successfully.', 'success');
}