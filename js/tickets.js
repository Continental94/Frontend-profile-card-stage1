// js/tickets.js

const TICKET_STORAGE_KEY = 'app_tickets';

// --- Ticket Data Store ---
function getTickets() {
    const tickets = localStorage.getItem(TICKET_STORAGE_KEY);
    // Initialize with some mock data if empty
    if (!tickets) {
        return [
            { id: 1, title: "Initial Server Setup", status: "closed", description: "Set up AWS instance.", priority: "High", created_at: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
            { id: 2, title: "Review UI/UX Design", status: "in_progress", description: "Check all responsive layouts.", priority: "Medium", created_at: new Date().toISOString().split('T')[0] },
            { id: 3, title: "Implement Auth Flow", status: "open", description: "Write login and logout functions.", priority: "High", created_at: new Date().toISOString().split('T')[0] },
        ];
    }
    return JSON.parse(tickets);
}

function saveTickets(tickets) {
    localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(tickets));
}

// --- CRUD: READ & DASHBOARD STATS ---
function renderDashboard() {
    const tickets = getTickets();
    
    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'open').length;
    const resolved = tickets.filter(t => t.status === 'closed').length;

    // Update stats boxes (assuming IDs in dashboard.html)
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-open').textContent = open;
    document.getElementById('stat-resolved').textContent = resolved;

    renderTicketList(tickets);
}

function renderTicketList(tickets) {
    const listContainer = document.getElementById('ticket-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = ''; // Clear previous list

    if (tickets.length === 0) {
        listContainer.innerHTML = '<p class="card" style="text-align: center;">No tickets found. Create one!</p>';
        return;
    }

    tickets.forEach(ticket => {
        const ticketCard = document.createElement('div');
        ticketCard.className = 'card ticket-card';
        
        // Semantic Card Structure
        ticketCard.innerHTML = `
            <h3>${ticket.title}</h3>
            <p style="margin-bottom: 10px;">${ticket.description || 'No description.'}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="tag ${ticket.status}">${ticket.status.replace('_', ' ')}</span>
                <div>
                    <button class="btn btn-primary" onclick="openEditModal(${ticket.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteTicket(${ticket.id})">Delete</button>
                </div>
            </div>
        `;
        listContainer.appendChild(ticketCard);
    });
}


// --- CRUD: CREATE & UPDATE (using a simple modal/form) ---
function handleTicketForm(event) {
    event.preventDefault();
    const form = event.target;
    
    const id = form.ticket_id.value;
    const title = form.title.value.trim();
    const status = form.status.value;
    const description = form.description.value.trim();
    
    // MANDATORY VALIDATION
    if (!title || !status) {
        showToast('Title and Status are mandatory!', 'error');
        return;
    }
    
    let tickets = getTickets();
    
    if (id) {
        // UPDATE (Edit)
        tickets = tickets.map(t => t.id == id ? { ...t, title, status, description } : t);
        showToast(`Ticket #${id} updated successfully!`);
    } else {
        // CREATE
        const newTicket = {
            id: Date.now(), // Simple unique ID
            title,
            status,
            description,
            priority: 'Medium', // Default priority
            created_at: new Date().toISOString().split('T')[0]
        };
        tickets.push(newTicket);
        showToast('New ticket created successfully!');
        form.reset(); // Clear form after creation
    }

    saveTickets(tickets);
    renderDashboard();
    // Optional: close modal if you used one
}


// --- CRUD: DELETE ---
function deleteTicket(id) {
    if (!confirm("Are you sure you want to delete this ticket?")) {
        return; // Confirmation step (required)
    }

    let tickets = getTickets();
    
    // Filter out the ticket with the given ID
    tickets = tickets.filter(t => t.id !== id);

    saveTickets(tickets);
    renderDashboard();
    showToast(`Ticket #${id} deleted successfully!`);
}

// --- Initialize Dashboard on Load ---
window.addEventListener('load', () => {
    // Attach the form handler if the form exists on the page
    const form = document.getElementById('ticket-form');
    if (form) {
        form.addEventListener('submit', handleTicketForm);
    }

    // Render the dashboard/list if the container exists
    if (document.getElementById('ticket-list') || document.getElementById('stat-total')) {
        renderDashboard();
    }
});