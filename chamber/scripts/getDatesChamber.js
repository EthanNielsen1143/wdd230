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
  
    let pageVisits = localStorage.getItem('pageVisits');
    if (!pageVisits) {
        pageVisits = 1;
    } else {
        pageVisits = parseInt(pageVisits) + 1;
    }
  
    const pageVisitCounter = document.getElementById('pageVisitCounter');
    if (pageVisitCounter) {
        pageVisitCounter.textContent = `Page Visits: ${pageVisits}`;
    }
  
    localStorage.setItem('pageVisits', pageVisits.toString());
  });