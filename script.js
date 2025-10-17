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
});