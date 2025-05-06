document.getElementById('tv-quiz').addEventListener('submit', function(e) {
  e.preventDefault();

  fetch('tv_data.json')
    .then(response => response.json())
    .then(data => {
      const form = e.target;
      const room = form.elements['room'].value;
      const use = form.elements['use'].value;

      // Grab checked budget values
      const budgetCheckboxes = form.querySelectorAll('input[name="budget"]:checked');
      const selectedBudgets = Array.from(budgetCheckboxes).map(cb => cb.value);

      // Require at least one budget to be checked
      if (selectedBudgets.length === 0) {
        alert("Please select at least one budget option.");
        return;
      }

      const matches = data.filter(tv =>
        tv.room.includes(room) &&
        tv.use.includes(use) &&
        selectedBudgets.includes(tv.budget)
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
    });
});
