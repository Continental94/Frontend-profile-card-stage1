/**
 * Script for the Profile Card component.
 * Handles dynamic content updates (time) and contact form validation.
 */

const TIME_UPDATE_INTERVAL_MS = 1000; 

// --- Time Update Logic ---

/**
 * Updates the 'Current time in milliseconds' element with the current timestamp.
 */
function updateTime() {
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
    
    if (timeElement) {
        // Calculate the current time in milliseconds (REQUIRED: Date.now())
        const currentTime = Date.now();
        timeElement.textContent = currentTime.toString();
    }
}


// --- Form Validation Logic ---

/**
 * Clears all visible error messages and resets aria attributes on the form fields.
 * @param {Object} fields - An object containing references to all input elements.
 */
function clearErrorMessages(fields) {
    for (const key in fields) {
        const inputElement = fields[key];
        const errorElement = document.querySelector(`[data-testid="test-contact-error-${key}"]`);

        // Reset input styles (optional, but good practice)
        inputElement.style.borderColor = '#ddd';
        inputElement.removeAttribute('aria-describedby');

        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
}

/**
 * Displays validation errors next to the corresponding fields.
 * @param {Object} errors - An object containing field names and their error messages.
 * @param {Object} fields - An object containing references to all input elements.
 */
function displayErrors(errors, fields) {
    for (const key in errors) {
        const inputElement = fields[key];
        const errorElement = document.querySelector(`[data-testid="test-contact-error-${key}"]`);

        if (errorElement) {
            errorElement.textContent = errors[key];
            errorElement.style.display = 'block';
            
            // Highlight the problematic input
            inputElement.style.borderColor = '#dc3545'; 

            // Accessibility: Link input to its error message by ID
            // Note: We need to ensure the HTML error elements have proper IDs (which we added in contact.html)
            const errorId = `error-${key}`; 
            inputElement.setAttribute('aria-describedby', errorId);
        }
    }
}

/**
 * Handles the contact form submission and validation.
 * @param {Event} event - The form submission event.
 */
function handleContactSubmit(event) {
    event.preventDefault(); // Stop the default form submission

    const form = event.target;
    const fields = {
        name: form.querySelector('[data-testid="test-contact-name"]'),
        email: form.querySelector('[data-testid="test-contact-email"]'),
        subject: form.querySelector('[data-testid="test-contact-subject"]'),
        message: form.querySelector('[data-testid="test-contact-message"]'),
    };
    let isValid = true;
    const errors = {};

    // 1. CLEAR PREVIOUS ERRORS
    clearErrorMessages(fields);

    // 2. VALIDATION LOGIC

    // a. Required Fields Check
    for (const key in fields) {
        // Subject is optional, so we skip it.
        if (key === 'subject') continue; 

        if (fields[key].value.trim() === '') {
            errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
            isValid = false;
        }
    }

    // b. Email Format Check (if not empty)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fields.email.value.trim() !== '' && !emailRegex.test(fields.email.value)) {
        errors.email = 'Please enter a valid email address (e.g., name@example.com).';
        isValid = false;
    }

    // c. Message Length Check (Min 10 chars, only if not empty)
    const messageValue = fields.message.value.trim();
    if (messageValue.length > 0 && messageValue.length < 10) {
        errors.message = 'Message must be at least 10 characters long.';
        isValid = false;
    }
    
    // 3. HANDLE ERRORS OR SUCCESS

    if (!isValid) {
        displayErrors(errors, fields); 
    } else {
        // Success: Display success message and reset form
        const successMessage = document.getElementById('success-message');

        form.reset();
        form.style.display = 'none'; // Hide the form
        successMessage.style.display = 'block';
        
        // Optional: Re-display the form after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
            form.style.display = 'block';
        }, 5000);
    }
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Time Display Initialization (for index.html)
    updateTime();
    setInterval(updateTime, TIME_UPDATE_INTERVAL_MS);
    
    // 2. Form Initialization (for contact.html)
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', handleContactSubmit);
        console.log('Contact form script initialized.');
    } else {
        console.log('Profile Card script initialized.');
    }
});