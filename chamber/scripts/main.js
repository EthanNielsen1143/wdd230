// Hamburger menu functionality
const hamburgerButton = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburgerButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});


const lastModified = new Date(document.lastModified);
const lastModifiedSpan = document.getElementById('lastModified');
lastModifiedSpan.textContent = lastModified.toLocaleString();
