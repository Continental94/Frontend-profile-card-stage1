// react-app/src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
// Import all necessary functions from your utility file
import { getTickets, saveTicket, deleteTicket, showToast } from '../utils/data'; 

const DashboardPage = () => {
    const [tickets, setTickets] = useState([]);
    const [formState, setFormState] = useState({ 
        id: '', title: '', status: 'open', description: ''
    });
    // State to handle inline form validation error messages
    const [formError, setFormError] = useState('');

    // Load tickets when the component mounts
    useEffect(() => {
        setTickets(getTickets());
    }, []);

    const renderStats = (data) => {
        const total = data.length;
        const open = data.filter(t => t.status === 'open').length;
        const resolved = data.filter(t => t.status === 'closed').length;

        return (
            <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div className="card">
                    <h3>Total Tickets</h3>
                    <p id="stat-total" style={{ fontSize: '2em', color: 'var(--color-primary)' }}>{total}</p>
                </div>
                <div className="card">
                    <h3>Open Tickets</h3>
                    <p id="stat-open" style={{ fontSize: '2em', color: 'var(--color-open)' }}>{open}</p>
                </div>
                <div className="card">
                    <h3>Resolved Tickets</h3>
                    <p id="stat-resolved" style={{ fontSize: '2em', color: 'var(--color-closed)' }}>{resolved}</p>
                </div>
            </div>
        );
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormError(''); // Clear previous errors
        
        // 1. Mandatory Validation
        if (!formState.title || !formState.status) {
            setFormError("Title and Status are mandatory.");
            showToast("Validation Failed: Title and Status required.", "error");
            return;
        }

        // 2. Save/Update ticket
        // NOTE: The saveTicket function in 'data.js' needs to be implemented to update localStorage and return the new array.
        // Assuming saveTicket in data.js updates global state and localStorage, then returns the new list:
        const newTickets = saveTicket(tickets, formState); 
        setTickets(newTickets);
        
        showToast(formState.id ? 'Ticket updated successfully!' : 'New ticket created!', 'success');

        // 3. Clear form after submission
        setFormState({ id: '', title: '', status: 'open', description: '' });
    };

    const handleEdit = (ticket) => {
        // Set form state for editing an existing ticket
        setFormState({ 
            id: ticket.id, 
            title: ticket.title, 
            status: ticket.status, 
            description: ticket.description 
        });
        // Scroll to the top to show the edit form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this ticket?")) return;
        
        // Assuming deleteTicket in data.js removes ticket, updates localStorage, and returns the remaining list:
        const remainingTickets = deleteTicket(tickets, id);
        setTickets(remainingTickets);
        showToast(`Ticket #${id} deleted successfully!`, 'success');
        // Clear form if the deleted ticket was being edited
        if (formState.id === id) {
            setFormState({ id: '', title: '', status: 'open', description: '' });
        }
    };

    // Helper to render a single ticket card
    const renderTicketCard = (ticket) => (
        // The key is essential for React list rendering
        <div key={ticket.id} className="card ticket-card" style={{ borderLeft: `5px solid var(--color-${ticket.status.replace('_', '-')})` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0 }}>{ticket.title}</h4>
                {/* REQUIRED: Status Tag with Correct Class/Color */}
                <span className={`tag ${ticket.status.replace(' ', '_')}`}>{ticket.status.toUpperCase().replace('_', ' ')}</span>
            </div>
            <p style={{ marginBottom: '15px' }}>{ticket.description || 'No description provided.'}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-primary" onClick={() => handleEdit(ticket)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(ticket.id)}>Delete</button>
            </div>
        </div>
    );

    return (
        <Layout>
            <main className="container" style={{ padding: '30px 20px' }}>
                
                {/* Summary Statistics Section */}
                <h2>Summary Statistics</h2>
                {renderStats(tickets)}

                {/* Create/Edit Ticket Form Section */}
                <div className="card" style={{ marginBottom: '40px' }}>
                    <h2>{formState.id ? 'Edit Ticket' : 'Create New Ticket'}</h2>
                    <form onSubmit={handleFormSubmit}>
                        
                        {/* REQUIRED: Inline Form Validation Error */}
                        {formError && <p className="error-message" style={{ color: '#dc3545', fontWeight: 'bold' }}>{formError}</p>}

                        <label htmlFor="title">Title (Mandatory)</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            value={formState.title} 
                            onChange={(e) => setFormState({...formState, title: e.target.value})} 
                            required 
                        />
                        
                        <label htmlFor="status">Status (Mandatory)</label>
                        <select 
                            id="status" 
                            name="status" 
                            value={formState.status} 
                            onChange={(e) => setFormState({...formState, status: e.target.value})} 
                            required
                        >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">Closed</option>
                        </select>
                        
                        <label htmlFor="description">Description (Optional)</label>
                        <textarea 
                            id="description" 
                            name="description"
                            value={formState.description}
                            onChange={(e) => setFormState({...formState, description: e.target.value})}
                        ></textarea>
                        
                        <button type="submit" className="btn btn-primary">
                            {formState.id ? 'Update Ticket' : 'Save New Ticket'}
                        </button>
                        {formState.id && (
                            <button 
                                type="button" 
                                className="btn" 
                                onClick={() => setFormState({ id: '', title: '', status: 'open', description: '' })} 
                                style={{ marginLeft: '10px', background: '#ccc' }}
                            >
                                Cancel Edit
                            </button>
                        )}
                    </form>
                </div>

                {/* Ticket List Section */}
                <h2>Ticket Management List</h2>
                <div id="ticket-list" className="ticket-list" style={{ display: 'grid', gap: '20px' }}>
                    {tickets.map(renderTicketCard)}
                    
                    {/* 👇 THIS WAS THE MISSING PART 👇 */}
                    {!tickets.length && <p>No tickets available. Create a new one!</p>}
                </div>
            </main>
        </Layout>
    );
};

export default DashboardPage;