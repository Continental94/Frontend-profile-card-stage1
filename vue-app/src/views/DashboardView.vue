<template>
  <div>
    <h2>Summary Statistics</h2>
    <div class="dashboard-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
      <div class="card">
        <h3>Total Tickets</h3>
        <p style="font-size: 2em; color: var(--color-primary);">{{ totalTickets }}</p>
      </div>
      <div class="card">
        <h3>Open Tickets</h3>
        <p style="font-size: 2em; color: var(--color-open);">{{ openTickets }}</p>
      </div>
      <div class="card">
        <h3>Resolved Tickets</h3>
        <p style="font-size: 2em; color: var(--color-closed);">{{ resolvedTickets }}</p>
      </div>
    </div>

    <div class="card" style="margin-bottom: 40px;">
      <h2>{{ formState.id ? 'Edit Ticket' : 'Create New Ticket' }}</h2>
      <form @submit.prevent="handleFormSubmit">
        
        <p v-if="formError" class="error-message" style="color: #dc3545; font-weight: bold;">{{ formError }}</p>

        <label for="title">Title (Mandatory)</label>
        <input type="text" id="title" v-model="formState.title" required />

        <label for="status">Status (Mandatory)</label>
        <select id="status" v-model="formState.status" required>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
        </select>
        
        <label for="description">Description (Optional)</label>
        <textarea id="description" v-model="formState.description"></textarea>
        
        <button type="submit" class="btn btn-primary">
          {{ formState.id ? 'Update Ticket' : 'Save New Ticket' }}
        </button>
        
        <button v-if="formState.id" type="button" class="btn" @click="cancelEdit" style="margin-left: 10px; background: #ccc;">
            Cancel Edit
        </button>
      </form>
    </div>

    <h2>Ticket Management List</h2>
    <div id="ticket-list" class="ticket-list" style="display: grid; gap: 20px;">
      <div v-for="ticket in tickets" :key="ticket.id" 
           class="card" 
           :style="{ borderLeft: `5px solid var(--color-${ticket.status})` }">
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin-bottom: 5px;">{{ ticket.title }}</h3>
          <span :class="['tag', ticket.status]">{{ formatStatus(ticket.status) }}</span>
        </div>
        
        <p style="font-size: 0.9em; color: #666;">ID: {{ ticket.id }}</p>
        <p style="margin-top: 10px;">{{ ticket.description || 'No description provided.' }}</p>
        
        <div style="margin-top: 15px;">
          <button @click="editTicket(ticket)" class="btn btn-primary" style="font-size: 0.9em;">Edit</button>
          <button @click="handleDelete(ticket.id)" class="btn btn-danger" style="font-size: 0.9em; margin-left: 10px;">Delete</button>
        </div>
      </div>

      <p v-if="!tickets.length">No tickets available. Create a new one!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getTickets, saveTicket, deleteTicket, showToast } from '@/utils/authUtils'; 

const tickets = ref([]);
const formState = ref({
    id: '', title: '', status: 'open', description: ''
});
const formError = ref('');

// --- Computed Properties for Stats (REQUIRED) ---
const totalTickets = computed(() => tickets.value.length);
const openTickets = computed(() => tickets.value.filter(t => t.status === 'open').length);
const resolvedTickets = computed(() => tickets.value.filter(t => t.status === 'closed').length);

// --- Data Methods ---
const formatStatus = (status) => {
    return status.replace('_', ' ').toUpperCase();
}

const loadTickets = () => {
    tickets.value = getTickets();
};

const cancelEdit = () => {
    formState.value = { id: '', title: '', status: 'open', description: '' };
};

const editTicket = (ticket) => {
    formState.value = { ...ticket };
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleFormSubmit = () => {
    formError.value = '';

    // MANDATORY: Title and Status fields are mandatory.
    if (!formState.value.title || !formState.value.status) {
        formError.value = 'Title and Status are mandatory.';
        showToast('Validation Failed: Title and Status required.', 'error');
        return;
    }
    // MANDATORY: Status field validation
    if (!['open', 'in_progress', 'closed'].includes(formState.value.status)) {
        formError.value = 'Invalid status value.';
        showToast('Validation Failed: Invalid Status.', 'error');
        return;
    }

    saveTicket(formState.value);

    showToast(formState.value.id ? 'Ticket updated successfully!' : 'New ticket created!', 'success');
    
    cancelEdit();
    loadTickets();
};

const handleDelete = (id) => {
    // REQUIRED: Delete confirmation step
    if (window.confirm('Are you sure you want to delete this ticket?')) {
        deleteTicket(id);
        showToast('Ticket deleted successfully.', 'success');
        loadTickets();
    }
};

// --- Lifecycle Hook: Load data when component is ready ---
onMounted(loadTickets);
</script>