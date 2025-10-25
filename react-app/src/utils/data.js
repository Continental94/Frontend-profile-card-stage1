// --- 1. CONSTANTS ---
const SESSION_KEY = 'ticketapp_session';
const LOGIN_USER = 'test';
const LOGIN_PASS = 'password';
const TICKET_STORAGE_KEY = 'app_tickets';


// --- 2. AUTH CORE (AUTHENTICATION CHECK) ---
// MUST be defined first to avoid "Cannot access before initialization"
export function isAuthenticated() {
    return !!localStorage.getItem(SESSION_KEY);
}


// --- 3. TOAST HELPER ---
export function showToast(message, type = 'success') {
    // Simple browser alert for mandatory feedback
    alert(`${type.toUpperCase()}: ${message}`); 
}


// --- 4. AUTH HANDLERS ---
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


// --- 5. TICKET CRUD LOGIC ---

export function getTickets() {
    const data = localStorage.getItem(TICKET_STORAGE_KEY);
    // GUARANTEE: ALWAYS return an array, even if empty or initializing
    if (!data) {
        const initialTickets = [
            { id: 1001, title: 'Initial Bug Report', status: 'open', description: 'Mandatory test ticket for initial load.' }
        ];
        localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(initialTickets));
        return initialTickets;
    }
    return JSON.parse(data);
}

export function saveTicket(currentTickets, newTicketData) {
    let tickets = [...currentTickets];
    if (newTicketData.id) {
        // Edit existing ticket
        tickets = tickets.map(t => t.id === newTicketData.id ? { ...t, ...newTicketData } : t);
        showToast(`Ticket #${newTicketData.id} updated!`, 'success');
    } else {
        // Create new ticket
        const newId = new Date().getTime();
        tickets.unshift({ ...newTicketData, id: newId }); // Add to the start
        showToast(`New ticket created!`, 'success');
    }
    localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(tickets));
    return tickets;
}

export function deleteTicket(currentTickets, id) {
    const remainingTickets = currentTickets.filter(t => t.id !== id);
    localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(remainingTickets));
    return remainingTickets;
}