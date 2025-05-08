document.addEventListener('DOMContentLoaded', () => {
  let tvData = [];

  // Fetch TV data once and reuse
  fetch('tv_data.json')
    .then(response => response.json())
    .then(data => {
      tvData = data;
    });

  const form = document.getElementById('tv-quiz');

  // Dynamically filter options when room is changed
  form.elements['room'].addEventListener('change', (e) => {
    const selectedRoom = e.target.value;

    const filteredTVs = tvData.filter(tv => tv.room.includes(selectedRoom));

    // Get unique available use cases
    const availableUses = [...new Set(filteredTVs.flatMap(tv => tv.use))];
    const availableBudgets = [...new Set(filteredTVs.map(tv => tv.budget))];
    const availableSizes = [...new Set(filteredTVs.flatMap(tv => tv.sizes))];

    // Update Use Options
    Array.from(form.elements['use'].options).forEach(option => {
      option.disabled = !availableUses.includes(option.value);
    });

    // Update Budget Checkboxes
    Array.from(form.querySelectorAll('input[name="budget"]')).forEach(cb => {
      cb.disabled = !availableBudgets.includes(cb.value);
    });

    // Update Size Options
    Array.from(form.elements['size'].options).forEach(option => {
      option.disabled = !sizeValueIsAvailable(option.value, availableSizes);
    });
  });

  // Helper to check if a size option is available in the dataset
  function sizeValueIsAvailable(sizeValue, availableSizes) {
    let sizeRanges = [];
    if (sizeValue === 'small') sizeRanges = ['43"', '50"'];
    if (sizeValue === 'medium') sizeRanges = ['55"', '65"'];
    if (sizeValue === 'large') sizeRanges = ['65"', '75"'];
    if (sizeValue === 'xl') sizeRanges = ['75"', '85"', '98"'];
    return sizeRanges.some(size => availableSizes.includes(size));
  }

  // Quiz form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const room = form.elements['room'].value;
    const use = form.elements['use'].value;
    const sizeChoice = form.elements['size'].value;

    const budgetCheckboxes = form.querySelectorAll('input[name="budget"]:checked');
    const selectedBudgets = Array.from(budgetCheckboxes).map(cb => cb.value);

    if (selectedBudgets.length === 0) {
      alert("Please select at least one budget option.");
      return;
    }

    let sizeRanges = [];
    if (sizeChoice === 'small') sizeRanges = ['43"', '50"'];
    if (sizeChoice === 'medium') sizeRanges = ['55"', '65"'];
    if (sizeChoice === 'large') sizeRanges = ['65"', '75"'];
    if (sizeChoice === 'xl') sizeRanges = ['75"', '85"', '98"'];

    const matches = tvData.filter(tv =>
      tv.room.includes(room) &&
      tv.use.includes(use) &&
      selectedBudgets.includes(tv.budget) &&
      tv.sizes.some(size => sizeRanges.includes(size))
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
