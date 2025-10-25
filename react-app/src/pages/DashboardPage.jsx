import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
// Import all necessary functions from your utility file
import { getTickets, saveTicket, deleteTicket, showToast } from '../utils/data'; 

const DashboardPage = () => {
    // Initialize state with an empty array to prevent the 'filter' error on first render
    const [tickets, setTickets] = useState([]);
    const [formState, setFormState] = useState({ 
        id: '', title: '', status: 'open', description: ''
    });
    const [formError, setFormError] = useState(''); // Ensure this state is defined

    // Load tickets when the component mounts
    useEffect(() => {
        setTickets(getTickets());
    }, []);

    const renderStats = (data) => {
        // FIX: Ensure data is an array before using filter
        const safeData = data || []; 
        
        const total = safeData.length;
        const open = safeData.filter(t => t.status === 'open').length; 
        const resolved = safeData.filter(t => t.status === 'closed').length;

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
    
    // ... rest of DashboardPage functions (handleFormSubmit, handleEdit, handleDelete, etc.)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormError(''); 
        
        if (!formState.title || !formState.status) {
            setFormError("Title and Status are mandatory.");
            showToast("Validation Failed: Title and Status required.", "error");
            return;
        }

        const updatedTickets = saveTicket(tickets, formState); 
        setTickets(updatedTickets);
        setFormState({ id: '', title: '', status: 'open', description: '' });
    };

    const handleEdit = (ticket) => {
        setFormState({ 
            id: ticket.id, 
            title: ticket.title, 
            status: ticket.status, 
            description: ticket.description 
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this ticket?")) return;
        
        const remainingTickets = deleteTicket(tickets, id);
        setTickets(remainingTickets);
        showToast(`Ticket #${id} deleted successfully!`, 'success');

        if (formState.id === id) {
            setFormState({ id: '', title: '', status: 'open', description: '' });
        }
    };

    const renderTicketCard = (ticket) => (
        <div key={ticket.id} className="card ticket-card" style={{ borderLeft: `5px solid var(--color-${ticket.status.replace('_', '-')})` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0 }}>{ticket.title}</h4>
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
                
                <h2>Summary Statistics</h2>
                {renderStats(tickets)}

                <div className="card" style={{ marginBottom: '40px' }}>
                    <h2>{formState.id ? 'Edit Ticket' : 'Create New Ticket'}</h2>
                    <form onSubmit={handleFormSubmit}>
                        
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

                <h2>Ticket Management List</h2>
                <div id="ticket-list" className="ticket-list" style={{ display: 'grid', gap: '20px' }}>
                    {tickets.map(renderTicketCard)}
                    
                    {!tickets.length && <p>No tickets available. Create a new one!</p>}
                </div>
            </main>
        </Layout>
    );
};

export default DashboardPage;