/**
 * Script for the Profile Card component.
 * Handles dynamic content updates, specifically the current time in milliseconds.
 */

const TIME_UPDATE_INTERVAL_MS = 1000; // Update the time every 1 second (1000ms)

/**
 * Updates the 'Current time in milliseconds' element with the current timestamp.
 */
function updateTime() {
    // Find the element using the required data-testid
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
    
    if (timeElement) {
        // Calculate the current time in milliseconds (REQUIRED: Date.now())
        const currentTime = Date.now();
        
        // Update the element's text content
        timeElement.textContent = currentTime.toString();
    } else {
        console.error('Error: Time display element with data-testid="test-user-time" not found.');
    }
}

// 1. Run immediately on load (to meet the "at render" requirement)
document.addEventListener('DOMContentLoaded', () => {
    updateTime();

    // 2. Set an interval to keep the time reasonably accurate
    setInterval(updateTime, TIME_UPDATE_INTERVAL_MS);
    
    console.log('Profile Card script initialized and time tracking started.');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    // Only run form logic if the form element exists (i.e., we are on contact.html)
    if (form) {
        form.addEventListener('submit', handleContactSubmit);
    }

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

    // 1. CLEAR PREVIOUS ERRORS (Helper function you need to write)
    clearErrorMessages(fields);

    // 2. VALIDATION LOGIC

    // a. Required Fields Check
    for (const key in fields) {
        if (fields[key].value.trim() === '') {
            errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
            isValid = false;
        }
    }

    // b. Email Format Check (if not empty)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fields.email.value && !emailRegex.test(fields.email.value)) {
        errors.email = 'Please enter a valid email address (e.g., name@example.com).';
        isValid = false;
    }

    // c. Message Length Check (Min 10 chars)
    if (fields.message.value.length > 0 && fields.message.value.length < 10) {
        errors.message = 'Message must be at least 10 characters long.';
        isValid = false;
    }

    // 3. HANDLE ERRORS OR SUCCESS

    if (!isValid) {
        displayErrors(errors, fields); // Helper function to display errors
    } else {
        // Success: Display success message and reset form
        form.reset();
        document.getElementById('success-message').style.display = 'block';
        form.style.display = 'none'; // Hide the form
    }
}

function displayErrors(errors, fields) {
    for (const key in errors) {
        // Find the corresponding input and error message element
        const inputElement = fields[key];
        const errorElement = document.querySelector(`[data-testid="test-contact-error-${key === 'name' ? 'name' : key}"]`);

        if (errorElement) {
            errorElement.textContent = errors[key];
            errorElement.style.display = 'block';

            // Accessibility: Link input to its error message
            inputElement.setAttribute('aria-describedby', errorElement.id);
        }
    }
}
// You also need the clearErrorMessages function to remove styles/attributes
});