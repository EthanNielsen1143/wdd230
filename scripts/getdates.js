document.addEventListener("DOMContentLoaded", function () {
    var currentYear = new Date().getFullYear();
    var lastModified = "Last modified: " + document.lastModified;
    
    // Find and update the elements in your HTML
    var currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
      currentYearElement.textContent = currentYear;
    }
  
    var lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
      lastModifiedElement.textContent = lastModified;
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    // Find the hamburger icon and mobile menu
    const hamburger = document.querySelector('hamburger');
    const mobileMenu = document.querySelector('nav ul');
    
    // Toggle the mobile menu when clicking the hamburger icon
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
    });
  });