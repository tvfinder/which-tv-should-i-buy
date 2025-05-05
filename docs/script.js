fetch('tv_data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);  // <--- THIS will show your whole loaded dataset
    const room = form.elements['room'].value;
    const size = form.elements['size'].value;
    const use = form.elements['use'].value;
    const budget = form.elements['budget'].value;

    console.log(room, size, use, budget);  // <--- see what values the form sends

    const tvs = data.filter(tv =>
      tv.room === room &&
      tv.size === size &&
      tv.use === use &&
      tv.budget === budget
    );

    console.log(tvs);  // <--- check what matches happen here

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
  });
