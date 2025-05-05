const form = document.getElementById('tv-form');
const recommendation = document.getElementById('recommendation');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get user selections
  const room = form.elements['room'].value;
  const size = form.elements['size'].value;
  const use = form.elements['use'].value;
  const budget = form.elements['budget'].value;

  console.log(room, size, use, budget);  // see what values are coming through

  // Fetch the JSON data and filter
  fetch('tv_data.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);  // confirm data loaded

      const tvs = data.filter(tv =>
        tv.room === room &&
        tv.size === size &&
        tv.use === use &&
        tv.budget === budget
      );

      console.log(tvs);  // check if any matches

      if (tvs.length > 0) {
        const selectedTV = tvs[0];
        recommendation.innerHTML = `
          <strong>${selectedTV.name}</strong><br>
          ${selectedTV.description}<br>
          <a href="${selectedTV.affiliateLink}" target="_blank">Check it out on Amazon</a>
        `;
      } else {
        recommendation.textContent = "No TVs found for your preferences. Please try adjusting your answers.";
      }
    })
    .catch(error => {
      console.error("Error fetching TV data:", error);
      recommendation.textContent = "Sorry, there was a problem loading TV recommendations.";
    });
});
