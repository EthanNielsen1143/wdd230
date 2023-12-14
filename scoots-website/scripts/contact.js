// scripts/contact.js
document.addEventListener('DOMContentLoaded', function () {
    // Function to handle form submission
    function handleFormSubmit(event) {
      event.preventDefault();
  
      // Implement your logic to handle form data
      // For now, simply log the form data to the console
      const formData = new FormData(event.target);
      for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
    }
  
    // Attach the form submission handler to the contact form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleFormSubmit);
  });
  