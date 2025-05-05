document.getElementById('tv-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Grab the user's answers
    const room = document.querySelector('input[name="room"]:checked');
    const size = document.querySelector('input[name="size"]:checked');
    const use = document.querySelector('input[name="use"]:checked');
    const budget = document.querySelector('input[name="budget"]:checked');
  
    // Check if all questions are answered
    if (!room || !size || !use || !budget) {
      document.getElementById('recommendation').textContent = "Please answer all the questions!";
      return;
    }
  
    // Fetch the TV data from the local JSON file
    fetch('tv_data.json')
      .then(response => response.json())  // Parse the JSON data
      .then(data => {
        // Filter the TVs based on user answers
        const filteredTVs = data.filter(tv => {
          return tv.size === size.value && tv.room === room.value && tv.use === use.value && tv.budget === budget.value;
        });
  
        // Display the filtered TVs
        const resultDiv = document.getElementById('recommendation');
        resultDiv.innerHTML = '';  // Clear any previous recommendations
  
        if (filteredTVs.length > 0) {
          filteredTVs.forEach(tv => {
            resultDiv.innerHTML += `
              <p><strong>${tv.name}</strong><br>
              ${tv.description}<br>
              <a href="${tv.affiliateLink}" target="_blank">Buy Now</a></p>
            `;
          });
        } else {
          resultDiv.innerHTML = 'No TVs found for your preferences. Please try adjusting your answers.';
        }
      })
      .catch(error => {
        console.error("Error loading TV data: ", error);
        document.getElementById('recommendation').textContent = "Oops, there was an error loading the recommendations.";
      });
  });
  