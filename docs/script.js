document.getElementById('tv-quiz').addEventListener('submit', function(e) {
  e.preventDefault();

  fetch('tv_data.json')
    .then(response => response.json())
    .then(data => {
      const form = e.target;
      const roomInputs = form.elements['room']; // get room checkbox inputs
      const roomValues = Array.from(roomInputs).map(input => input.value); // get room values as an array
      const use = form.elements['use'].value;
      const budget = form.elements['budget'].value;

      const matches = data.filter(tv =>
        roomValues.includes(tv.room) || // check if TV is suitable for any of the selected rooms
        roomValues.includes(tv.rooms[0]) || // check if TV is suitable for any room in the array
        roomValues.includes(tv.rooms[1]) || // check if TV is suitable for any room in the array
        roomValues.includes(tv.rooms[2]) // check if TV is suitable for any room in the array
      );

      const recommendation = document.getElementById('recommendation');

      if (matches.length > 0) {
        const selectedTV = matches[0];
        recommendation.innerHTML = `
          <h2>${selectedTV.name}</h2>
          <p>${selectedTV.description}</p>
          <a href="${selectedTV.affiliateLink}" target="_blank">View on Amazon</a>
        `;
      } else {
        recommendation.textContent = "No TVs found for your preferences — try adjusting your choices!";
      }
    });
});
