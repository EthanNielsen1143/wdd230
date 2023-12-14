// scripts/reservations.js
document.addEventListener('DOMContentLoaded', function () {
    // Function to handle form submission
    function handleFormSubmit(event) {
      event.preventDefault();
  
      // Get form data
      const formData = new FormData(event.target);
  
      // Validate form data (add more validation as needed)
      const date = formData.get('date');
      const period = formData.get('period');
      const rentalType = formData.get('rental-type');
      const number = formData.get('number');
      const phone = formData.get('phone');
      const name = formData.get('name');
      const email = formData.get('email');
  
      if (!date || !period || !rentalType || !number || !phone || !name || !email) {
        alert('Please fill in all required fields.');
        return;
      }
      // Log form data to the console
      console.log('Form Data:');
      for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
    }
  
    // Function to fetch rental types from the JSON file
    function fetchRentalTypes() {
      // Fetch rental types from the JSON file
      fetch('data/rentals.json')
        .then(response => response.json())
        .then(data => populateRentalTypes(data.rentals))
        .catch(error => console.error('Error fetching rental types:', error));
    }
  
    // Function to populate rental types in the select element
    function populateRentalTypes(rentals) {
      const rentalTypeSelect = document.getElementById('rental-type');
  
      rentals.forEach(rental => {
        const option = document.createElement('option');
        option.value = rental.type.toLowerCase(); // Use a lowercase version as a value
        option.textContent = rental.type;
        rentalTypeSelect.appendChild(option);
      });
    }
  
    // Attach the form submission handler to the reservation form
    const reservationForm = document.getElementById('reservation-form');
    reservationForm.addEventListener('submit', handleFormSubmit);
  
    // Call the fetchRentalTypes function when the page is loaded
    fetchRentalTypes();
  });
  