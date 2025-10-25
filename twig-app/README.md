# Twig/Vanilla JS Implementation: TicketApp

This implementation demonstrates a traditional web application approach using Twig templates for server-side-rendered structure, with all interactivity, security, and CRUD logic handled by Vanilla JavaScript.

# Setup Instructions

*Note: Twig templates are typically rendered by a backend server (like PHP, Python, or Node Express). The code is structured assuming a server routes the requests to the correct `.html.twig` file.*

1.  Server Setup: Ensure you have a local server environment capable of serving HTML/Twig files and linking JavaScript (`/public/js/app.js`).
2.  Files: Pages are located in the `templates/` folder (`base.html.twig`, `login.html.twig`, etc.).
3.  Client Logic: The single file `public/js/app.js` contains all client-side logic:
    * Auth handlers (`handleLogin`, `handleSignup`, `handleLogout`).
    * Route protection (`protectRoute()`).
    * CRUD functions and Dashboard rendering.

# Architectural & Compliance Notes

* Structure Consistency: The `base.html.twig` file enforces the mandatory header, footer, and the `<div class="container">` (max-width: 1440px) across all derived templates.
* Security: The `protectRoute()` function in `app.js` runs on page load, checking for the `ticketapp_session` key and immediately redirecting unauthorized users.
* CRUD Implementation: All ticket rendering (including the mandatory color-coded status tags) and form binding are achieved entirely with Vanilla JS DOM manipulation in `app.js`.

# Test Credentials (Mandatory)
* Username: `test`
* Password: `password`