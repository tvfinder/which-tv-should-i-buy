document.getElementById('tv-quiz').addEventListener('submit', function(e) {
  e.preventDefault();

  fetch('tv_data.json')
    .then(response => response.json())
    .then(data => {
      const form = e.target;
      const room = form.elements['room'].value;
      const use = form.elements['use'].value;
      const sizeChoice = form.elements['size'].value;

      // Get selected budget checkboxes
      const budgetCheckboxes = form.querySelectorAll('input[name="budget"]:checked');
      const selectedBudgets = Array.from(budgetCheckboxes).map(cb => cb.value);

      if (selectedBudgets.length === 0) {
        alert("Please select at least one budget option.");
        return;
      }

      // Match sizeChoice to actual size ranges in the data
      let sizeRanges = [];
      if (sizeChoice === 'small') sizeRanges = ['43-55']; // or 'under 43' if you have it
      if (sizeChoice === 'medium') sizeRanges = ['43-55'];
      if (sizeChoice === 'large') sizeRanges = ['55-75'];
      if (sizeChoice === 'xl') sizeRanges = ['75+'];

      // Filter the data based on form inputs
      const matches = data.filter(tv =>
        tv.room.includes(room) &&
        tv.use.includes(use) &&
        selectedBudgets.includes(tv.budget) &&
        sizeRanges.includes(tv.size)
      );

      const recommendation = document.getElementById('recommendation');

      if (matches.length > 0) {
        recommendation.innerHTML = matches.map(tv => `
          <div class="tv-card">
            <h2>${tv.name}</h2>
            <p>${tv.description}</p>
            <a href="${tv.affiliateLink}" target="_blank">View on Amazon</a>
          </div>
        `).join('');
      } else {
        recommendation.textContent = "No TVs found for your preferences — try adjusting your choices!";
      }
    })
    .catch(error => {
      console.error('Error fetching TV data:', error);
    });
});
