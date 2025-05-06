fetch('tv_data.json')
  .then(response => response.json())
  .then(data => {
    const room = form.elements['room'].value;
    const size = form.elements['size'].value;
    const use = form.elements['use'].value;
    const budget = form.elements['budget'].value;

    // Find the best match (first matching TV)
    const tv = data.find(tv =>
      tv.room === room &&
      tv.size === size &&
      tv.use === use &&
      tv.budget === budget
    );

    if (tv) {
      recommendation.innerHTML = `
        <strong>${tv.name}</strong><br>
        ${tv.description}<br>
        <a href="${tv.affiliateLink}" target="_blank">Check it out on Amazon</a>
      `;
    } else {
      recommendation.textContent = "No TVs found for your preferences. Please try adjusting your answers.";
    }
  });
