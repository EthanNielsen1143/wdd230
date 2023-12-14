document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch rental data from the JSON file
    function fetchRentalData() {
      const rentalsTable = document.getElementById('rentals-table');
  
      // Fetch rental data from the JSON file
      fetch('data/rentals.json')
        .then(response => response.json())
        .then(data => displayRentalOptions(data.rentals))
        .catch(error => console.error('Error fetching rental data:', error));
    }
  
    // Function to display rental options in a data table
    function displayRentalOptions(rentals) {
      const rentalsTable = document.getElementById('rentals-table');
      rentals.forEach(rental => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${rental.type}</td>
          <td>${rental.maxPersons}</td>
          <td>${rental.halfDayPrice}</td>
          <td>${rental.fullDayPrice}</td>
        `;
        rentalsTable.appendChild(row);
      });
    }
  
    // Call the fetchRentalData function when the page is loaded
    fetchRentalData();
  });
  