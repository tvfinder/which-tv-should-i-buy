document.addEventListener('DOMContentLoaded', () => {
  // TV Quiz Recommendation
  document.getElementById('tv-quiz').addEventListener('submit', function(e) {
    e.preventDefault();

    fetch('tv_data.json')
      .then(response => response.json())
      .then(data => {
        const form = e.target;
        const room = form.elements['room'].value;
        const use = form.elements['use'].value;
        const sizeChoice = form.elements['size'].value;

        const budgetCheckboxes = form.querySelectorAll('input[name="budget"]:checked');
        const selectedBudgets = Array.from(budgetCheckboxes).map(cb => cb.value);

        if (selectedBudgets.length === 0) {
          alert("Please select at least one budget option.");
          return;
        }

       let sizeFilter = () => true; // default: matches everything if no size selected

if (sizeChoice === 'small') {
  sizeFilter = size => parseInt(size) < 43;
}
if (sizeChoice === 'medium') {
  sizeFilter = size => parseInt(size) >= 43 && parseInt(size) <= 55;
}
if (sizeChoice === 'large') {
  sizeFilter = size => parseInt(size) > 55 && parseInt(size) <= 75;
}
if (sizeChoice === 'xl') {
  sizeFilter = size => parseInt(size) > 75;
}

const matches = data.filter(tv =>
  tv.room.includes(room) &&
  tv.use.includes(use) &&
  selectedBudgets.includes(tv.budget) &&
  tv.sizes.some(size => sizeFilter(size))
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

  // Feedback popup handling
  const feedbackButton = document.querySelector('.feedback-button');
  const feedbackPopup = document.querySelector('.feedback-popup');

  feedbackButton.addEventListener('click', (e) => {
    if (window.innerWidth <= 600) {
      e.stopPropagation();
      feedbackPopup.classList.toggle('show');
    }
  });

  // Close popup when clicking outside (mobile)
  window.addEventListener('click', (e) => {
    if (window.innerWidth <= 600) {
      if (!feedbackPopup.contains(e.target) && !feedbackButton.contains(e.target)) {
        feedbackPopup.classList.remove('show');
      }
    }
  });

  // Copy email to clipboard
  document.getElementById('copy-button').addEventListener('click', (e) => {
    e.stopPropagation(); // prevent closing popup
    const email = document.getElementById('feedback-email').innerText;
    navigator.clipboard.writeText(email).then(() => {
      const msg = document.getElementById('copy-message');
      msg.style.display = 'block';
      setTimeout(() => {
        msg.style.display = 'none';
      }, 1500);
    });
  });
});
