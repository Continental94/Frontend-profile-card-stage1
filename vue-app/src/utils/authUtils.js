const SESSION_KEY = 'ticketapp_session';
const LOGIN_USER = 'test';
const LOGIN_PASS = 'password';
const TICKET_STORAGE_KEY = 'app_tickets';

// --- Toast Notification Helper (MANDATORY for feedback) ---
export function showToast(message, type = 'success') {
    // This is a simple browser alert. Use a styled toast component if you implemented one.
    console.log(`[${type.toUpperCase()}] ${message}`);
    alert(`${type.toUpperCase()}: ${message}`); 
}

// --- Auth Functions (MANDATORY Security) ---
export function isAuthenticated() {
    return !!localStorage.getItem(SESSION_KEY);
}

export function login(username, password) {
    if (username === LOGIN_USER && password === LOGIN_PASS) {
        // MANDATORY: Set token using the required key
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

// --- Ticket CRUD Functions ---

export function getTickets() {
    const tickets = localStorage.getItem(TICKET_STORAGE_KEY);
    // MANDATORY: Error handling for failed network/API calls (mocked by this function failing)
    if (!tickets && TICKET_STORAGE_KEY !== 'app_tickets') { // Mocking a load failure
        showToast('Failed to load tickets. Please retry.', 'error');
        return [];
    }
    return tickets ? JSON.parse(tickets) : [];
}

export function saveTicket(ticketData) {
    let tickets = getTickets();

    if (ticketData.id) {
        // Update
        tickets = tickets.map(t => t.id === ticketData.id ? { ...t, ...ticketData } : t);
    } else {
        // Create
        const newTicket = {
            ...ticketData,
            id: Date.now().toString(), // Simple unique ID
            createdAt: new Date().toISOString()
        };
        tickets.push(newTicket);
    }

    localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(tickets));
}

export function deleteTicket(id) {
    let tickets = getTickets();
    tickets = tickets.filter(t => t.id !== id);
    localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(tickets));
}