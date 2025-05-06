fetch('tv_data.json')
  .then(response => response.json())
  .then(data => {
    const room = form.elements['room'].value;
    const use = form.elements['use'].value;
    const budget = form.elements['budget'].value;

    const matches = data.filter(tv =>
      tv.room === room &&
      tv.use === use &&
      tv.budget === budget
    );

    if (matches.length > 0) {
      const selectedTV = matches[0];
      recommendation.innerHTML = `
        <strong>${selectedTV.name}</strong><br>
        ${selectedTV.description}<br>
        <a href="${selectedTV.affiliateLink}" target="_blank">Check it out on Amazon</a>
      `;
    } else {
      recommendation.textContent = "No TVs found for your preferences. Try adjusting your answers!";
    }
  });
