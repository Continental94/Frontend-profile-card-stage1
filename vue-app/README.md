# Vue Implementation: TicketApp

This application is built using Vue 3 (Composition API) with Vue Router for navigation and security logic.

# Setup Instructions

1.  Navigate to this directory in your terminal: `cd vue-app`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`

The application will typically open on `http://localhost:5173`.

# Architectural & Compliance Notes

* Security (Route Guard): The Vue Router guard in `src/router/index.js` handles the protected route logic. It checks for the `ticketapp_session` key in `localStorage` before allowing access to the Dashboard route (`/dashboard`).
* Views & Consistency: Visual components (`HomeView.vue`, `DashboardView.vue`) strictly use the same HTML structure and CSS classes as the React implementation to maintain cross-framework design consistency.
* Data/State: Data management for authentication and CRUD operations is centralized in `src/utils/authUtils.js`, mirroring the mock API structure of the React app using `localStorage`.
* Layout: The `App.vue` component acts as the global layout wrapper, enforcing the consistent header/footer and logout logic.

# Test Credentials (Mandatory)
* Username: `test`
* Password: `password`