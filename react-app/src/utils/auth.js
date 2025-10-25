// react-app/src/utils/auth.js

const SESSION_KEY = 'ticketapp_session';
const LOGIN_USER = 'test';
const LOGIN_PASS = 'password';

// Simple toast simulation (since a full toast component is complex)
export function showToast(message, type = 'success') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    alert(`[${type.toUpperCase()}] ${message}`);
}

export function isAuthenticated() {
    return !!localStorage.getItem(SESSION_KEY);
}

export function login(username, password) {
    if (username === LOGIN_USER && password === LOGIN_PASS) {
        const mockToken = `token-${new Date().getTime()}`;
        localStorage.setItem(SESSION_KEY, mockToken);
        return { success: true };
    } else {
        return { success: false, message: 'Invalid credentials. Try: test/password' };
    }
}

export function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    showToast('Logged out successfully.', 'success');
}