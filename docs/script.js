// This file contains JavaScript code that handles the logic for the TV recommendation form.

document.getElementById('tv-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const room = document.querySelector('input[name="room"]:checked');
    const size = document.querySelector('input[name="size"]:checked');
    const use = document.querySelector('input[name="use"]:checked');
    const budget = document.querySelector('input[name="budget"]:checked');

    if (!room || !size || !use || !budget) {
        document.getElementById('recommendation').innerText = 'Please answer all questions.';
        return;
    }

    let recommendation = '';

    // Simple recommendation logic based on user input
    if (budget.value === 'premium') {
        recommendation = 'We recommend the latest OLED TV for your ' + room.value + '.';
    } else if (budget.value === 'high') {
        recommendation = 'Consider a high-end LED TV for your ' + room.value + '.';
    } else if (budget.value === 'mid') {
        recommendation = 'A mid-range smart TV would be great for your ' + room.value + '.';
    } else {
        recommendation = 'Check out some budget-friendly options for your ' + room.value + '.';
    }

    document.getElementById('recommendation').innerText = recommendation;
});