# React Implementation: TicketApp

This application is built using React with React Router for navigation and component state management (`useState`).

# Setup Instructions

1.  Navigate to this directory in your terminal: `cd react-app`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev` (or `npm start`)

The application will typically open on `http://localhost:5173`.

# Architectural & Compliance Notes

* Security: The Dashboard is protected using the `ProtectedRoute.jsx` component. Access is guarded by checking the mandatory `ticketapp_session` key in `localStorage` via the `isAuthenticated()` utility function.
* Data/State: All CRUD logic (Create, Read, Update, Delete) and state management is handled locally via the utility file `src/utils/data.js`, simulating an external API and persisting data in `localStorage`.
* Layout Consistency: The `Layout.jsx` component enforces the header, footer, and `max-width: 1440px` container (class `.container`) across all routes.
* CRUD Validation: Form validation checks for mandatory fields (Title, Status) are implemented directly in `DashboardPage.jsx`, providing inline error feedback and required toast notifications.

# Test Credentials (Mandatory)
* Username: `test`
* Password: `password`